/**
 * Google Apps Script for Malsons Construction Lead Capture & Automation
 * 
 * FEATURES:
 * 1. Saves leads to Google Sheets ('Leads' tab).
 * 2. AUTOMATICALLY generates a defined PDF "Renovation Guide".
 * 3. Emails the PDF to the user immediately.
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Save this code.
 * 2. Run 'setupSheet' once if you haven't (to columns headers).
 * 3. Click 'Deploy' > 'New deployment'.
 * 4. Select type: 'Web app'.
 * 5. Description: 'Auto PDF Version'.
 * 6. Execute as: 'Me'.
 * 7. Who has access: 'Anyone'.
 * 8. COPY the new Web App URL and update your .env.local file.
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName('Leads') || doc.insertSheet('Leads');
    
    // Parse Incoming Data
    const postData = JSON.parse(e.postData.contents);
    const email = postData.email;
    
    // 1. SAVE TO SHEET
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(function(header) {
      const key = header.toLowerCase();
      if (key === 'timestamp') return new Date();
      return postData[Object.keys(postData).find(k => k.toLowerCase() === key)] || '';
    });
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // 2. GENERATE & SEND PDF (If email exists)
    if (email && email.includes('@')) {
      sendRenovationGuide(email, postData);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}

/**
 * 
 * -- TEST FUNCTION --
 * Run this function manually in the editor to verify email sending works!
 */
function testPDFGeneration() {
  const myEmail = Session.getActiveUser().getEmail();
  Logger.log("Sending test email to: " + myEmail);
  
  const mockData = {
    email: myEmail,
    property: "Test Property",
    type: "Full Renovation",
    style: "Modern",
    estimate: "RM 50,000 - RM 60,000"
  };
  
  sendRenovationGuide(myEmail, mockData);
}

/**
 * Generates HTML Request -> Converts to PDF -> Sends Email
 */
function sendRenovationGuide(recipientEmail, data) {
  const subject = "Your Renovation Checklist & Cost Guide | Malsons Construction";
  const body = "Hi there,\n\nThank you for reaching out to Malsons Construction. Please find attached your requested 2026 Renovation Readiness Checklist & Cost Guide.\n\nBest regards,\nThe Malsons Team";
  
  // Create PDF Blob
  const htmlContent = createHtmlTemplate(data || {});
  const blob = Utilities.newBlob(htmlContent, "text/html", "Malsons_Renovation_Guide.html");
  const pdf = blob.getAs("application/pdf");
  pdf.setName("Malsons_Renovation_Guide_2026.pdf");
  
  // Send Email
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: body,
    attachments: [pdf]
  });
}

/**
 * The HTML Design for the PDF - Google Apps Script Compatible Version
 * Uses tables for layout (no flexbox) and SVG for charts (no conic-gradient)
 */
function createHtmlTemplate(data) {
  return `
    <html>
      <head>
        <style>
          body { 
            font-family: Helvetica, Arial, sans-serif; 
            color: #333; 
            line-height: 1.5; 
            margin: 0;
            padding: 30px 40px;
            font-size: 11px;
          }

          h1 { font-size: 32px; font-weight: bold; color: #333; margin: 0 0 5px 0; }
          h2 { font-size: 20px; font-weight: bold; color: #333; margin: 25px 0 10px 0; }
          
          table { width: 100%; border-collapse: collapse; margin: 10px 0; page-break-inside: avoid; }
          th { background-color: #fdba74; padding: 10px 12px; text-align: left; font-weight: bold; border: 1px solid #fed7aa; }
          td { padding: 10px 12px; border: 1px solid #e5e5e5; vertical-align: top; }
          
          .intro-text { color: #666; font-size: 11px; margin-bottom: 15px; }
          .table-desc { color: #888; font-size: 10px; margin-top: 4px; }
          
          .section-wrapper { page-break-inside: avoid; }
          .section-header-table { margin: 25px 0 15px 0; border: none; page-break-inside: avoid; page-break-after: avoid; }
          .section-bullet-cell { width: 35px; vertical-align: middle; border: none; padding: 0; }
          .section-title-cell { background-color: #fecdd3; padding: 8px 20px; font-size: 18px; font-weight: bold; border: none; }
          
          .status-done { background-color: #22c55e; color: white; padding: 3px 8px; font-size: 9px; }
          .status-ongoing { background-color: #eab308; color: white; padding: 3px 8px; font-size: 9px; }
          .status-pending { background-color: #ef4444; color: white; padding: 3px 8px; font-size: 9px; }
          
          .timeline-header { background-color: #f97316; color: white; text-align: center; padding: 8px; border: 1px solid #ea580c; }
          .timeline-fill { background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5; }
          .timeline-empty { background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5; }
          
          .checkbox { display: inline-block; width: 12px; height: 12px; border: 2px solid #f97316; margin-right: 10px; vertical-align: middle; }
          .checklist-row { margin: 10px 0; }
          
          .budget-table { margin: 20px auto; text-align: center; }
          .legend-box { display: inline-block; width: 12px; height: 12px; margin-right: 5px; vertical-align: middle; }
          
          .logo-header { text-align: right; margin-bottom: 15px; }
          .logo-text { font-size: 14px; font-weight: bold; color: #f97316; }
          .logo-sub { font-size: 10px; color: #666; }
          
          .contact-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; page-break-inside: avoid; }
        </style>
      </head>
      <body>
      
        <!-- PAGE 1 -->
        <div class="logo-header">
          <div class="logo-text">MALSONS</div>
          <div class="logo-sub">Construction & Renovation</div>
        </div>
        
        <h1>Renovation</h1>
        <h1>Readiness Guide</h1>
        
        <!-- Executive Summary Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">Executive Summary</td>
          </tr>
        </table>
        
        <p class="intro-text">
          This renovation guide contains the information needed to successfully complete your home renovation project. 
          It details the project's scope, timelines, possible risks, and budget considerations.
        </p>
        
        <table>
          <tr>
            <th>Goals</th>
            <th>Objectives</th>
          </tr>
          <tr>
            <td>
              <strong>Define your renovation vision</strong>
              <div class="table-desc">What are the long-term achievable outcomes of your project?</div>
            </td>
            <td>
              <strong>Set measurable milestones</strong>
              <div class="table-desc">What are the short-term actions that will help you reach your goals?</div>
            </td>
          </tr>
          <tr>
            <td>Maximize space utilization</td>
            <td>Complete demolition within first 2 weeks</td>
          </tr>
          <tr>
            <td>Modernize kitchen & bathrooms</td>
            <td>Finalize all material selections by Week 3</td>
          </tr>
          <tr>
            <td>Improve energy efficiency</td>
            <td>Complete M&E rough-in before tiling</td>
          </tr>
        </table>
        
        <!-- Scope Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">Scope</td>
          </tr>
        </table>
        
        <p class="intro-text">
          The scope outlines the project's boundaries and your renovation expectations. 
          It helps guide teams to accomplish their goals on time and within the set budget.
        </p>
        
        <p><strong>The Complete 20-Point Renovation Checklist</strong></p>
        
        <p style="margin-top: 15px; margin-bottom: 5px;"><strong style="color: #f97316;">Phase 1: Planning & Budgeting (Points 1-5)</strong></p>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Define Your Goals:</strong> Determine "Needs" vs. "Wants" (e.g., more storage vs. luxury finishes)
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Set a Realistic Budget:</strong> Research market rates and set a hard cap
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Contingency Fund:</strong> Set aside 10-15% extra for unforeseen issues (piping, wiring)
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Inspiration Board:</strong> Collect images on Pinterest/Instagram to communicate your visual style
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Research Contractors:</strong> Check portfolios, reviews, and verify CIDB registration
        </div>
        
        <p style="margin-top: 15px; margin-bottom: 5px;"><strong style="color: #f97316;">Phase 2: Pre-Construction (Points 6-10)</strong></p>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Site Assessment:</strong> Have pros check for structural issues, leaks, or electrical faults
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Finalize Floor Plan:</strong> Confirm all layout changes, socket points, and lighting plans
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Management Deposit:</strong> Check with building management for renovation deposit & rules
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Itemized Quotation:</strong> Ensure your quote breaks down costs clearly (no lump sums)
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Contract Signing:</strong> Agree on payment milestones and warranty terms
        </div>
        
        <p style="margin-top: 15px; margin-bottom: 5px;"><strong style="color: #f97316;">Phase 3: Materials & Appliances (Points 11-15)</strong></p>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Buy Appliances Early:</strong> Kitchen cabinets depend on exact fridge/oven dimensions
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Select Tiles & Sanitary:</strong> Choose slip-resistant tiles for wet areas
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Lighting Selection:</strong> Decide on Warm White (3000K) vs Cool White (4000K)
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Air-Con Placement:</strong> Plan piping routes to avoid ugly trunking later
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Paint Colors:</strong> Test samples on the wall before buying bulk
        </div>
        
        <p style="margin-top: 15px; margin-bottom: 5px;"><strong style="color: #f97316;">Phase 4: Execution & Handover (Points 16-20)</strong></p>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Protection:</strong> Ensure common areas and existing floors are protected
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Site Visits:</strong> Visit weekly to catch errors early (e.g. wrong tile placement)
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Joint Inspection:</strong> Test all power points, taps, and doors before final payment
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Defect Rectification:</strong> Mark defects with tape and ensure they are fixed
        </div>
        <div class="checklist-row">
          <span class="checkbox"></span> <strong>Deep Cleaning:</strong> Perform a "chemical wash" or deep clean before moving in
        </div>
        
        <div style="page-break-after: always; height: 0; margin: 0; padding: 0; border: none;"></div>
        
        <!-- PAGE 2 -->
        <div class="logo-header">
          <div class="logo-text">MALSONS</div>
          <div class="logo-sub">Construction & Renovation</div>
        </div>
        
        <!-- Risks Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">Risks and Considerations</td>
          </tr>
        </table>
        
        <p class="intro-text">
          Create a risk management plan for your project to plan ahead and avoid as many obstacles as possible.
        </p>
        
        <table>
          <tr>
            <th>Potential Risks</th>
            <th>Mitigation Strategies</th>
          </tr>
          <tr>
            <td>
              <strong>Hidden structural issues</strong>
              <div class="table-desc">Piping, wiring, or structural problems discovered during hacking</div>
            </td>
            <td>
              <strong>Budget contingency</strong>
              <div class="table-desc">Set aside 10-15% extra budget for unforeseen works</div>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Material delays</strong>
              <div class="table-desc">Imported tiles, custom cabinets may face shipping delays</div>
            </td>
            <td>
              <strong>Order early</strong>
              <div class="table-desc">Confirm all materials 4-6 weeks before installation date</div>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Permit issues</strong>
              <div class="table-desc">Building management may reject certain works</div>
            </td>
            <td>
              <strong>Pre-approval</strong>
              <div class="table-desc">Get all approvals in writing before signing contract</div>
            </td>
          </tr>
        </table>
        
        <!-- Milestones Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">Milestones</td>
          </tr>
        </table>
        
        <p class="intro-text">
          Milestones occur at different points during a project's timeline. Track your progress against these key stages.
        </p>
        
        <table>
          <tr>
            <th style="width: 50%;">Milestone</th>
            <th style="width: 20%;">Status</th>
            <th style="width: 30%;">Timeline</th>
          </tr>
          <tr>
            <td>Site handover & protection works</td>
            <td><span style="background-color: #22c55e; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Done ✓</span></td>
            <td>Week 1</td>
          </tr>
          <tr>
            <td>Hacking & demolition complete</td>
            <td><span style="background-color: #eab308; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Ongoing →</span></td>
            <td>Week 1-2</td>
          </tr>
          <tr>
            <td>M&E rough-in (electrical/plumbing)</td>
            <td><span style="background-color: #ef4444; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Pending</span></td>
            <td>Week 2-3</td>
          </tr>
          <tr>
            <td>Tiling & waterproofing</td>
            <td><span style="background-color: #ef4444; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Pending</span></td>
            <td>Week 3-4</td>
          </tr>
          <tr>
            <td>Carpentry installation</td>
            <td><span style="background-color: #ef4444; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Pending</span></td>
            <td>Week 5-6</td>
          </tr>
          <tr>
            <td>Final touch-up & deep cleaning</td>
            <td><span style="background-color: #ef4444; color: white; padding: 3px 8px; font-size: 9px; border-radius: 3px;">Pending</span></td>
            <td>Week 7-8</td>
          </tr>
        </table>
        
        <!-- Timeline Section -->
        <div class="section-wrapper">
          <!-- Timeline Section Header -->
          <table class="section-header-table" cellpadding="0" cellspacing="0">
            <tr>
              <td class="section-bullet-cell">
                <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
              </td>
              <td class="section-title-cell">Timeline</td>
            </tr>
          </table>
          
          <p class="intro-text">
            Project timelines help keep track of progress. A typical condo renovation takes 6-8 weeks.
          </p>
          
          <table>
            <tr>
              <th style="background: white; border: 1px solid #e5e5e5;"></th>
              <th style="background-color: #f97316; color: white; text-align: center; padding: 8px; border: 1px solid #ea580c;">Week 1-2</th>
              <th style="background-color: #f97316; color: white; text-align: center; padding: 8px; border: 1px solid #ea580c;">Week 3-4</th>
              <th style="background-color: #f97316; color: white; text-align: center; padding: 8px; border: 1px solid #ea580c;">Week 5-6</th>
              <th style="background-color: #f97316; color: white; text-align: center; padding: 8px; border: 1px solid #ea580c;">Week 7-8</th>
            </tr>
            <tr>
              <td><strong>Demolition</strong></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
            </tr>
            <tr>
              <td><strong>M&E Works</strong></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
            </tr>
            <tr>
              <td><strong>Wet Works</strong></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
            </tr>
            <tr>
              <td><strong>Carpentry</strong></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
            </tr>
            <tr>
              <td><strong>Finishing</strong></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #ffffff; height: 25px; border: 1px solid #e5e5e5;"></td>
              <td style="background-color: #fecdd3; height: 25px; border: 1px solid #e5e5e5;"></td>
            </tr>
          </table>
        </div>
        
        <div style="page-break-after: always; height: 0; margin: 0; padding: 0; border: none;"></div>
        
        <!-- PAGE 3 -->
        <div class="logo-header">
          <div class="logo-text">MALSONS</div>
          <div class="logo-sub">Construction & Renovation</div>
        </div>
        
        <!-- Budget Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">Budget Breakdown</td>
          </tr>
        </table>
        
        <p class="intro-text">
          Typical budget allocation for a renovation project:
        </p>
        
        <!-- SVG Donut Chart - Works in Google Apps Script -->
        <div style="text-align: center; margin: 20px 0;">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <!-- Donut segments -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#3b82f6" stroke-width="40" stroke-dasharray="201 503" stroke-dashoffset="0" transform="rotate(-90 110 110)"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#f97316" stroke-width="40" stroke-dasharray="126 503" stroke-dashoffset="-201" transform="rotate(-90 110 110)"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#22c55e" stroke-width="40" stroke-dasharray="75 503" stroke-dashoffset="-327" transform="rotate(-90 110 110)"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#eab308" stroke-width="40" stroke-dasharray="50 503" stroke-dashoffset="-402" transform="rotate(-90 110 110)"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#a855f7" stroke-width="40" stroke-dasharray="50 503" stroke-dashoffset="-452" transform="rotate(-90 110 110)"/>
            <!-- Center hole -->
            <circle cx="110" cy="110" r="60" fill="white"/>
          </svg>
        </div>
        
        <table style="width: 80%; margin: 0 auto; border: none;">
          <tr>
            <td style="border: none; text-align: center; padding: 5px;">
              <span class="legend-box" style="background-color: #3b82f6;"></span> Materials 40%
            </td>
            <td style="border: none; text-align: center; padding: 5px;">
              <span class="legend-box" style="background-color: #f97316;"></span> Carpentry 25%
            </td>
            <td style="border: none; text-align: center; padding: 5px;">
              <span class="legend-box" style="background-color: #22c55e;"></span> Wet Works 15%
            </td>
          </tr>
          <tr>
            <td style="border: none; text-align: center; padding: 5px;">
              <span class="legend-box" style="background-color: #eab308;"></span> M&E 10%
            </td>
            <td style="border: none; text-align: center; padding: 5px;">
              <span class="legend-box" style="background-color: #a855f7;"></span> Contingency 10%
            </td>
            <td style="border: none;"></td>
          </tr>
        </table>
        
        <!-- Cost Guide Section Header -->
        <table class="section-header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td class="section-bullet-cell">
              <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
            </td>
            <td class="section-title-cell">2026 Market Cost Guide</td>
          </tr>
        </table>
        
        <p class="intro-text">
          Estimates below are for standard to premium finishes in Klang Valley area.
        </p>
        
        <table>
          <tr>
            <th>Renovation Scope</th>
            <th>Estimated Range</th>
          </tr>
          <tr>
            <td>
              <strong>Whole House (Condo 800-1200sqft)</strong>
              <div class="table-desc">Wet works, flooring, carpentry, M&E</div>
            </td>
            <td><strong>RM 80,000 - RM 150,000</strong></td>
          </tr>
          <tr>
            <td>
              <strong>Kitchen & Bathroom Package</strong>
              <div class="table-desc">Cabinets, tiling, sanitary ware, plumbing</div>
            </td>
            <td><strong>RM 35,000 - RM 60,000</strong></td>
          </tr>
          <tr>
            <td>
              <strong>Landed House Extension</strong>
              <div class="table-desc">Rear/side extension with finishes</div>
            </td>
            <td><strong>RM 150 - RM 250 psf</strong></td>
          </tr>
          <tr>
            <td>
              <strong>Custom Carpentry</strong>
              <div class="table-desc">Wardrobes, TV console, feature walls</div>
            </td>
            <td><strong>RM 450 - RM 800 per foot run</strong></td>
          </tr>
        </table>
        
        <!-- Contact Section -->
        <div class="section-wrapper">
          <!-- Contact Section Header -->
          <table class="section-header-table" cellpadding="0" cellspacing="0">
            <tr>
              <td class="section-bullet-cell">
                <svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f97316"/></svg>
              </td>
              <td class="section-title-cell">Contact Information</td>
            </tr>
          </table>
          
          <p class="intro-text">For any inquiries on this project, reach out to:</p>
          
          <div class="contact-section">
            <p style="font-weight: bold; font-size: 14px; margin: 0;">Malsons Construction & Renovation</p>
            <p style="color: #666; margin: 5px 0;">Design & Build Specialists</p>
            <p style="margin: 15px 0;">
              <strong>📞</strong> +60 10-969 4022<br>
              <strong>📍</strong> Bandar Kinrara 1, Puchong, Selangor
            </p>
            <p style="color: #f97316; font-weight: bold; margin-top: 20px;">
              Book your free site visit today!
            </p>
          </div>
        </div>
        
      </body>
    </html>
  `;
}

function setupSheet() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName('Leads') || doc.insertSheet('Leads');
  const neededHeaders = ['Timestamp', 'Email', 'Source', 'Property', 'Type', 'Size', 'Budget', 'Estimate', 'Condition', 'Style', 'KitchenSize', 'Bathrooms', 'ReadinessScore'];
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, neededHeaders.length).setValues([neededHeaders]);
}

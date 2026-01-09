/**
 * Simple storage service to send lead data to Google Sheets
 */

interface LeadData {
    email: string;
    source: 'hero' | 'estimator' | 'checklist' | 'contact';
    property?: string;
    type?: string;
    size?: string;
    budget?: string;
    estimate?: string;
    condition?: string;
    style?: string;
    kitchenSize?: string;
    bathrooms?: string;
    readinessScore?: number;
    [key: string]: any;
}

// NOTE: The URL will be provided by the user and should be placed in .env.local as VITE_GOOGLE_SHEETS_URL
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export const saveLead = async (data: LeadData): Promise<boolean> => {
    if (!GOOGLE_SHEETS_URL) {
        console.warn("VITE_GOOGLE_SHEETS_URL is not set. Data will not be saved.");
        // We return true to not break the UI if the URL isn't set yet
        return true;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: "POST",
            mode: "no-cors", // Required for Google Apps Script Web App
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // With no-cors, we can't actually read the response status, 
        // but the request will be sent to Google.
        return true;
    } catch (error) {
        console.error("Error saving lead:", error);
        return false;
    }
};

import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Lock, AlertCircle, RefreshCcw } from 'lucide-react';
import { calculateRenovationCost } from '../utils/estimator';
import { saveLead } from '../services/storage';

const CostEstimator: React.FC = () => {
  const [step, setStep] = useState<'property' | 'type' | 'condition' | 'style' | 'rooms' | 'size' | 'details' | 'gate' | 'result'>('property');
  const [data, setData] = useState({
    property: '',
    type: '',
    condition: '',
    style: '',
    size: '',
    budget: '',
    timeline: '',
    email: '',
    kitchenSize: '',
    bathrooms: ''
  });
  const [errors, setErrors] = useState<{ size?: string; email?: string }>({});

  const handleNext = (nextStep: typeof step) => {
    setStep(nextStep);
  };

  const handleReset = () => {
    setStep('property');
    setData({
      property: '',
      type: '',
      condition: '',
      style: '',
      size: '',
      budget: '',
      timeline: '',
      email: '',
      kitchenSize: '',
      bathrooms: ''
    });
    setErrors({});
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (value === '' || /^\d+$/.test(value)) {
      setData({ ...data, size: value });

      // Validation
      const num = parseInt(value);
      if (value && (num < 100 || num > 50000)) {
        setErrors({ ...errors, size: 'Please enter a realistic size (100-50,000 sqft)' });
      } else {
        const newErrors = { ...errors };
        delete newErrors.size;
        setErrors(newErrors);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, email: value });

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  }

  const calculateEstimate = () => {
    // strict parsing for safety
    const sizeNum = parseInt(data.size) || 0;

    return calculateRenovationCost({
      size: sizeNum,
      type: data.type,
      property: data.property,
      condition: data.condition,
      style: data.style,
      kitchenSize: data.kitchenSize,
      bathrooms: data.bathrooms
    });
  };

  return (
    <section id="estimator" className="py-24 bg-stone-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-amber-100 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-stone-200 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block p-3 bg-white border border-stone-200 rounded-2xl mb-4 shadow-sm">
              <Calculator className="w-8 h-8 text-amber-600" />
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Renovation Cost Estimator</h2>
            <p className="text-stone-600 text-lg">Get a rough estimate for your project in seconds.</p>
          </div>

          {/* Dark Professional Card in Light Section */}
          <div className="glass-card bg-stone-900 text-white border border-stone-800 min-h-[500px] flex flex-col overflow-hidden shadow-2xl rounded-3xl relative">

            {/* Subtle inner noise/texture */}
            <div className="absolute inset-0 bg-stone-900 opacity-90 z-0"></div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-stone-800 relative z-10">
              <div
                className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all duration-500"
                style={{
                  width: step === 'property' ? '12%' :
                    step === 'type' ? '25%' :
                      step === 'condition' ? '37%' :
                        step === 'style' ? '50%' :
                          step === 'rooms' || step === 'size' ? '62%' :
                            step === 'details' ? '75%' :
                              step === 'gate' ? '87%' : '100%'
                }}
              ></div>
            </div>

            <div className="flex-grow p-8 md:p-12 flex flex-col justify-center text-white relative z-10">

              {/* Step 1: Property Type */}
              {step === 'property' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 1/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">What type of property is it?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Landed House', 'Condo / Apt', 'Shop Lot', 'Office'].map((item) => (
                      <button
                        key={item}
                        onClick={() => { setData({ ...data, property: item }); handleNext('type'); }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all text-center font-medium text-stone-200 hover:text-white hover:scale-105"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Renovation Type */}
              {step === 'type' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 2/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">What are you planning?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Full Renovation', 'Partial Renovation', 'Kitchen & Bath', 'Office Fit-Out'].map((item) => (
                      <button
                        key={item}
                        onClick={() => { setData({ ...data, type: item }); handleNext('condition'); }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all text-center font-medium text-stone-200 hover:text-white hover:scale-105"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep('property')} className="mt-8 text-stone-400 hover:text-white underline text-sm transition-colors">Back</button>
                </div>
              )}

              {/* Step 3: Condition */}
              {step === 'condition' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 3/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">What is the unit condition?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Newly Handed Over / Sub-sale', 'Older / Resale Unit'].map((item) => (
                      <button
                        key={item}
                        onClick={() => { setData({ ...data, condition: item }); handleNext('style'); }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all text-left font-medium text-stone-200 hover:text-white group"
                      >
                        <div className="text-lg mb-1">{item}</div>
                        <div className="text-xs text-stone-400 group-hover:text-stone-300">
                          {item.includes('Older') ? 'Requires more hacking and piping works.' : 'Standard renovation scope.'}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep('type')} className="mt-8 text-stone-400 hover:text-white underline text-sm transition-colors">Back</button>
                </div>
              )}

              {/* Step 4: Style */}
              {step === 'style' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 4/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">Design Preference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Minimalist / Basic', desc: 'Focus on functionality and essential works.' },
                      { name: 'Modern / Premium', desc: 'Sleek design with high-quality materials.' },
                      { name: 'Luxury / Bespoke', desc: 'Custom craftsmanship and premium finishes.' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          setData({ ...data, style: item.name });
                          handleNext(data.type === 'Kitchen & Bath' ? 'rooms' : 'size');
                        }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all text-left font-medium text-stone-200 hover:text-white group"
                      >
                        <div className="text-lg mb-1">{item.name}</div>
                        <div className="text-xs text-stone-400 group-hover:text-stone-300">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep('condition')} className="mt-8 text-stone-400 hover:text-white underline text-sm transition-colors">Back</button>
                </div>
              )}

              {/* Step 5: Rooms (Kitchen & Bath only) */}
              {step === 'rooms' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 5/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">Kitchen & Bathroom Details</h3>

                  <div className="space-y-8 max-w-lg">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-stone-300">Kitchen Size</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Compact', 'Standard', 'Large'].map(s => (
                          <button
                            key={s}
                            onClick={() => setData({ ...data, kitchenSize: s })}
                            className={`p-3 rounded-xl border text-sm transition-all ${data.kitchenSize === s ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3 text-stone-300">Number of Bathrooms</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['1', '2', '3', '4+'].map(b => (
                          <button
                            key={b}
                            onClick={() => setData({ ...data, bathrooms: b })}
                            className={`p-3 rounded-xl border text-sm transition-all ${data.bathrooms === b ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'}`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      disabled={!data.kitchenSize && !data.bathrooms}
                      onClick={() => handleNext('details')}
                      className="w-full py-4 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-200 transition-colors shadow-lg"
                    >
                      Continue
                    </button>
                  </div>
                  <button onClick={() => setStep('style')} className="mt-8 text-stone-400 hover:text-white underline text-sm transition-colors">Back</button>
                </div>
              )}

              {/* Step 6: Size */}
              {step === 'size' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 5/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-6">Approximate Size (sqft)</h3>

                  {data.type === 'Partial Renovation' && (
                    <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                      <AlertCircle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200 leading-relaxed">
                        <strong>Note:</strong> Please enter the size of the <strong>renovation area only</strong> (e.g., Bedroom 1), not the whole house size.
                      </p>
                    </div>
                  )}

                  <div className="w-full md:w-1/2 mb-8">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 1200"
                      className={`w-full p-5 text-xl bg-black/20 border rounded-2xl focus:outline-none focus:bg-black/30 text-white placeholder-stone-500 transition-all ${errors.size ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/40'
                        }`}
                      value={data.size}
                      onChange={handleSizeChange}
                    />
                    {errors.size && (
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm animate-fade-in">
                        <AlertCircle size={14} />
                        <span>{errors.size}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      disabled={!data.size || !!errors.size}
                      onClick={() => handleNext('details')}
                      className="px-10 py-4 bg-white text-stone-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-200 transition-colors inline-flex items-center shadow-lg hover:shadow-white/10"
                    >
                      Next Step <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                  <button onClick={() => setStep('style')} className="mt-8 text-stone-400 hover:text-white underline text-sm block transition-colors">Back</button>
                </div>
              )}

              {/* Step 6: Budget & Timeline */}
              {step === 'details' && (
                <div className="animate-fade-in">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 6/7</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-8">Almost there. Any constraints?</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-stone-300">Budget Range (MYR)</label>
                      <select
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-white/40 text-white appearance-none cursor-pointer hover:bg-black/30 transition-colors"
                        onChange={(e) => setData({ ...data, budget: e.target.value })}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="">Select Range</option>
                        <option>Below RM 50k</option>
                        <option>RM 50k - RM 100k</option>
                        <option>RM 100k - RM 250k</option>
                        <option>RM 250k+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-stone-300">Desired Timeline</label>
                      <select
                        className="w-full p-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-white/40 text-white appearance-none cursor-pointer hover:bg-black/30 transition-colors"
                        onChange={(e) => setData({ ...data, timeline: e.target.value })}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="">Select Timeline</option>
                        <option>Immediately</option>
                        <option>Within 3 months</option>
                        <option>3 - 6 months</option>
                        <option>Next year</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNext('gate')}
                    className="w-full md:w-auto px-10 py-4 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-200 transition-colors shadow-lg hover:shadow-white/10"
                  >
                    Calculate Estimation
                  </button>
                  <button onClick={() => setStep(data.type === 'Kitchen & Bath' ? 'rooms' : 'size')} className="mt-8 text-stone-400 hover:text-white underline text-sm block transition-colors">Back</button>
                </div>
              )}

              {/* Step 7: Email Gate */}
              {step === 'gate' && (
                <div className="animate-fade-in max-w-md mx-auto w-full text-center">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step 7/7</span>
                  <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-6 ring-1 ring-white/20">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-white mb-2">Get your detailed estimate</h3>
                    <p className="text-sm text-stone-300 mb-6">We’ll send a PDF tailored to your inputs. No spam.</p>

                    <div className="mb-4 text-left">
                      <input
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={data.email}
                        onChange={handleEmailChange}
                        className={`w-full px-5 py-4 bg-black/30 border rounded-xl focus:outline-none focus:bg-black/40 text-white transition-colors placeholder-white/30 ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-white/40'
                          }`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-xs animate-fade-in pl-1">
                          <AlertCircle size={12} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={async () => {
                        if (data.email && !errors.email) {
                          handleNext('result');
                          await saveLead({
                            email: data.email,
                            source: 'estimator',
                            property: data.property,
                            type: data.type,
                            size: data.size,
                            budget: data.budget,
                            estimate: calculateEstimate(),
                            condition: data.condition,
                            style: data.style,
                            kitchenSize: data.kitchenSize,
                            bathrooms: data.bathrooms
                          });
                        }
                      }}
                      disabled={!data.email || !!errors.email}
                      className="w-full py-4 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send my estimate (Free)
                    </button>
                    <p className="text-[10px] text-stone-400 mt-4">We’ll only email you the requested estimate. Unsubscribe anytime.</p>
                  </div>
                  <button onClick={() => setStep('details')} className="mt-8 text-stone-400 hover:text-white underline text-sm block mx-auto transition-colors">Back</button>
                </div>
              )}

              {/* Final Result */}
              {step === 'result' && (
                <div className="animate-fade-in text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-xl text-stone-300 mb-2">Estimated Renovation Range</h3>
                  <div className="text-4xl md:text-6xl font-display font-bold text-white mb-8 drop-shadow-xl">
                    {calculateEstimate()}
                  </div>
                  <p className="text-stone-300 max-w-lg mx-auto mb-8 text-sm md:text-base">
                    This is a market estimation based on <strong>{data.style}</strong> standards for a <strong>{data.condition}</strong> unit.
                    PDF copy sent to <strong>{data.email}</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href={`https://wa.me/60109694022?text=${encodeURIComponent(
                        `Hi Malsons, I got an estimate of ${calculateEstimate()} for my project.

Project Details:
- Property: ${data.property} (${data.condition})
- Plan: ${data.type}
- Size: ${data.size} sqft
- Style: ${data.style}
${data.kitchenSize ? `- Kitchen: ${data.kitchenSize}\n` : ''}${data.bathrooms ? `- Bathrooms: ${data.bathrooms}\n` : ''}${data.budget ? `- My Budget: ${data.budget}\n` : ''}${data.timeline ? `- Timeline: ${data.timeline}\n` : ''}
Can we discuss a site visit?`
                      )}`}
                      target="_blank"
                      className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-900/40 flex items-center justify-center"
                    >
                      WhatsApp for Exact Quote
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" /> Start Over
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
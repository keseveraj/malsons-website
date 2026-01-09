import React, { useState } from 'react';
import { CheckSquare, Square, Download, Check, MessageSquare } from 'lucide-react';
import { saveLead } from '../services/storage';

const ReadinessChecklist: React.FC = () => {
  const [checked, setChecked] = useState({
    budget: false,
    design: false,
    approval: false,
    timeline: false,
  });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggle = (key: keyof typeof checked) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const count = Object.values(checked).filter(Boolean).length;
  const percentage = (count / 4) * 100;

  const handleSend = async () => {
    if (email) {
      setIsSubmitted(true);
      await saveLead({
        email,
        source: 'checklist',
        readinessScore: percentage
      });
      setTimeout(() => setIsSubmitted(false), 5000);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop"
          alt="Architecture Background"
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3 text-stone-900">Are You Renovation Ready?</h2>
            <p className="text-stone-500">Check what you have prepared to see where you stand.</p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { key: 'budget', label: 'Budget Prepared', desc: 'I have a clear max budget set aside.' },
              { key: 'design', label: 'Design Inspiration Ready', desc: 'I have photos or moodboards of what I want.' },
              { key: 'approval', label: 'Management/Approvals', desc: 'I know the renovation guidelines for my area.' },
              { key: 'timeline', label: 'Timeline Decided', desc: 'I know when I want to start and move in.' }
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => toggle(item.key as keyof typeof checked)}
                className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${checked[item.key as keyof typeof checked]
                  ? 'bg-green-50 border-green-200'
                  : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
              >
                <div className={`mr-4 ${checked[item.key as keyof typeof checked] ? 'text-green-600' : 'text-stone-400'}`}>
                  {checked[item.key as keyof typeof checked] ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">{item.label}</h4>
                  <p className="text-xs text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="text-lg font-medium mb-3 text-stone-600">
              You're <span className="text-amber-600 font-bold text-2xl">{percentage}%</span> Ready
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full mb-10 overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
            </div>

            {/* Secondary Lead Magnet Capture */}
            <div className="bg-stone-900 text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-2 flex items-center justify-center text-lg">
                  <Download className="w-5 h-5 mr-2" /> Download Full Checklist PDF
                </h4>
                <p className="text-sm text-stone-300 mb-6">Get the complete 20-point checklist + cost guide.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  {!isSubmitted ? (
                    <>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow px-5 py-3 text-sm bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/50 text-white placeholder-stone-400"
                      />
                      <button
                        onClick={handleSend}
                        className="px-6 py-3 bg-white text-stone-900 text-sm font-bold rounded-xl hover:bg-stone-100 transition-colors"
                      >
                        Send
                      </button>
                    </>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center py-2 animate-fade-in">
                      <div className="text-green-400 font-bold flex items-center mb-4">
                        <Check className="w-5 h-5 mr-2" /> Checklist Sent!
                      </div>
                      <a
                        href={`https://wa.me/60109694022?text=${encodeURIComponent(
                          `Hi Malsons, I just completed your Readiness Checklist.

My Readiness Score: ${percentage}%

What I have prepared:
${checked.budget ? '✓ Budget is set aside\n' : ''}${checked.design ? '✓ Design inspiration ready\n' : ''}${checked.approval ? '✓ Management approvals understood\n' : ''}${checked.timeline ? '✓ Timeline decided\n' : ''}
I'd like to discuss my renovation project and plan the next steps.`
                        )}`}
                        target="_blank"
                        className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center shadow-lg"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" /> Discuss Results on WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadinessChecklist;
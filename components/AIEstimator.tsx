import React, { useState } from 'react';
import { getRenovationEstimate, EstimateResult } from '../services/gemini';
import { Sparkles, Loader2, Send, AlertCircle } from 'lucide-react';

const AIEstimator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState('');

  const handleEstimate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await getRenovationEstimate(prompt);
      setResult(data);
    } catch (err) {
      setError('Sorry, we faced an issue connecting to our estimator. Please try again later or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-estimator" className="py-24 bg-stone-50 text-stone-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Context */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-stone-200 px-3 py-1 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium uppercase tracking-wider text-stone-600">AI Powered Consultant</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-stone-900">
              Curious about costs? <br />
              <span className="text-stone-400">Ask instantly.</span>
            </h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Skip the long wait for a preliminary quote. Describe your renovation idea, and our AI will give you a rough market estimate, timeline, and key considerations for the Malaysian market.
            </p>
            
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h4 className="font-semibold mb-2 text-stone-900">Try asking:</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li className="cursor-pointer hover:text-amber-600 transition-colors" onClick={() => setPrompt("I want to renovate a 1200sqft condo in KL. Modern minimalist style. Hack 2 walls, new kitchen, 2 bathrooms.")}>
                  "I want to renovate a 1200sqft condo in KL..."
                </li>
                <li className="cursor-pointer hover:text-amber-600 transition-colors" onClick={() => setPrompt("How much to extend the kitchen of a double-storey terrace house by 10 feet?")}>
                  "How much to extend the kitchen of a terrace house..."
                </li>
                <li className="cursor-pointer hover:text-amber-600 transition-colors" onClick={() => setPrompt("Cost to convert a shop lot into a hipster cafe with polished concrete floors.")}>
                  "Cost to convert a shop lot into a cafe..."
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-stone-900 shadow-xl border border-stone-100">
            <h3 className="text-xl font-bold mb-4 flex items-center font-serif">
              Smart Estimator
              {isLoading && <Loader2 className="ml-2 w-4 h-4 animate-spin text-stone-400" />}
            </h3>
            
            <div className="relative mb-6">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your renovation needs here..."
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none min-h-[120px] resize-none text-stone-700"
              />
              <button
                onClick={handleEstimate}
                disabled={isLoading || !prompt.trim()}
                className="absolute bottom-4 right-4 bg-stone-900 text-white p-2 rounded-full hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                {error}
              </div>
            )}

            {result && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-stone-50 p-5 rounded-xl border-l-4 border-amber-500">
                  <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Estimated Cost</span>
                  <div className="text-3xl font-serif font-bold text-stone-900 mt-1">{result.estimatedCostRange}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                     <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Timeline</span>
                     <div className="text-lg font-semibold text-stone-900 mt-1">{result.timelineEstimate}</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                     <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Confidence</span>
                     <div className="text-lg font-semibold text-stone-900 mt-1">Estimates Only</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm uppercase text-stone-400 mb-3">Cost Breakdown Drivers</h4>
                  <ul className="space-y-2">
                    {result.breakdown.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-stone-600">
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-1.5 mr-2 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-sm uppercase text-stone-400 mb-3">Pro Advice</h4>
                  <ul className="space-y-2">
                     {result.considerations.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-stone-600">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4">
                  <p className="text-xs text-stone-400 italic mb-4">
                    *This is an AI-generated estimate based on current market rates. Actual costs may vary based on material selection and site conditions.
                  </p>
                  <a href="#contact" className="block w-full text-center py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors shadow-lg">
                    Get an Official Site Visit
                  </a>
                </div>
              </div>
            )}
            
            {!result && !isLoading && !error && (
              <div className="text-center py-10 text-stone-400">
                <p className="text-sm">Results will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEstimator;
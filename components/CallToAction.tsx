import React from 'react';
import { ArrowRight, MessageSquare, Calendar } from 'lucide-react';

const CallToAction: React.FC = () => {
  const getCurrentQuarter = () => {
    const date = new Date();
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    const year = date.getFullYear();
    return `Q${quarter} ${year}`;
  };

  return (
    <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/0 via-stone-900/60 to-stone-900"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>Limited Slots for {getCurrentQuarter()}</span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 tracking-tight animate-fade-up [animation-delay:200ms]">
          Ready to build your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Masterpiece?</span>
        </h2>

        <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up [animation-delay:400ms]">
          From concept to keys, we handle the chaos so you can enjoy the creation.
          Schedule a free site assessment with our senior architect today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:600ms]">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-5 bg-white text-stone-900 font-bold rounded-2xl hover:bg-stone-100 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center"
          >
            Book Free Site Visit
            <Calendar className="ml-2 w-5 h-5" />
          </a>

          <a
            href={`https://wa.me/60109694022?text=${encodeURIComponent("Hi Malsons, I'm interested in learning more about your renovation services. Can we discuss my project?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 bg-stone-800/50 backdrop-blur-md text-white font-bold rounded-2xl border border-white/10 hover:bg-stone-800 transition-all flex items-center justify-center group"
          >
            <MessageSquare className="mr-2 w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
            WhatsApp Us
          </a>
        </div>

        <p className="mt-8 text-sm text-stone-500 animate-fade-up [animation-delay:800ms]">
          No obligations. 100% Free Consultation.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
import React from 'react';
import { ArrowRight, Star, Clock, Home, Trophy } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-stone-900 py-20 px-6">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-900/40 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Modern Home Interior"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
      </div>

      <div className="container mx-auto relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-serif text-white leading-[1] mb-8 drop-shadow-2xl">
              Elevating the <br />
              <span className="text-stone-300 italic font-light">Living Experience</span>
            </h1>

            <p className="text-lg md:text-2xl text-stone-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              Malsons CR specializes in high-end renovation and construction.
              We blend engineering precision with timeless design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#estimator"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-500 transition-all shadow-2xl hover:shadow-amber-900/40 transform hover:-translate-y-1"
              >
                Estimate Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-2xl hover:bg-white/20 transition-all shadow-xl"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="mt-24 md:mt-32 max-w-5xl mx-auto opacity-0 animate-fade-up [animation-delay:800ms]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-black/30 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="text-center md:border-r border-white/10">
              <div className="flex justify-center h-8 items-center mb-2">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">10+</div>
              <div className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">Years Experience</div>
            </div>

            <div className="text-center md:border-r border-white/10">
              <div className="flex justify-center h-8 items-center mb-2">
                <Home className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">99+</div>
              <div className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">Units Completed</div>
            </div>

            <div className="text-center md:border-r border-white/10">
              <div className="flex justify-center h-8 items-center mb-2">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">100%</div>
              <div className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">On-Time Delivery</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center h-8 items-center mb-2">
                <div className="flex -space-x-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">5.0</div>
              <div className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-bold">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
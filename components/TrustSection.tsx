import React from 'react';
import { ArrowUpRight, Users, ShieldCheck, Clock, Heart, HardHat, Hammer } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-stone-100 text-stone-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-5 lg:col-start-1 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-stone-900 rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-widest text-stone-600">Our Impact</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight text-stone-900">
              We specialize in the art of transforming vision into <span className="italic text-stone-500">living reality</span>.
            </h2>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl leading-relaxed">
              With expertise in construction, interior design, and project management, we build spaces that captivate and comfort across <span className="text-stone-900 font-medium">Kuala Lumpur, Subang Jaya, Petaling Jaya</span>, and surrounding Klang Valley areas.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-fr">

          {/* Card 1: White, Top Left (Value Prop) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-200 relative overflow-hidden flex flex-col justify-between min-h-[300px] md:min-h-[320px] group transition-all hover:shadow-xl">
            <div className="max-w-md relative z-10">
              <p className="text-lg text-stone-600 leading-relaxed mb-4">
                Discover the potential of your property in every detail. Embrace the tranquility of a well-built home.
              </p>
            </div>

            <div className="relative z-10">
              <div className="text-6xl md:text-7xl font-display font-bold text-stone-900 mb-2 group-hover:scale-105 transition-transform origin-left duration-500">
                25%
              </div>
              <p className="text-lg font-medium text-stone-500">Average Property Value Increase</p>
            </div>

            {/* Circular Contact Badge */}
            <div className="relative self-end mt-4 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-12 w-20 h-20 md:w-32 md:h-32 rounded-full border border-stone-200 flex items-center justify-center bg-stone-50 group-hover:bg-amber-100 transition-colors cursor-pointer animate-[spin_10s_linear_infinite]">
              <svg viewBox="0 0 100 100" width="100" height="100" className="w-full h-full p-2">
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="11" letterSpacing="1.2">
                  <textPath href="#circle" className="uppercase font-bold fill-stone-800">
                    • Get a Quote • Contact Us
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-stone-900" />
              </div>
            </div>
          </div>

          {/* Card 2: Dark, Top Right (Revenue/Value) */}
          <div className="lg:col-span-5 bg-stone-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[300px] md:min-h-[320px] text-white group">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:opacity-70 transition-opacity"></div>

            <div className="relative z-10">
              <div className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
                Zero
              </div>
              <div className="h-px w-12 bg-stone-600 mb-4 group-hover:w-24 transition-all"></div>
              <h3 className="text-2xl font-medium mb-2">Hidden Costs</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                We value transparency. Our detailed, itemized quotations ensure you pay exactly what was agreed, with no surprise add-ons.
              </p>
            </div>
          </div>

          {/* Card 3: Dark, Bottom Left (Visibility/Projects) */}
          <div className="lg:col-span-5 bg-stone-800 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-end min-h-[300px] md:min-h-[320px] text-white group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">
                150+
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Happy Families & Businesses</h3>
              <p className="text-stone-400 text-sm">
                Experience the joy of a space built around your life. Find happiness in the little details.
              </p>
            </div>
          </div>

          {/* Card 4: White, Bottom Right (Features/Tags) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-stone-200 relative overflow-hidden flex flex-col min-h-[300px] md:min-h-[320px]">

            <div className="flex items-center space-x-3 mb-6 md:mb-8">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-stone-900" />
              </div>
              <span className="font-bold text-stone-900">Our Core Standards</span>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-center h-full content-center py-4">
              {[
                { text: "Transparency", icon: <ShieldCheck size={16} />, rotate: "-rotate-2", color: "bg-blue-100 text-blue-800" },
                { text: "Passion", icon: <Heart size={16} />, rotate: "rotate-3", color: "bg-red-100 text-red-800" },
                { text: "Craftsmanship", icon: <Hammer size={16} />, rotate: "-rotate-1", color: "bg-amber-100 text-amber-800" },
                { text: "Safety First", icon: <HardHat size={16} />, rotate: "rotate-2", color: "bg-orange-100 text-orange-800" },
                { text: "On-Time", icon: <Clock size={16} />, rotate: "-rotate-3", color: "bg-green-100 text-green-800" },
                { text: "Warranty", icon: <ShieldCheck size={16} />, rotate: "rotate-1", color: "bg-stone-100 text-stone-800" },
                { text: "Quality", icon: <ArrowUpRight size={16} />, rotate: "-rotate-2", color: "bg-purple-100 text-purple-800" },
              ].map((tag, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base shadow-sm border border-black/5 transform transition-transform hover:scale-110 cursor-default ${tag.rotate} ${tag.color}`}
                >
                  {tag.icon}
                  <span>{tag.text}</span>
                </div>
              ))}
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-stone-50 rounded-full blur-2xl -z-0"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;
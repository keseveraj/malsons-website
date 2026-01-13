import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: "01",
      title: "Residential Renovation",
      desc: "Transforming existing properties into modern sanctuaries. We specialize in layout optimization, wet works, and high-end finishing for condos and landed homes.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Wet Works", "Tiling", "Plumbing", "Electrical", "Painting"],
      stat: "4-8 Weeks",
      statLabel: "Typical Timeline"
    },
    {
      id: "02",
      title: "Commercial & Office",
      desc: "Creating productive workspaces and engaging retail environments. We understand the importance of business continuity and strict mall guidelines.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Partitioning", "Flooring", "M&E Works", "Fire Safety", "Signage"],
      stat: "100% On-Time",
      statLabel: "Completion Rate"
    },
    {
      id: "03",
      title: "Design & Build",
      desc: "A holistic approach where we handle everything from the first sketch to the final handover. Perfect for owners who want a hassle-free experience.",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["3D Modeling", "Space Planning", "Material Sourcing", "Construction", "Permits"],
      stat: "Single Point",
      statLabel: "Of Contact"
    },
    {
      id: "04",
      title: "Custom Carpentry",
      desc: "Bespoke cabinetry and joinery tailored to your space. Our in-house carpenters ensure perfect fit and finish for wardrobes, kitchens, and feature walls.",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop",
      tags: ["Kitchen Cabinets", "Wardrobes", "TV Consoles", "Feature Walls", "Shoe Racks"],
      stat: "Lifetime",
      statLabel: "Warranty on Hinges"
    }
  ];

  return (
    <section id="services" className="bg-stone-50 py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">

        <div className="mb-12 md:mb-20 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mt-3 leading-tight">
            Building Excellence <span className="text-stone-400 italic">Layer by Layer</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 pb-12 md:pb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative lg:sticky"
              style={{
                top: `calc(5rem + ${index * 1}rem)`, // Adjusted for mobile sticking
                zIndex: index + 1
              }}
            >
              <div className="bg-stone-900 rounded-[2rem] p-6 md:p-12 border border-stone-800 shadow-2xl overflow-hidden relative group min-h-auto lg:min-h-[550px] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-stone-800/60 rounded-full blur-[120px] -z-0 pointer-events-none translate-x-1/2 -translate-y-1/2 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-900/20 rounded-full blur-[100px] -z-0 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                {/* Left Column: Info */}
                <div className="flex flex-col justify-between lg:w-5/12 relative z-10 h-full w-full">
                  <div>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <span className="text-amber-500 font-bold text-lg md:text-xl">● {service.id}</span>
                      <div className="h-px bg-stone-700 w-12 md:w-16"></div>
                    </div>
                    <h3 className="text-2xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                      {service.desc}
                    </p>
                  </div>

                  <div className="hidden lg:block">
                    <p className="text-stone-500 text-xs mb-2 uppercase tracking-widest">{service.statLabel}</p>
                    <p className="text-3xl text-white font-display font-bold">{service.stat}</p>
                  </div>
                </div>

                {/* Middle: Image */}
                <div className="lg:w-4/12 relative z-10 w-full">
                  {/* On mobile/tablet, use aspect-video (landscape). On desktop, aspect-[3/4] */}
                  <div className="relative w-full aspect-video lg:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 group-hover:scale-[1.02] transition-transform duration-700 bg-stone-800">
                    <img
                      src={service.image}
                      alt={`${service.title} - Professional Renovation Service by Malsons`}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Right Column: Tags */}
                <div className="lg:w-3/12 flex flex-col justify-center relative z-10 w-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/10 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-bold mb-4 flex items-center text-sm uppercase tracking-wider">
                      Scope Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-300 text-xs hover:border-amber-500/50 hover:text-amber-100 transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a href="#contact" className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex items-center justify-between group/link cursor-pointer hover:text-amber-400 transition-colors">
                      <span className="text-white font-medium text-sm group-hover/link:text-amber-400">Get Quote</span>
                      <div className="w-8 h-8 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover/link:bg-amber-400 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>

                  <div className="lg:hidden mt-6 flex items-center justify-between px-2">
                    <div>
                      <p className="text-stone-500 text-[10px] uppercase tracking-wider">{service.statLabel}</p>
                      <p className="text-xl text-white font-display font-bold">{service.stat}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
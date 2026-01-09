import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Consultation & Site Visit",
      desc: "We meet at your property to assess site conditions, discuss your vision, and understand your lifestyle needs."
    },
    {
      id: "02",
      title: "Design & Quotation",
      desc: "We provide a transparent, itemized quotation and 3D conceptual designs to align with your budget."
    },
    {
      id: "03",
      title: "Material Selection",
      desc: "Choose your tiles, sanitary ware, and finishes with our guidance to ensure durability and aesthetics."
    },
    {
      id: "04",
      title: "Construction Phase",
      desc: "Our skilled team executes the renovation with weekly progress updates to keep you informed."
    },
    {
      id: "05",
      title: "Handover",
      desc: "Final joint inspection, defect rectification, and official key handover for your dream home."
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-stone-100 text-stone-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white pointer-events-none skew-x-12 opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Process</span>
            <span className="w-px h-3 bg-stone-300"></span>
            <span className="text-xs text-stone-500">Simple steps to your dream space</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Working Process</h2>
          <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
            We prioritize transparency and communication. Here is how we turn your vision into reality, step by step.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Side: Image */}
          <div className="relative lg:sticky lg:top-32">
             <div className="aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop" 
                  alt="Renovation Planning" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Content on Image */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                   <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl max-w-xs shadow-lg">
                      <p className="text-sm font-medium text-stone-900">"Detailed planning is the secret to a smooth renovation."</p>
                   </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
             <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-stone-300 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Right Side: Vertical Timeline */}
          <div className="relative pl-0 md:pl-0 pt-4">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-stone-300 hidden md:block"></div>

            <div className="space-y-10 md:space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row group">
                  {/* Number Bubble (Desktop) */}
                  <div className="hidden md:flex flex-col items-center mr-8 z-10 shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${index === 0 ? 'bg-stone-900 border-stone-900 text-white shadow-lg scale-110' : 'bg-stone-50 border-stone-300 text-stone-400 group-hover:border-stone-500 group-hover:text-stone-600'}`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl md:text-2xl font-serif font-bold mb-2 md:mb-3 transition-colors ${index === 0 ? 'text-stone-900' : 'text-stone-600 md:text-stone-400 group-hover:text-stone-900'}`}>
                      <span className="inline-block md:hidden mr-2 text-amber-600">{step.id}.</span>
                      {step.title}
                    </h3>
                    <p className="text-stone-500 leading-relaxed group-hover:text-stone-600 transition-colors text-base md:text-base max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
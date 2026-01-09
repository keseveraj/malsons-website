import React from 'react';

const Clients: React.FC = () => {
   return (
      <section className="py-6 bg-stone-50 border-b border-stone-200 overflow-hidden">
         <div className="container mx-auto px-6 mb-8 md:hidden">
            <p className="text-xs text-stone-400 font-bold text-center uppercase tracking-widest">Trusted By</p>
         </div>

         <div className="relative w-full">
            {/* Gradient Fade Edges - Light */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
               {/* Render logos multiple times for seamless infinite loop */}
               {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-16 md:gap-24 px-8 md:px-12">

                     {/* Midor */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-32 md:w-48 px-2">
                        <img src="/logo/Midor-removebg-preview.png" alt="Midor" className="h-14 md:h-20 w-auto object-contain scale-125 md:scale-150" />
                     </div>

                     {/* Pharm_D - Increase size */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-32 md:w-48 px-2">
                        <img src="/logo/Pharm_D-removebg-preview.png" alt="Pharm D" className="h-14 md:h-20 w-auto object-contain scale-125 md:scale-150" />
                     </div>

                     {/* Coffice */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-32 md:w-48 px-2">
                        <img src="/logo/coffice-removebg-preview.png" alt="Coffice" className="h-14 md:h-20 w-auto object-contain scale-110 md:scale-125" />
                     </div>

                     {/* Serious Company - Decrease size further */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-40 md:w-60 px-2">
                        <img src="/logo/Serious_company-removebg-preview.png" alt="Serious Company" className="h-8 md:h-12 w-auto object-contain scale-90" />
                     </div>

                     {/* YMG */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-40 md:w-60 px-2">
                        <img src="/logo/YMG-removebg-preview.png" alt="YMG" className="h-10 md:h-14 w-auto object-contain" />
                     </div>

                     {/* Unomap - Increase size */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer w-32 md:w-48 px-2">
                        <img src="/logo/unomap-removebg-preview.png" alt="Unomap" className="h-14 md:h-20 w-auto object-contain scale-125 md:scale-150" />
                     </div>

                     {/* SKK Management Services */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer w-48 md:w-72 px-4 text-center">
                        <span className="text-stone-800 font-bold font-serif text-lg md:text-xl leading-tight">SKK Management Services</span>
                     </div>

                     {/* Kejuruteraan Kelisa */}
                     <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer w-48 md:w-72 px-4 text-center">
                        <span className="text-stone-800 font-bold font-display uppercase tracking-wider text-sm md:text-base leading-tight">Kejuruteraan Kelisa <span className="block text-[0.6rem] md:text-[0.7rem] font-normal mt-1 opacity-70">Sdn. Bhd.</span></span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Clients;
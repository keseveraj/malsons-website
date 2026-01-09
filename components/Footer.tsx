import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-8 border-t border-stone-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.replaceState(null, '', '/');
              }}
              className="inline-flex items-center justify-center md:justify-start gap-3 mb-2 group"
            >
              <img
                src="/No_Background_Malsons_Logo.png"
                alt="Malsons Construction"
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="text-left">
                <span className="block text-2xl font-serif font-bold text-stone-200 leading-none">Malsons</span>
                <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-stone-500 uppercase leading-none mt-1">Construction</span>
              </div>
            </a>
            <p className="text-sm mt-2">© 2023 Malsons Construction & Renovation.</p>
            <p className="text-xs mt-1 text-stone-600">48, Jalan BK 1/6, Bandar Kinrara 1, 47180 Puchong, Selangor</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61553362247821#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-900 hover:bg-[#1877F2] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/malsonsconstruction/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-900 hover:bg-[#E4405F] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@malsons.construct" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-900 hover:bg-stone-100 hover:text-black transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-stone-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-200 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
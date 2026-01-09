import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MessageSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    { name: 'Residential', href: '#services' },
    { name: 'Commercial', href: '#services' },
    { name: 'Design & Build', href: '#services' },
    { name: 'Project Management', href: '#services' },
  ];

  const navTextColor = isScrolled ? 'text-stone-800' : 'text-white';
  const navHoverColor = isScrolled ? 'hover:text-amber-700' : 'hover:text-stone-200';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-stone-200 py-3 shadow-sm'
        : 'bg-transparent py-6 border-b border-white/10'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 md:gap-3 group">
          <img
            src={isScrolled ? "/No_Background_Malsons_Logo_black.png" : "/No_Background_Malsons_Logo.png"}
            alt="Malsons Construction"
            className="h-8 md:h-14 w-auto transition-transform group-hover:scale-105 object-contain"
          />
          <div className="flex flex-col">
            <span className={`text-lg md:text-2xl font-serif font-bold tracking-tight leading-none ${navTextColor}`}>Malsons</span>
            <span className={`text-[0.5rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase leading-none mt-1 ${isScrolled ? 'text-amber-600' : 'text-stone-300'}`}>Construction</span>
          </div>
        </a>

        {/* Desktop Nav - Visible on lg screens and up */}
        <div className="hidden lg:flex items-center space-x-8">

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center text-sm font-medium ${navTextColor} ${navHoverColor} transition-colors`}
            >
              Services <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl overflow-hidden py-2 shadow-xl border border-stone-100">
                {serviceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#projects" className={`text-sm font-medium ${navTextColor} ${navHoverColor} transition-colors`}>Portfolio</a>
          <a href="#estimator" className={`text-sm font-medium ${navTextColor} ${navHoverColor} transition-colors`}>Estimator</a>
          <a href="#process" className={`text-sm font-medium ${navTextColor} ${navHoverColor} transition-colors`}>Process</a>
          <a href="#about" className={`text-sm font-medium ${navTextColor} ${navHoverColor} transition-colors`}>About</a>

          <a
            href="#contact"
            className="px-6 py-2.5 bg-stone-900 text-white text-sm font-bold rounded-full hover:bg-stone-800 transition-colors shadow-lg"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button - Hidden on lg screens and up */}
        <button
          className={`${navTextColor} lg:hidden`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav - Hidden on lg screens and up */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full h-screen bg-stone-50 px-6 py-8 flex flex-col border-t border-stone-200">
          <div className="flex flex-col space-y-6 flex-grow">
            <div className="space-y-4">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-2xl font-serif font-medium text-stone-900"
              >
                Services <ChevronDown className={`ml-2 w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="pl-4 border-l-2 border-stone-200 space-y-3">
                  {serviceLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-lg text-stone-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#estimator" className="text-2xl font-serif font-medium text-stone-900" onClick={() => setIsMobileMenuOpen(false)}>Estimator</a>
            <a href="#projects" className="text-2xl font-serif font-medium text-stone-900" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
            <a href="#process" className="text-2xl font-serif font-medium text-stone-900" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
            <a href="#about" className="text-2xl font-serif font-medium text-stone-900" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="text-2xl font-serif font-medium text-stone-900" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>

          <div className="mt-auto pb-24 space-y-4">
            <a
              href="#contact"
              className="block w-full text-center py-4 bg-stone-900 text-white font-bold rounded-xl text-lg shadow-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Free Site Assessment
            </a>
            <a
              href={`https://wa.me/60109694022?text=${encodeURIComponent("Hi Malsons, I'm interested in a free site assessment for my renovation project. Can you share more about your process?")}`}
              className="flex items-center justify-center w-full py-4 border border-stone-300 bg-white text-stone-800 font-medium rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare className="w-5 h-5 mr-2 text-green-600" /> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
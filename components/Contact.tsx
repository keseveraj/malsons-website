import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, Facebook, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Condo / Apartment',
    message: ''
  });

  const propertyTypes = ['Condo / Apartment', 'Landed House', 'Commercial', 'Office'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertySelect = (type: string) => {
    setFormData({ ...formData, propertyType: type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Malsons, I'm ${formData.name}. 

*Consultation Request*
Property Type: ${formData.propertyType}
Message: ${formData.message}

I'd like to arrange a free site assessment. Looking forward to your advice.`;
    // Direct WhatsApp link
    window.open(`https://wa.me/60109694022?text=${encodeURIComponent(text)}`, '_blank');
    setFormData({ name: '', phone: '', propertyType: 'Condo / Apartment', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-stone-50 border-t border-stone-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-stone-200/50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200 overflow-hidden grid lg:grid-cols-12 border border-stone-100">

            {/* Left Panel: Dark Info */}
            <div className="lg:col-span-5 bg-stone-900 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Abstract Patterns */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/5 mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-stone-300">Open for Consultation</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-6">
                  Let's discuss <br /> your <span className="text-stone-400 italic">vision</span>.
                </h2>
                <p className="text-stone-400 leading-relaxed mb-12 max-w-sm">
                  Get a free site assessment and quote. No hidden fees, just honest craftsmanship.
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                <a href="https://wa.me/60109694022" target="_blank" rel="noreferrer" className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 text-green-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-0.5">WhatsApp (Recommended)</p>
                    <p className="text-lg font-medium text-white group-hover:text-green-400 transition-colors">+60 10-969 4022</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-lg font-medium text-white break-all">enquiry@malsonsconstruction.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-4">
                  <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-0.5">Office</p>
                    <p className="text-base text-stone-300 leading-snug">
                      Bandar Kinrara 1, Puchong, Selangor
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-4">Follow Our Journey</p>
                  <div className="flex gap-3">
                    <a href="https://www.facebook.com/profile.php?id=61553362247821#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/malsonsconstruction/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.tiktok.com/@malsons.construct" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:bg-[#000000] hover:border-[#000000] transition-all">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-14 lg:p-16 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-stone-700 mb-2 ml-1 group-focus-within:text-stone-900 transition-colors">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-stone-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-stone-200 outline-none transition-all placeholder:text-stone-300 font-medium text-stone-900"
                      placeholder="e.g. Alex Tan"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-bold text-stone-700 mb-2 ml-1 group-focus-within:text-stone-900 transition-colors">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-stone-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-stone-200 outline-none transition-all placeholder:text-stone-300 font-medium text-stone-900"
                      placeholder="e.g. 012-345 6789"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">Property Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {propertyTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePropertySelect(type)}
                        className={`px-2 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${formData.propertyType === type
                          ? 'border-stone-900 bg-stone-900 text-white shadow-lg transform scale-[1.02]'
                          : 'border-stone-100 bg-white text-stone-500 hover:border-stone-300 hover:bg-stone-50'
                          }`}
                      >
                        {type.replace(' / ', '/')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-stone-700 mb-2 ml-1 group-focus-within:text-stone-900 transition-colors">How can we help?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-6 py-4 bg-stone-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-stone-200 outline-none transition-all placeholder:text-stone-300 font-medium text-stone-900 resize-none"
                    placeholder="Tell us about your renovation plans, rough budget, or timeline..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center group"
                >
                  Send Message via WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-stone-400 font-medium">
                  We value your privacy. Your data is secure.
                </p>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
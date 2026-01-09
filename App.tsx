import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CostEstimator from './components/CostEstimator';
import TrustSection from './components/TrustSection';
import Process from './components/Process';
import ReadinessChecklist from './components/ReadinessChecklist';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main>
        {/* Nav Order: Home -> Services -> Estimator -> Portfolio -> Process -> About -> Contact */}

        <Hero /> {/* Home */}

        <Clients /> {/* Social Proof */}

        <Services />

        <Portfolio />

        <CostEstimator />

        <Process />

        <TrustSection /> {/* About */}

        <ReadinessChecklist /> {/* Extra Value Add */}

        <CallToAction /> {/* New High-Impact CTA */}

        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/60109694022?text=${encodeURIComponent("Hi Malsons, I'm interested in learning more about your renovation services. Can we discuss my project?")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
        aria-label="Contact on WhatsApp"
        style={{ animationDuration: '3s' }}
      >
        <MessageCircle size={28} fill="white" className="text-white" />
      </a>
    </div>
  );
};

export default App;
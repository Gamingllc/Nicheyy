import React, { useState, useEffect } from 'react';
import { GeneratedIdea } from './types';
import { generateContentIdea } from './services/geminiService';
import HeroButton from './components/HeroButton';
import IdeaCard from './components/IdeaCard';
import CategoryFilter from './components/CategoryFilter';
import AboutModal from './components/AboutModal';
import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';
import SavedModal from './components/SavedModal';
import BetaLabModal from './components/BetaLabModal';
import ContactModal from './components/ContactModal';
import VibeInput from './components/VibeInput';
import { Sparkles, AlertCircle, Bookmark, ArrowUp, Info, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [idea, setIdea] = useState<GeneratedIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userVibe, setUserVibe] = useState("");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    updateSavedCount();
    checkDeepLink();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when modals are open
  useEffect(() => {
    const isAnyModalOpen = isAboutOpen || isTermsOpen || isPrivacyOpen || isSavedOpen || isBetaOpen || isContactOpen;
    if (isAnyModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isAboutOpen, isTermsOpen, isPrivacyOpen, isSavedOpen, isBetaOpen, isContactOpen]);

  const checkDeepLink = () => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('idea');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        setIdea(decodedData);
        setTimeout(() => {
          const element = document.getElementById('idea-result');
          if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 500);
      } catch (err) {
        console.error("Failed to decode deep-linked idea", err);
      }
    }
  };

  const updateSavedCount = () => {
    const items = JSON.parse(localStorage.getItem('nicheyy_saved') || '[]');
    setSavedCount(items.length);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    try {
      const [newIdea] = await Promise.all([
        generateContentIdea(selectedCategory, userVibe),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      setIdea(newIdea);

      // Auto-scroll to result
      setTimeout(() => {
        const element = document.getElementById('idea-result');
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } catch (err) {
      setError("Something broke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col bg-white selection:bg-[#b026ff] selection:text-white">
      {/* Background Grid Lines */}
      <div
        className="fixed inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Background Decor Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#ccff00] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#b026ff] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none z-0" style={{ animationDelay: '2s' }} />

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <SavedModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} onUpdate={updateSavedCount} />
      <BetaLabModal isOpen={isBetaOpen} onClose={() => setIsBetaOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Navigation - Minimalist Strip */}
      <header className="fixed top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-[50]">
        {/* Logo Branding */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-black text-xl sm:text-2xl tracking-tighter border-4 border-black px-3 py-1 bg-white neo-shadow-sm transform -rotate-2 cursor-pointer hover:rotate-0 transition-all active:translate-y-1 active:shadow-none"
          >
            <Sparkles size={20} className="text-[#b026ff] fill-[#b026ff]" />
            NICHEYY
          </div>

          <button
            onClick={() => setIsBetaOpen(true)}
            className="bg-[#ffcc00] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest animate-pulse hover:bg-black hover:text-[#ffcc00] transition-colors"
          >
            BETA
          </button>
        </div>

        {/* Minimalist Action Toolbar */}
        <nav className="flex items-center gap-2">
          {/* Saved */}
          <button
            onClick={() => setIsSavedOpen(true)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-4 border-black bg-white hover:bg-[#ccff00] transition-all relative neo-shadow-sm active:translate-y-0.5 active:shadow-none"
            aria-label="Saved Ideas"
          >
            <Bookmark size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-black w-4 h-4 flex items-center justify-center border-2 border-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* About */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-4 border-black bg-white hover:bg-[#b026ff] hover:text-white transition-all neo-shadow-sm active:translate-y-0.5 active:shadow-none"
            aria-label="About"
          >
            <Info size={18} />
          </button>

          {/* Contact */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-4 border-black bg-[#00ffff] hover:bg-black hover:text-[#00ffff] transition-all neo-shadow-sm active:translate-y-0.5 active:shadow-none"
            aria-label="Contact"
          >
            <Mail size={18} />
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-32 sm:pt-48 pb-20 overflow-visible">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">

          <div className="mb-10 sm:mb-20 space-y-4">
            <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black text-black leading-[0.9] tracking-tight uppercase">
              STOP <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#8000ff]">THINKING</span>.
              <br />
              START <span className="underline decoration-[#ccff00] decoration-4 sm:decoration-8 underline-offset-4">DOING</span>.
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-black font-bold max-w-xl mx-auto mt-6 uppercase tracking-tight px-2">
              FAST IDEAS FOR FAST PEOPLE. TELL US YOUR VIBE.
            </p>
          </div>

          <VibeInput
            value={userVibe}
            onChange={setUserVibe}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="relative z-20 w-full flex justify-center px-4 mb-16 sm:mb-24">
            <HeroButton
              onClick={handleGenerate}
              isLoading={loading}
              hasIdea={!!idea}
            />
          </div>

          {error && (
            <div className="mb-12 flex items-center gap-2 text-red-600 font-bold bg-white px-4 py-2 border-4 border-red-600 neo-shadow-sm animate-shake">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <div id="idea-result" className="w-full scroll-mt-24">
            {idea && !loading && (
              <IdeaCard idea={idea} onSaveSuccess={updateSavedCount} />
            )}
            {loading && (
              <div className="py-20 flex flex-col items-center justify-center animate-pulse">
                <div className="w-16 h-16 border-4 border-black border-t-[#b026ff] rounded-full animate-spin mb-4" />
                <p className="font-black uppercase tracking-widest text-sm">Mining Gold...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full flex flex-wrap justify-center gap-4 sm:gap-8 px-4 pb-12 pt-10 border-t-4 border-black border-dotted">
        <button onClick={() => setIsAboutOpen(true)} className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">About</button>
        <button onClick={() => setIsTermsOpen(true)} className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">Terms</button>
        <button onClick={() => setIsPrivacyOpen(true)} className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">Privacy</button>
        <button onClick={() => setIsContactOpen(true)} className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">Contact</button>
        <div className="w-full text-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mt-6">
          © NICHEYY 2026 // ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 bg-black text-white border-2 border-white neo-shadow-sm z-[40] transition-all duration-300 transform hover:bg-[#ccff00] hover:text-black ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;
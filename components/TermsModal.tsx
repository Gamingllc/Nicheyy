import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white border-[4px] border-black neo-shadow p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-white border-2 border-black hover:bg-[#ccff00] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck size={28} className="text-[#b026ff] shrink-0 sm:w-8 sm:h-8" />
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">THE RULES</h2>
        </div>

        <div className="space-y-4 text-[10px] sm:text-sm font-bold leading-relaxed uppercase">
          <div className="p-3 border-2 border-black bg-gray-50">
            <p className="text-[#b026ff] mb-0.5">1. YOUR WORK</p>
            <p>Ideas are just starts. You do the work. We aren't responsible for your success.</p>
          </div>
          
          <div className="p-3 border-2 border-black bg-gray-50">
            <p className="text-[#b026ff] mb-0.5">2. NO SPAM</p>
            <p>Don't use our AI to be a jerk. Build cool stuff instead.</p>
          </div>

          <div className="p-3 border-2 border-black bg-gray-50">
            <p className="text-[#b026ff] mb-0.5">3. PRIVACY</p>
            <p>We don't save your text. Your vibe is your vibe.</p>
          </div>

          <div className="p-3 border-4 border-black bg-[#ccff00]/10 text-center font-black">
            PLAY FAIR AND HUSTLE HARD.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
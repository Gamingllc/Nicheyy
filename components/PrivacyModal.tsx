import React from 'react';
import { X, Lock, Eye, Database, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white border-[4px] border-black neo-shadow p-5 sm:p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-white border-2 border-black hover:bg-[#00ffff] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 pr-10">
          <Lock size={28} className="text-[#00ffff] shrink-0 sm:w-8 sm:h-8" />
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none">PRIVACY PROTOCOL</h2>
        </div>

        <div className="space-y-4 sm:space-y-6 text-[10px] sm:text-sm font-bold leading-relaxed uppercase">
          <div className="p-3 sm:p-4 border-2 border-black bg-gray-50 flex gap-3 sm:gap-4">
            <Eye className="shrink-0 text-[#b026ff] w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <p className="text-[#b026ff] mb-0.5">ZERO SURVEILLANCE</p>
              <p>We don't track your identity. You are a ghost to us.</p>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 border-2 border-black bg-gray-50 flex gap-3 sm:gap-4">
            <Database className="shrink-0 text-[#ccff00] w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <p className="text-[#ccff00] mb-0.5">LOCAL ONLY</p>
              <p>Saved ideas live in your browser's local storage. Clear cache, they vanish.</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 border-2 border-black bg-gray-50 flex gap-3 sm:gap-4">
            <Shield className="shrink-0 text-[#00ffff] w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <p className="text-[#00ffff] mb-0.5">AI PROCESSING</p>
              <p>Vibes are sent to Gemini for generation but are not stored by Nicheyy servers.</p>
            </div>
          </div>

          <div className="p-3 border-4 border-black bg-[#00ffff]/10 text-center font-black tracking-widest text-[8px] sm:text-xs">
            ENCRYPTED BY COMMON SENSE.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
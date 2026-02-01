import React from 'react';
import { X, AlertTriangle, Construction, Ghost, Sparkles, AlertCircle } from 'lucide-react';

interface BetaLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetaLabModal: React.FC<BetaLabModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-xl bg-white border-[4px] sm:border-[6px] border-black neo-shadow-lg animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Hazard Header */}
        <div className="bg-[#ffcc00] text-black p-3 sm:p-4 flex justify-between items-center border-b-[4px] border-black overflow-hidden relative shrink-0">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#000_20px,#000_40px)]" />
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <AlertTriangle size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">BETA_STATUS</h2>
          </div>
          <button 
            onClick={onClose} 
            className="relative z-10 p-2 bg-white hover:bg-black hover:text-white transition-all border-2 border-black active:translate-y-0.5"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 sm:p-8 md:p-12 space-y-6 sm:space-y-10 text-center overflow-y-auto custom-scrollbar">
          <div className="space-y-3 sm:space-y-4">
             <div className="inline-flex items-center justify-center p-4 sm:p-6 border-4 border-black bg-white -rotate-3 neo-shadow-sm mb-2">
                <Construction size={48} className="sm:w-16 sm:h-16 text-black animate-pulse" />
             </div>
             
             <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
               HOLD YOUR <span className="text-[#b026ff]">HORSES!</span>
             </h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-xl font-bold uppercase leading-tight text-gray-800">
              The website isn't working at the moment to its potential. We just <span className="underline decoration-[#ccff00] decoration-4">starting</span> this engine.
            </p>

            <div className="bg-black text-[#ffcc00] p-4 sm:p-6 border-4 border-black relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 border-black whitespace-nowrap">
                Reality Check
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <Ghost size={28} className="sm:w-8 sm:h-8 animate-bounce" />
                <p className="font-black text-xs sm:text-sm uppercase tracking-wide leading-relaxed">
                  SOME FEATURES AND GENERATED SUGGESTIONS MIGHT HALLUCINATE. IT'S AI. USE YOUR BRAIN.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-6 sm:w-8 h-1.5 sm:h-2 bg-black opacity-10" />
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-[#f0f0f0] border-t-4 border-black flex flex-col sm:flex-row gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 py-3 sm:py-4 bg-black text-white font-black uppercase tracking-widest text-base sm:text-lg hover:bg-[#ccff00] hover:text-black transition-all active:translate-y-1 neo-shadow-sm border-2 border-black"
          >
            I UNDERSTAND
          </button>
          <button 
            onClick={onClose}
            className="sm:hidden py-3 bg-white text-black font-black uppercase tracking-widest text-sm border-2 border-black active:translate-y-1"
          >
            EXIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetaLabModal;
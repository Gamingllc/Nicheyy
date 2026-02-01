import React from 'react';
import { X, Cpu, Zap, Heart, Rocket, Star, Globe, Shield, FastForward } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white border-[4px] sm:border-[6px] border-black neo-shadow-lg p-0 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        
        <div className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] truncate">System.About_Nicheyy</span>
          <button 
            onClick={onClose}
            className="p-1.5 bg-white text-black border-2 border-black hover:bg-[#ccff00] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div className="relative p-6 sm:p-12 border-b-[4px] border-black">
            <div className="absolute top-4 right-4 hidden lg:block">
              <div className="bg-[#ccff00] border-2 border-black px-4 py-2 font-black text-sm uppercase transform rotate-12 neo-shadow-sm animate-bounce cursor-default">
                100% Raw Heat
              </div>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6 sm:mb-8">
              THE <span className="text-[#b026ff]">HUSTLE</span><br />
              MANIFESTO.
            </h2>
            
            <p className="text-lg sm:text-2xl md:text-3xl font-black text-black leading-tight max-w-2xl">
              Nicheyy isn't an "app." It's a <span className="bg-[#ccff00] px-1.5 border-2 border-black">weapon</span> for creators ready to <span className="underline decoration-[#b026ff] decoration-4 underline-offset-2">launch</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 sm:p-8 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-black text-white p-2 sm:p-3 rotate-3 shrink-0">
                  <Globe size={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">THE MISSION</h3>
              </div>
              <p className="font-bold text-base sm:text-lg leading-snug">
                The internet moves fast. We use Gemini-3 power to generate specific hustles tailored to you in seconds.
              </p>
              <div className="p-3 sm:p-4 bg-gray-100 border-2 border-black font-black text-[10px] sm:text-xs uppercase flex items-center gap-2 sm:gap-3">
                <Shield className="text-[#b026ff] w-4 h-4 sm:w-5 sm:h-5" />
                Built for winners.
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#b026ff] text-white space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                <Rocket size={24} className="sm:w-9 sm:h-9 text-[#ccff00]" />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">FUTURE GEN</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-4 sm:p-5 bg-black border-2 border-white neo-shadow-sm cursor-default">
                  <span className="text-[#ccff00] font-black text-[8px] sm:text-[10px] uppercase tracking-widest">Coming Soon</span>
                  <h4 className="text-lg sm:text-xl font-black uppercase mt-1">NICHEYY PRO</h4>
                  <p className="text-xs sm:text-sm font-bold opacity-80">Blueprints and market analysis.</p>
                </div>

                <div className="p-4 sm:p-5 bg-white text-black border-2 border-black neo-shadow-sm cursor-default">
                  <span className="text-[#b026ff] font-black text-[8px] sm:text-[10px] uppercase tracking-widest">In Testing</span>
                  <h4 className="text-lg sm:text-xl font-black uppercase mt-1">ULTRA-GEN</h4>
                  <p className="text-xs sm:text-sm font-bold opacity-80">Hyper-niche physical products.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-black text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-black text-xl sm:text-2xl tracking-tighter px-2 sm:px-3 py-1 bg-white text-black transform -rotate-2">
              NICHEYY V1.0
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-black uppercase tracking-widest text-[#ccff00]">
              <span>BUILT FOR SPEED</span>
              <Heart size={14} className="fill-[#ccff00] sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
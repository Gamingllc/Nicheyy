import React from 'react';
import { User } from 'lucide-react';

interface VibeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const VibeInput: React.FC<VibeInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-3xl mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-100 px-4">
      <div className="relative group">
        <div className="absolute -top-3 left-4 z-20 px-2 bg-[#ccff00] border-2 border-black flex items-center gap-2">
          <User size={12} className="text-black sm:w-3.5 sm:h-3.5" />
          <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-black">
            Your Vibe / Skills
          </span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 'I'm a designer who loves gardening'..."
          className="w-full h-24 sm:h-32 p-4 sm:p-6 pt-6 sm:pt-8 text-base sm:text-lg font-medium bg-white border-[3px] sm:border-4 border-black neo-shadow-sm focus:neo-shadow focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-200 resize-none placeholder:text-gray-300"
        />
        <div className="absolute bottom-3 right-4 text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tighter pointer-events-none opacity-50 hidden xs:block">
          Describe your potential
        </div>
      </div>
    </div>
  );
};

export default VibeInput;
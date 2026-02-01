import React from 'react';
import { Zap, Loader2 } from 'lucide-react';

interface HeroButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasIdea: boolean;
}

const HeroButton: React.FC<HeroButtonProps> = ({ onClick, isLoading, hasIdea }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative group flex items-center justify-center gap-3 sm:gap-4 
        w-full sm:w-auto px-8 py-5 md:px-16 md:py-8 
        text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider
        border-4 border-black bg-[#b026ff] text-white
        neo-shadow transition-all duration-200
        ${isLoading ? 'opacity-90 cursor-wait' : 'neo-shadow-hover active:neo-shadow-active'}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" />
          <span>Cooking...</span>
        </>
      ) : (
        <>
          <span>{hasIdea ? 'Gimme Another' : 'Gimme an Idea'}</span>
          <Zap className={`w-6 h-6 sm:w-8 sm:h-8 ${!hasIdea ? 'group-hover:fill-current' : ''}`} fill="none" />
        </>
      )}
    </button>
  );
};

export default HeroButton;
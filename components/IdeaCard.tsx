import React, { useState } from 'react';
import { Copy, Check, Sparkles, Target, Zap, TrendingUp, Bookmark, X, Share2, Link as LinkIcon } from 'lucide-react';
import { GeneratedIdea, SavedIdea } from '../types';

interface IdeaCardProps {
  idea: GeneratedIdea;
  onSaveSuccess?: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSaveSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isNaming, setIsNaming] = useState(false);
  const [customName, setCustomName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const getShareUrl = () => {
    const encoded = btoa(JSON.stringify(idea));
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('idea', encoded);
    return url.toString();
  };

  const shareText = `🔥 Hustle Idea: ${idea.title}\n\n${idea.description}\n\nGenerated via Nicheyy`;

  const handleCopy = async () => {
    try {
      const fullContent = `${shareText}\n\nWhy it works: ${idea.whyPoints.join(', ')}\n\nLink: ${getShareUrl()}`;
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Nicheyy: ${idea.title}`,
          text: shareText,
          url: url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error('Failed to copy share link', err);
      }
    }
  };

  const handleSave = () => {
    if (!customName.trim()) return;

    const savedItems: SavedIdea[] = JSON.parse(localStorage.getItem('nicheyy_saved') || '[]');
    const newSave: SavedIdea = {
      ...idea,
      id: Math.random().toString(36).substr(2, 9),
      customName: customName.trim(),
      savedAt: Date.now(),
    };

    localStorage.setItem('nicheyy_saved', JSON.stringify([newSave, ...savedItems]));
    setIsSaved(true);
    setIsNaming(false);
    if (onSaveSuccess) onSaveSuccess();
    setTimeout(() => setIsSaved(false), 3000);
  };

  const icons = [<Zap size={14} />, <Target size={14} />, <TrendingUp size={14} />];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="p-5 sm:p-10 rounded-none neo-shadow bg-white relative group overflow-hidden border-4 border-black text-left">
        
        {/* Header Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-[#b026ff] text-white border-2 border-black">
            {idea.category}
          </span>
          
          <div className="flex gap-2 items-center">
            {isNaming ? (
              <div className="flex items-center gap-1 animate-in slide-in-from-right-2">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Idea name..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="px-2 py-1 border-2 border-black text-[10px] sm:text-xs font-bold focus:outline-none focus:bg-[#ccff00]/10 w-24 sm:w-48"
                />
                <button 
                  onClick={handleSave}
                  className="p-1 border-2 border-black bg-[#ccff00] hover:bg-black hover:text-white transition-colors"
                >
                  <Check size={14} />
                </button>
                <button 
                  onClick={() => setIsNaming(false)}
                  className="p-1 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleShare}
                  className={`p-1.5 sm:p-2 border-2 border-black transition-colors ${shared ? 'bg-[#00ffff]' : 'hover:bg-[#00ffff]'}`}
                >
                  {shared ? <Check size={18} /> : <Share2 size={18} />}
                </button>
                <button
                  onClick={() => setIsNaming(true)}
                  className={`p-1.5 sm:p-2 border-2 border-black transition-colors ${isSaved ? 'bg-[#ccff00]' : 'hover:bg-[#b026ff] hover:text-white'}`}
                >
                  {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
                </button>
                <button
                  onClick={handleCopy}
                  className={`p-1.5 sm:p-2 border-2 border-black transition-colors ${copied ? 'bg-green-400' : 'hover:bg-[#ccff00]'}`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <h2 className="text-3xl sm:text-5xl font-black text-black mb-4 leading-[0.9] tracking-tighter uppercase">
          {idea.title}
        </h2>
        
        <p className="text-lg sm:text-2xl text-gray-900 font-bold mb-6 leading-tight">
          {idea.description}
        </p>

        {/* How it works highlight */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-[#ccff00]/20 border-l-[6px] sm:border-l-8 border-[#ccff00] flex items-center gap-3">
          <div className="bg-[#ccff00] p-1 border border-black shrink-0">
            <Sparkles size={16} className="text-black sm:w-5 sm:h-5" />
          </div>
          <span className="font-black uppercase text-xs sm:text-sm tracking-tight text-black">
            {idea.howItWorks}
          </span>
        </div>

        {/* Why Section */}
        <div className="pt-6 border-t-[3px] sm:border-t-4 border-black border-dotted">
          <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 flex items-center gap-2">
            WHY IT WORKS
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {idea.whyPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-2 p-2 sm:p-3 border-2 border-black bg-gray-50 font-bold text-[10px] sm:text-sm uppercase">
                <span className="text-[#b026ff] shrink-0">{icons[i] || <Check size={14} />}</span>
                {point}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IdeaCard;
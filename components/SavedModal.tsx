import React, { useState, useEffect, useMemo } from 'react';
import { X, Trash2, Calendar, Bookmark, Zap, Target, TrendingUp, Check, Search, ArrowRight, Ghost } from 'lucide-react';
import { SavedIdea } from '../types';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const SavedModal: React.FC<SavedModalProps> = ({ isOpen, onClose, onUpdate }) => {
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('nicheyy_saved') || '[]');
      setSavedIdeas(items);
    }
  }, [isOpen]);

  const filteredIdeas = useMemo(() => {
    return savedIdeas.filter(idea => 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.customName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [savedIdeas, searchQuery]);

  const deleteIdea = (id: string) => {
    const updated = savedIdeas.filter(item => item.id !== id);
    localStorage.setItem('nicheyy_saved', JSON.stringify(updated));
    setSavedIdeas(updated);
    onUpdate();
  };

  const handleDeleteAll = () => {
    if (window.confirm("ARE YOU SURE? THIS WILL PERMANENTLY WIPE YOUR ENTIRE VAULT.")) {
      localStorage.removeItem('nicheyy_saved');
      setSavedIdeas([]);
      onUpdate();
    }
  };

  const whyIcons = [<Zap size={10} />, <Target size={10} />, <TrendingUp size={10} />];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white border-[4px] sm:border-[6px] border-black neo-shadow-lg animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 h-[90vh] sm:h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-black text-white p-4 sm:p-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none text-5xl sm:text-8xl font-black uppercase -mr-4 sm:-mr-10 -mt-2 sm:-mt-5">
            VAULT
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-[#ccff00] text-black p-1.5 sm:p-2 rotate-3 border-2 border-white shrink-0">
                  <Bookmark size={20} className="sm:w-7 sm:h-7" fill="currentColor" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">THE VAULT</h2>
              </div>
              <p className="text-[#ccff00] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Storage.Archive_v1.0</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1 border border-white/20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Count</span>
                <span className="text-lg sm:text-2xl font-black text-[#ccff00] leading-none">{savedIdeas.length}</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 border-2 border-white hover:bg-[#b026ff] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar Section */}
        <div className="p-3 sm:p-6 border-b-[4px] border-black bg-gray-50 flex flex-col sm:flex-row gap-3 items-center shrink-0">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black sm:w-5 sm:h-5" size={16} />
            <input 
              type="text"
              placeholder="SEARCH HUSTLES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border-[3px] sm:border-4 border-black bg-white font-black uppercase text-xs sm:text-sm focus:outline-none focus:bg-[#ccff00]/10"
            />
          </div>
          
          {savedIdeas.length > 0 && (
            <button 
              onClick={handleDeleteAll}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:py-3 border-[3px] sm:border-4 border-black bg-white hover:bg-red-600 hover:text-white transition-all text-xs font-black uppercase"
            >
              <Trash2 size={16} />
              Wipe
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-8 custom-scrollbar bg-[#f0f0f0] overscroll-contain">
          {savedIdeas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 sm:py-24 text-center space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-black flex items-center justify-center bg-white rotate-12">
                <Ghost size={32} className="sm:w-12 sm:h-12 text-gray-200" />
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-black uppercase tracking-tighter">Your vault is empty.</p>
                <p className="font-bold text-gray-400 uppercase text-[10px] sm:text-sm mt-1">Zero hustles found.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-10">
              {filteredIdeas.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white border-[3px] sm:border-4 border-black p-4 sm:p-6 hover:shadow-[4px_4px_0px_0px_rgba(176,38,255,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(176,38,255,1)] transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="bg-black text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 uppercase truncate">
                          {item.category}
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 flex items-center gap-1 shrink-0">
                          <Calendar size={10} />
                          {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-[#b026ff] truncate">
                        {item.customName}
                      </h3>
                    </div>
                    <button 
                      onClick={() => deleteIdea(item.id)}
                      className="p-1.5 border-2 border-black hover:bg-red-500 hover:text-white transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div>
                      <p className="font-black text-black text-base sm:text-lg leading-none uppercase mb-1 sm:mb-2 truncate">{item.title}</p>
                      <p className="text-[10px] sm:text-sm font-bold text-gray-600 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t-2 border-black border-dashed">
                      <div className="flex flex-wrap gap-1.5">
                        {item.whyPoints?.map((point, i) => (
                          <div key={i} className="flex items-center gap-1 px-2 py-1 border-[1.5px] border-black bg-gray-50 text-[8px] sm:text-[10px] font-black uppercase">
                            {whyIcons[i] || <Check size={10} />}
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedModal;
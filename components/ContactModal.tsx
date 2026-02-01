import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Zap } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const email = "distinctiverecap@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white border-[6px] border-black neo-shadow-lg animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 overflow-hidden">
        
        {/* Header Strip */}
        <div className="bg-[#ccff00] border-b-[6px] border-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap size={20} className="fill-black" />
            <h2 className="font-black uppercase tracking-tighter text-xl">DIRECT_LINE</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-all active:translate-y-0.5"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 sm:p-12 text-center space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none italic">
              NO <span className="text-[#b026ff]">BULLS**T</span>.<br />
              JUST MAIL.
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Response time: Faster than your last idea.
            </p>
          </div>

          <div className="group relative">
            <div className="absolute -inset-2 bg-[#b026ff] border-2 border-black rotate-1 opacity-10 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white border-4 border-black p-4 sm:p-6 break-all">
              <span className="text-lg sm:text-xl font-black uppercase tracking-tight selection:bg-[#ccff00]">
                {email}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleCopy}
              className={`flex items-center justify-center gap-3 py-4 border-4 border-black font-black uppercase tracking-widest transition-all active:translate-y-1 ${
                copied ? 'bg-green-400' : 'bg-[#ccff00] hover:bg-black hover:text-[#ccff00] neo-shadow-sm active:shadow-none'
              }`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
            </button>
            
            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-3 py-4 border-4 border-black bg-black text-white font-black uppercase tracking-widest hover:bg-[#b026ff] transition-all neo-shadow-sm active:shadow-none active:translate-y-1"
            >
              <ExternalLink size={20} />
              <span>SEND MAIL</span>
            </a>
          </div>

          <div className="pt-6 border-t-4 border-black border-dotted">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
              EST. 2026 // WORLDWIDE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
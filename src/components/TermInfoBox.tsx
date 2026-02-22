import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TermInfoBoxProps {
  term: string;
  children: React.ReactNode;
}

export function TermInfoBox({ term, children }: TermInfoBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded border overflow-hidden transition-all duration-200"
      style={{
        borderColor: isOpen ? 'rgba(127,255,212,0.30)' : 'rgba(255,255,255,0.08)',
        background: '#061116',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em] flex-1"
          style={{ color: '#7effdb' }}
        >
          {term}?
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#99ffe0' }} />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#99ffe0' }} />
        )}
      </button>
      {isOpen && (
        <div
          className="px-3 pb-2.5 pt-1 text-xs font-mono border-t animate-fade-in"
          style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#d8efe9' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

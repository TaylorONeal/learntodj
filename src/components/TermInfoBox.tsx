import { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

interface TermInfoBoxProps {
  term: string;
  children: React.ReactNode;
}

export function TermInfoBox({ term, children }: TermInfoBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-muted/50 bg-muted/20 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted/30 transition-colors"
      >
        <Info className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="text-sm font-medium text-foreground flex-1">What is {term}?</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 pt-1 text-sm text-muted-foreground border-t border-muted/30 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

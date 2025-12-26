import { Sparkles, Zap } from 'lucide-react';

interface ModeToggleProps {
  isAdvanced: boolean;
  onToggle: () => void;
}

export function ModeToggle({ isAdvanced, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
        isAdvanced
          ? 'bg-secondary/20 border-secondary/50 text-secondary glow-secondary'
          : 'bg-muted/50 border-border/50 text-muted-foreground hover:border-primary/30'
      }`}
    >
      {isAdvanced ? (
        <>
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Advanced</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Simplified</span>
        </>
      )}
    </button>
  );
}

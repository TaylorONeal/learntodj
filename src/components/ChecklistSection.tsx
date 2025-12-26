import { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { ChecklistItem } from './ChecklistItem';
import { ProgressBar } from './ProgressBar';

interface ChecklistSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  sectionKey: string;
  isChecked: (index: number) => boolean;
  onToggle: (index: number) => void;
  onReset: () => void;
  progress: number;
  variant?: 'default' | 'warning' | 'tip';
}

export function ChecklistSection({
  title,
  icon,
  items,
  sectionKey,
  isChecked,
  onToggle,
  onReset,
  progress,
  variant = 'default'
}: ChecklistSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const variantStyles = {
    default: 'border-border/50',
    warning: 'border-accent/30 bg-accent/5',
    tip: 'border-secondary/30 bg-secondary/5'
  };

  return (
    <div className={`glass-card rounded-xl overflow-hidden border ${variantStyles[variant]} animate-fade-in`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary">{icon}</span>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {items.filter((_, i) => isChecked(i)).length}/{items.length}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Reset section"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <ChecklistItem
                key={`${sectionKey}-${index}`}
                text={item}
                isChecked={isChecked(index)}
                onToggle={() => onToggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

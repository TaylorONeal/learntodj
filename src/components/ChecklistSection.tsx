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

  const borderColor =
    variant === 'warning' ? 'rgba(255, 128, 128, 0.30)' :
    variant === 'tip' ? 'rgba(255, 214, 10, 0.25)' :
    'rgba(127, 255, 212, 0.20)';

  const iconColor =
    variant === 'warning' ? '#ff8080' :
    variant === 'tip' ? '#ffd60a' :
    '#7effdb';

  return (
    <div
      className="relative rounded-lg overflow-hidden border animate-fade-in"
      style={{ borderColor, background: '#061116' }}
    >
      <div className="terminal-scanlines" />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <span style={{ color: iconColor }}>{icon}</span>
          <h3 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#d8efe9' }}>
            {title}
          </h3>
          <span className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>
            {items.filter((_, i) => isChecked(i)).length}/{items.length}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: '#99ffe0' }}
        />
      </button>

      {isExpanded && (
        <div className="relative px-4 pb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="p-1.5 rounded border transition-all duration-200 hover:scale-105"
              style={{
                borderColor: 'rgba(255,255,255,0.10)',
                background: 'rgba(0,0,0,0.30)',
                color: '#99ffe0',
              }}
              title="Reset section"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
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

import { Check } from 'lucide-react';

interface ChecklistItemProps {
  text: string;
  isChecked: boolean;
  onToggle: () => void;
  index: number;
}

export function ChecklistItem({ text, isChecked, onToggle, index }: ChecklistItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`checklist-item w-full text-left ${isChecked ? 'checked' : ''}`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
          isChecked
            ? 'bg-primary border-primary glow-primary'
            : 'border-border/50 hover:border-primary/50 bg-muted/20'
        }`}
      >
        {isChecked && <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />}
      </div>
      <span
        className={`text-sm leading-relaxed transition-all duration-300 ${
          isChecked ? 'text-primary/80' : 'text-foreground'
        }`}
      >
        {text}
      </span>
    </button>
  );
}

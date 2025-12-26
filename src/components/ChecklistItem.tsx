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
      className={`checklist-item w-full text-left ${isChecked ? 'completed' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          isChecked
            ? 'bg-primary border-primary'
            : 'border-border hover:border-primary/50'
        }`}
      >
        {isChecked && <Check className="w-4 h-4 text-primary-foreground" />}
      </div>
      <span
        className={`text-sm leading-relaxed transition-all duration-200 ${
          isChecked ? 'text-muted-foreground line-through' : 'text-foreground'
        }`}
      >
        {text}
      </span>
    </button>
  );
}

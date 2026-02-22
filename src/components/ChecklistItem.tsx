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
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all duration-300 border"
        style={{
          background: isChecked ? 'rgba(126,255,219,0.15)' : 'rgba(0,0,0,0.30)',
          borderColor: isChecked ? 'rgba(127,255,212,0.60)' : 'rgba(255,255,255,0.15)',
          boxShadow: isChecked ? '0 0 10px rgba(126,255,219,0.25)' : 'none',
        }}
      >
        {isChecked && (
          <Check className="w-3 h-3" style={{ color: '#7effdb' }} strokeWidth={3} />
        )}
      </div>
      <span
        className="text-sm font-mono leading-relaxed transition-all duration-300"
        style={{ color: isChecked ? 'rgba(126,255,219,0.70)' : '#d8efe9' }}
      >
        {text}
      </span>
    </button>
  );
}

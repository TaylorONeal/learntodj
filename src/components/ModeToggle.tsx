interface ModeToggleProps {
  isAdvanced: boolean;
  onToggle: () => void;
}

export function ModeToggle({ isAdvanced, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] border rounded transition-all duration-200"
      style={{
        borderColor: isAdvanced ? 'rgba(255,214,10,0.50)' : 'rgba(127,255,212,0.30)',
        color: isAdvanced ? '#ffd60a' : '#7effdb',
        background: isAdvanced ? 'rgba(255,214,10,0.06)' : 'rgba(0,0,0,0.40)',
      }}
    >
      {isAdvanced ? 'Advanced' : 'Simplified'}
    </button>
  );
}

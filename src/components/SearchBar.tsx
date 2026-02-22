import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search genres..." }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#99ffe0' }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm font-mono rounded border outline-none transition-all duration-200"
        style={{
          background: 'rgba(0,0,0,0.40)',
          borderColor: 'rgba(127,255,212,0.20)',
          color: '#d8efe9',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(127,255,212,0.50)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,184,0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(127,255,212,0.20)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded transition-colors"
          style={{ color: '#99ffe0' }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

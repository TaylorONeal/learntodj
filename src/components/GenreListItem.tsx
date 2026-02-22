import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Genre } from '@/data/genres';

interface GenreListItemProps {
  genre: Genre;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function GenreListItem({ genre, isFavorite, onToggleFavorite }: GenreListItemProps) {
  return (
    <div
      className="group flex items-center gap-3 py-2.5 px-3 rounded border transition-all duration-200 relative overflow-hidden"
      style={{
        borderColor: isFavorite ? 'rgba(255,214,10,0.30)' : 'rgba(255,255,255,0.08)',
        background: isFavorite ? 'rgba(255,214,10,0.04)' : 'rgba(0,0,0,0.25)',
      }}
    >
      <div className="text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {genre.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-mono text-sm font-bold uppercase tracking-[0.08em] truncate transition-colors" style={{ color: '#d8efe9' }}>
          {genre.name}
        </h3>
        <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
          {genre.bpmRange.min}–{genre.bpmRange.max} BPM
        </span>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="p-1.5 rounded flex-shrink-0 border transition-all duration-200"
        style={{
          borderColor: isFavorite ? 'rgba(255,214,10,0.40)' : 'transparent',
          background: isFavorite ? 'rgba(255,214,10,0.10)' : 'transparent',
          color: isFavorite ? '#ffd60a' : 'rgba(153,255,224,0.30)',
        }}
      >
        <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      <Link
        to={`/genre/${genre.id}`}
        className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] border rounded flex-shrink-0 transition-all duration-200 hover:scale-[1.02]"
        style={{
          borderColor: 'rgba(127,255,212,0.30)',
          color: '#7effdb',
          background: 'rgba(127,255,212,0.06)',
        }}
      >
        Practice
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

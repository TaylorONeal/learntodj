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
    <div className={`group flex items-center gap-3 py-3 px-4 rounded-xl border transition-all duration-200 ${
      isFavorite
        ? 'bg-accent/5 border-accent/30 hover:border-accent/50'
        : 'bg-muted/10 border-border/20 hover:border-primary/40 hover:bg-primary/5'
    }`}>
      <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
        {genre.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground text-sm truncate group-hover:text-primary transition-colors">
          {genre.name}
        </h3>
        <span className="text-xs text-muted-foreground font-medium font-mono">
          {genre.bpmRange.min}–{genre.bpmRange.max} BPM
        </span>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
          isFavorite
            ? 'bg-accent/20 text-accent border border-accent/30'
            : 'text-muted-foreground/40 hover:text-accent hover:bg-accent/10 border border-transparent'
        }`}
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      <Link
        to={`/genre/${genre.id}`}
        className="flex items-center gap-1.5 px-4 py-2 bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/50 rounded-lg text-xs font-bold text-primary transition-all duration-200 flex-shrink-0 hover:glow-primary"
      >
        Practice
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

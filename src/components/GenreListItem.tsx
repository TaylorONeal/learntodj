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
    <div className="flex items-center gap-3 py-3 px-4 glass-card rounded-lg border border-border/30 hover:border-primary/30 transition-all">
      <span className="text-2xl flex-shrink-0">{genre.icon}</span>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground text-sm truncate">{genre.name}</h3>
        <span className="text-xs text-muted-foreground">{genre.bpmRange.min}–{genre.bpmRange.max} BPM</span>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
          isFavorite
            ? 'bg-accent/20 text-accent'
            : 'text-muted-foreground/50 hover:text-accent hover:bg-accent/10'
        }`}
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      <Link
        to={`/genre/${genre.id}`}
        className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-md text-xs font-medium text-primary transition-all flex-shrink-0"
      >
        View
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

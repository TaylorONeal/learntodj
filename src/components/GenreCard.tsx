import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Genre } from '@/data/genres';

interface GenreCardProps {
  genre: Genre;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function GenreCard({ genre, isFavorite, onToggleFavorite }: GenreCardProps) {
  return (
    <div className="genre-card glass-card rounded-xl overflow-hidden animate-slide-up">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{genre.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{genre.name}</h3>
              <span className="bpm-badge text-xs mt-1">
                {genre.bpmRange.min}–{genre.bpmRange.max} BPM
              </span>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorite
                ? 'bg-accent/20 text-accent glow-accent'
                : 'bg-muted/50 text-muted-foreground hover:text-accent hover:bg-accent/10'
            }`}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <Link
          to={`/genre/${genre.id}`}
          className="flex items-center justify-between mt-4 py-3 px-4 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-all group"
        >
          <span className="text-sm font-medium text-primary">View Checklist</span>
          <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

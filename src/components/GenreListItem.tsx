import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GenreIcon } from '@/components/GenreIcon';
import type { Genre } from '@/data/genres';

interface GenreListItemProps {
  genre: Genre;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index?: number;
}

export function GenreListItem({ genre, isFavorite, onToggleFavorite, index = 0 }: GenreListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative flex items-center rounded border transition-colors"
      style={{
        borderColor: isFavorite ? 'rgba(255,214,10,0.30)' : 'rgba(255,255,255,0.08)',
        background: isFavorite ? 'rgba(255,214,10,0.04)' : 'rgba(0,0,0,0.25)',
      }}
    >
      <Link
        to={`/genre/${genre.id}`}
        aria-label={`Open ${genre.name} practice guide`}
        className="flex flex-1 min-w-0 items-center gap-3 py-3 pl-3 pr-2 rounded active:scale-[0.99]"
      >
        <span className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center border border-primary/20 text-primary bg-primary/5">
          <GenreIcon icon={genre.icon} className="w-4 h-4" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-bold uppercase tracking-wide truncate">{genre.name}</span>
          <span className="text-xs text-muted-foreground">{genre.bpmRange.min}–{genre.bpmRange.max} BPM</span>
        </span>
        <ChevronRight className="w-4 h-4 shrink-0 text-primary" />
      </Link>
      {/* Keep independent controls as siblings, never a button inside a link. */}
      <button
        onClick={onToggleFavorite}
        aria-label={`${isFavorite ? 'Unfavorite' : 'Favorite'} ${genre.name}`}
        aria-pressed={isFavorite}
        className="w-11 h-11 mr-1 shrink-0 rounded flex items-center justify-center active:scale-90"
        style={{ color: isFavorite ? '#ffd60a' : '#99ffe0' }}
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </motion.div>
  );
}

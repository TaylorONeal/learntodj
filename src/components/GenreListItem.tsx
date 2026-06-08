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
    >
      <Link
        to={`/genre/${genre.id}`}
        className="group flex items-center gap-3 py-2.5 px-3 rounded border transition-all duration-200 relative overflow-hidden active:scale-[0.99] hover:border-[rgba(127,255,212,0.35)]"
        style={{
          borderColor: isFavorite ? 'rgba(255,214,10,0.30)' : 'rgba(255,255,255,0.08)',
          background: isFavorite ? 'rgba(255,214,10,0.04)' : 'rgba(0,0,0,0.25)',
        }}
      >
        <span
          className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center border transition-transform duration-200 group-hover:scale-105"
          style={{ borderColor: 'rgba(127,255,212,0.20)', background: 'rgba(127,255,212,0.06)', color: '#7effdb' }}
        >
          <GenreIcon icon={genre.icon} className="w-4 h-4" />
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-bold uppercase tracking-[0.08em] truncate" style={{ color: '#d8efe9' }}>
            {genre.name}
          </h3>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            {genre.bpmRange.min}–{genre.bpmRange.max} BPM
          </span>
        </div>

        {/* Favorite — independent action, 44px touch target */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? `Remove ${genre.name} from favorites` : `Add ${genre.name} to favorites`}
          aria-pressed={isFavorite}
          className="w-11 h-11 -my-1.5 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-200 active:scale-90"
          style={{ color: isFavorite ? '#ffd60a' : 'rgba(153,255,224,0.35)' }}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Affordance */}
        <span
          className="flex items-center gap-1 pr-1 text-[10px] font-mono uppercase tracking-[0.15em] flex-shrink-0 transition-colors duration-200"
          style={{ color: '#7effdb' }}
        >
          <span className="hidden sm:inline">Practice</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}

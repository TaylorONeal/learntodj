import { Star, ChevronRight } from 'lucide-react';
import { Scanlines } from '@/components/Scanlines';
import { Link } from 'react-router-dom';
import type { Genre } from '@/data/genres';

interface GenreCardProps {
  genre: Genre;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function GenreCard({ genre, isFavorite, onToggleFavorite }: GenreCardProps) {
  return (
    <div
      className="genre-card relative rounded-lg overflow-hidden border animate-slide-up"
      style={{
        borderColor: 'rgba(127, 255, 212, 0.30)',
        background: 'radial-gradient(circle at top, rgba(0,255,184,0.10), transparent 60%), #061116',
        boxShadow: '0 0 60px rgba(0,255,184,0.08)',
      }}
    >
      <Scanlines />
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{genre.icon}</span>
            <div>
              <h3 className="font-bold font-mono uppercase tracking-[0.08em]" style={{ color: '#d8efe9' }}>
                {genre.name}
              </h3>
              <span className="bpm-badge text-[10px] mt-1.5 inline-block">
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
            className="p-2 rounded border transition-all duration-300"
            style={{
              borderColor: isFavorite ? 'rgba(255,214,10,0.40)' : 'rgba(255,255,255,0.10)',
              background: isFavorite ? 'rgba(255,214,10,0.10)' : 'rgba(0,0,0,0.30)',
              color: isFavorite ? '#ffd60a' : 'rgba(153,255,224,0.40)',
            }}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <Link
          to={`/genre/${genre.id}`}
          className="flex items-center justify-between mt-4 py-2.5 px-4 border rounded transition-all duration-200 hover:scale-[1.01] group"
          style={{
            borderColor: 'rgba(127,255,212,0.30)',
            background: 'rgba(127,255,212,0.06)',
          }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
            View Checklist
          </span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#7effdb' }} />
        </Link>
      </div>
    </div>
  );
}

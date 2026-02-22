import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title = "DJ Flow Guide", showBack = false }: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* macOS-style window chrome */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#c41230]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffd60a]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00f5d4]/80" />
          <span className="ml-2 text-[10px] text-[#00f5d4]/60 font-mono uppercase tracking-widest">
            {title.toLowerCase().replace(/\s+/g, ' — ')}
          </span>
        </div>

        {showBack && !isHome && (
          <Link
            to="/"
            className="text-[10px] text-[#ffd60a]/80 font-mono uppercase tracking-widest hover:text-[#ffd60a] transition-colors"
          >
            ← Back
          </Link>
        )}
      </div>
    </header>
  );
}

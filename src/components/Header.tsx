import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title = "DJ Flow Guide", showBack = false }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const canGoBack = showBack && !isHome;
  const label = title.toLowerCase().replace(/\s+/g, ' — ');

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2.5">
            {/* Red dot — back button when on a sub-page */}
            {canGoBack ? (
              <button
                onClick={() => navigate('/')}
                className="w-2.5 h-2.5 rounded-full bg-[#c41230]/80 hover:bg-[#c41230] transition-colors cursor-pointer"
                aria-label="Go back"
              />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-[#c41230]/80" />
            )}
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffd60a]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00f5d4]/80" />
            <span className="ml-2 text-[10px] text-[#00f5d4]/60 font-mono uppercase tracking-widest">
              {label}
            </span>
          </div>

          {canGoBack && (
            <Link
              to="/"
              className="px-4 text-[10px] text-[#ffd60a]/80 font-mono uppercase tracking-widest hover:text-[#ffd60a] transition-colors"
            >
              ← Back
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

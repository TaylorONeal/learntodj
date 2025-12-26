import { ArrowLeft, Disc3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title = "DJ Flow Guide", showBack = false }: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50 px-4 py-4">
      <div className="container mx-auto flex items-center gap-4">
        {showBack && !isHome && (
          <Link 
            to="/" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Disc3 className="w-8 h-8 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
          </div>
          <h1 className="text-xl font-bold gradient-text">{title}</h1>
        </div>
      </div>
    </header>
  );
}

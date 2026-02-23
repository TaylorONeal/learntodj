import { useLocation } from "react-router-dom";
import { Scanlines } from '@/components/Scanlines';
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center relative"
      style={{ background: '#0a0a0c' }}
    >
      <Scanlines />
      <div className="relative text-center space-y-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.35em]" style={{ color: '#99ffe0' }}>
          System Error // Route Not Found
        </p>
        <h1 className="text-6xl font-bold font-mono" style={{ color: '#ffd60a' }}>404</h1>
        <p className="text-sm font-mono uppercase tracking-[0.2em]" style={{ color: '#d8efe9' }}>
          Page not found
        </p>
        <div className="pt-2">
          <a
            href="/"
            className="inline-block px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] border rounded transition-all duration-200 hover:scale-[1.02]"
            style={{
              borderColor: 'rgba(127,255,212,0.40)',
              color: '#7effdb',
              background: 'rgba(127,255,212,0.06)',
            }}
          >
            ← Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

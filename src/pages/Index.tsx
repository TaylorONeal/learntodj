import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Headphones, Play, BarChart3, ChevronRight, Waves, Shuffle, Disc3, Brain } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ModeToggle } from '@/components/ModeToggle';
import { GenreListItem } from '@/components/GenreListItem';
import { InstallPWA } from '@/components/InstallPWA';
import { genres } from '@/data/genres';
import { useFavorites } from '@/hooks/useFavorites';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { isAdvanced, toggleMode } = useAdvancedMode();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredGenres = useMemo(() => {
    let result = genres;

    if (showFavoritesOnly) {
      result = result.filter(genre => isFavorite(genre.id));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(genre =>
        genre.name.toLowerCase().includes(query) ||
        genre.id.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => {
      const aFav = isFavorite(a.id);
      const bFav = isFavorite(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [searchQuery, showFavoritesOnly, favorites, isFavorite]);

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Core Principle */}
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{
            borderColor: 'rgba(255, 214, 10, 0.30)',
            background: 'rgba(0,0,0,0.40)',
          }}
        >
          <div className="terminal-scanlines" />
          <div className="px-4 py-3 text-center relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1.5" style={{ color: '#ffd60a' }}>
              Core Principle
            </p>
            <p className="text-sm font-mono" style={{ color: '#d8efe9' }}>
              "Prep removes risk. Playing is just timing and restraint."
            </p>
          </div>
        </div>

        {/* DJ 101 — Core Two Phases */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
            DJ Mixing 101
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Prep Card */}
            <Link
              to="/intro/prep"
              className="group relative rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01]"
              style={{
                borderColor: 'rgba(127, 255, 212, 0.30)',
                background: 'radial-gradient(circle at top left, rgba(0,255,184,0.10), transparent 60%), #061116',
              }}
            >
              <div className="terminal-scanlines" />
              <div className="relative p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(127,255,212,0.08)', borderColor: 'rgba(127,255,212,0.30)' }}
                >
                  <Headphones className="w-6 h-6" style={{ color: '#7effdb' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold font-mono uppercase tracking-wide" style={{ color: '#7effdb' }}>
                    1. Prep
                  </h3>
                  <p className="text-xs font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                    Before the crowd hears it
                  </p>
                  <p className="text-[10px] font-mono mt-1.5 uppercase tracking-[0.15em]" style={{ color: '#7effdb', opacity: 0.7 }}>
                    8 steps // key matching // beatgrid
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: '#7effdb' }} />
              </div>
            </Link>

            {/* Playing Card */}
            <Link
              to="/intro/playing"
              className="group relative rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01]"
              style={{
                borderColor: 'rgba(255, 214, 10, 0.25)',
                background: 'radial-gradient(circle at top left, rgba(255,214,10,0.08), transparent 60%), #061116',
              }}
            >
              <div className="terminal-scanlines" />
              <div className="relative p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(255,214,10,0.08)', borderColor: 'rgba(255,214,10,0.25)' }}
                >
                  <Play className="w-6 h-6" style={{ color: '#ffd60a' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
                    2. Playing
                  </h3>
                  <p className="text-xs font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                    The live transition
                  </p>
                  <p className="text-[10px] font-mono mt-1.5 uppercase tracking-[0.15em]" style={{ color: '#ffd60a', opacity: 0.7 }}>
                    7 steps // bass swap // visual guide
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: '#ffd60a' }} />
              </div>
            </Link>
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.35em]" style={{ color: '#99ffe0' }}>
            Explore
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { to: '/intro/flows', icon: BarChart3, label: 'Track Flows', sub: 'Intro → Drop patterns', color: '#ffd60a', borderColor: 'rgba(255,214,10,0.25)' },
              { to: '/intro/effects', icon: Waves, label: 'Effects & Loops', sub: 'Echo, filter basics', color: '#7effdb', borderColor: 'rgba(127,255,212,0.25)' },
              { to: '/intro/remixes', icon: Shuffle, label: 'Remixes', sub: 'Edits & mashups', color: '#7effdb', borderColor: 'rgba(127,255,212,0.25)' },
              { to: '/intro/devices', icon: Disc3, label: 'Gear Guide', sub: 'FLX4 to CDJ-3000', color: '#99ffe0', borderColor: 'rgba(153,255,224,0.20)' },
            ].map(({ to, icon: Icon, label, sub, color, borderColor }) => (
              <Link
                key={to}
                to={to}
                className="group relative rounded-lg overflow-hidden border p-4 transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor, background: '#061116' }}
              >
                <div className="terminal-scanlines" />
                <div className="relative">
                  <Icon className="w-5 h-5 mb-2 transition-transform group-hover:scale-110" style={{ color }} />
                  <h3 className="font-bold font-mono text-sm uppercase tracking-[0.08em]" style={{ color: '#d8efe9' }}>
                    {label}
                  </h3>
                  <p className="text-[10px] font-mono mt-1 uppercase tracking-[0.1em]" style={{ color: '#99ffe0' }}>
                    {sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Genre Checklists */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
              Genre Practice Guides
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] border rounded transition-all duration-200"
                style={{
                  borderColor: showFavoritesOnly ? 'rgba(255,214,10,0.50)' : 'rgba(255,255,255,0.12)',
                  color: showFavoritesOnly ? '#ffd60a' : '#99ffe0',
                  background: showFavoritesOnly ? 'rgba(255,214,10,0.08)' : 'rgba(0,0,0,0.40)',
                }}
              >
                <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
            </div>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search genres..."
          />

          {/* Genre List */}
          <div
            className="relative rounded-lg overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.20)' }}
          >
            <ScrollArea className="h-[340px] p-3">
              <div className="space-y-1.5">
                {filteredGenres.map(genre => (
                  <GenreListItem
                    key={genre.id}
                    genre={genre}
                    isFavorite={isFavorite(genre.id)}
                    onToggleFavorite={() => toggleFavorite(genre.id)}
                  />
                ))}

                {filteredGenres.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: '#99ffe0' }}>
                      {showFavoritesOnly
                        ? "No favorites yet — star some genres"
                        : "No genres match your search"}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: isAdvanced ? '#ffd60a' : '#99ffe0' }}>
              {isAdvanced
                ? '// Advanced mode active — extra techniques visible'
                : '// Toggle Advanced mode for pro tips'}
            </p>
          </div>
        </div>
      </main>

      <InstallPWA />
    </div>
  );
};

export default Index;

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

    // Sort favorites first
    return result.sort((a, b) => {
      const aFav = isFavorite(a.id);
      const bFav = isFavorite(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [searchQuery, showFavoritesOnly, favorites, isFavorite]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Core Principle */}
        <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Core Principle</span>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">"Prep removes risk. Playing is just timing and restraint."</span>
          </p>
        </div>

        {/* DJ 101 - Core Two Phases */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">🎧 DJ Mixing 101</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Prep Card */}
            <Link
              to="/intro/prep"
              className="group glass-card rounded-xl p-4 border border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    1. Prep
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Before the crowd hears it
                  </p>
                  <p className="text-xs text-primary/70 mt-1">8 steps • Key matching • Beatgrid</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>

            {/* Playing Card */}
            <Link
              to="/intro/playing"
              className="group glass-card rounded-xl p-4 border border-secondary/30 bg-secondary/5 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors">
                    2. Playing
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    The live transition
                  </p>
                  <p className="text-xs text-secondary/70 mt-1">7 steps • Bass swap • Visual guide</p>
                </div>
                <ChevronRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* More Topics - Integrated from Hub */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">More Topics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/intro/flows"
              className="group glass-card rounded-lg p-3 border border-border/50 hover:border-accent/30 transition-all"
            >
              <BarChart3 className="w-5 h-5 text-accent mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Track Flows</h3>
              <p className="text-xs text-muted-foreground">Intro → Drop patterns</p>
            </Link>

            <Link
              to="/intro/effects"
              className="group glass-card rounded-lg p-3 border border-border/50 hover:border-secondary/30 transition-all"
            >
              <Waves className="w-5 h-5 text-secondary mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Effects & Loops</h3>
              <p className="text-xs text-muted-foreground">Echo, filter basics</p>
            </Link>

            <Link
              to="/intro/remixes"
              className="group glass-card rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-all"
            >
              <Shuffle className="w-5 h-5 text-primary mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Remixes</h3>
              <p className="text-xs text-muted-foreground">Edits & mashups</p>
            </Link>

            <Link
              to="/intro/devices"
              className="group glass-card rounded-lg p-3 border border-border/50 hover:border-muted-foreground/30 transition-all"
            >
              <Disc3 className="w-5 h-5 text-muted-foreground mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Gear Guide</h3>
              <p className="text-xs text-muted-foreground">FLX4 to CDJ-3000</p>
            </Link>
          </div>
        </div>

        {/* Genre Checklists - Compact List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">📋 Genre Checklists</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  showFavoritesOnly
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'bg-muted/50 border-border/50 text-muted-foreground hover:border-accent/30'
                }`}
              >
                <Star className={`w-3 h-3 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
            </div>
          </div>

          {/* Search */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search genres..."
          />

          {/* Genre List */}
          <ScrollArea className="h-[320px] rounded-xl border border-border/30 bg-muted/5 p-2">
            <div className="space-y-2">
              {filteredGenres.map(genre => (
                <GenreListItem
                  key={genre.id}
                  genre={genre}
                  isFavorite={isFavorite(genre.id)}
                  onToggleFavorite={() => toggleFavorite(genre.id)}
                />
              ))}

              {filteredGenres.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    {showFavoritesOnly
                      ? "No favorites yet. Star some genres!"
                      : "No genres match your search."}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Tip */}
          <p className="text-xs text-muted-foreground text-center">
            {isAdvanced
              ? '✨ Advanced mode: extra techniques & pro tips visible'
              : 'Tip: Toggle Advanced for extra pro tips'}
          </p>
        </div>
      </main>

      <InstallPWA />
    </div>
  );
};

export default Index;

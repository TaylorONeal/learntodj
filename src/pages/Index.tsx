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
        {/* Core Principle - Enhanced */}
        <div className="glass-card rounded-xl p-5 border border-accent/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Core Principle</span>
            </div>
            <p className="text-base text-foreground font-semibold">
              "Prep removes risk. Playing is just timing and restraint."
            </p>
          </div>
        </div>

        {/* DJ 101 - Core Two Phases - Enhanced */}
        <div className="space-y-3">
          <h2 className="text-lg font-black text-foreground tracking-tight">DJ Mixing 101</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Prep Card */}
            <Link
              to="/intro/prep"
              className="group glass-card rounded-xl p-5 border border-primary/40 hover:border-primary/60 hover:glow-primary transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <Headphones className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-lg text-foreground group-hover:text-primary transition-colors">
                    1. Prep
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Before the crowd hears it
                  </p>
                  <p className="text-xs text-primary/80 mt-1.5 font-medium">8 steps • Key matching • Beatgrid</p>
                </div>
                <ChevronRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>

            {/* Playing Card */}
            <Link
              to="/intro/playing"
              className="group glass-card rounded-xl p-5 border border-secondary/40 hover:border-secondary/60 hover:glow-secondary transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <Play className="w-7 h-7 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-lg text-foreground group-hover:text-secondary transition-colors">
                    2. Playing
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The live transition
                  </p>
                  <p className="text-xs text-secondary/80 mt-1.5 font-medium">7 steps • Bass swap • Visual guide</p>
                </div>
                <ChevronRight className="w-6 h-6 text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* More Topics - Enhanced */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Explore</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/intro/flows"
              className="group glass-card rounded-xl p-4 border border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
            >
              <BarChart3 className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">Track Flows</h3>
              <p className="text-xs text-muted-foreground mt-1">Intro → Drop patterns</p>
            </Link>

            <Link
              to="/intro/effects"
              className="group glass-card rounded-xl p-4 border border-border/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
            >
              <Waves className="w-6 h-6 text-secondary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground text-sm group-hover:text-secondary transition-colors">Effects & Loops</h3>
              <p className="text-xs text-muted-foreground mt-1">Echo, filter basics</p>
            </Link>

            <Link
              to="/intro/remixes"
              className="group glass-card rounded-xl p-4 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <Shuffle className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">Remixes</h3>
              <p className="text-xs text-muted-foreground mt-1">Edits & mashups</p>
            </Link>

            <Link
              to="/intro/devices"
              className="group glass-card rounded-xl p-4 border border-border/30 hover:border-muted-foreground/50 hover:bg-muted/10 transition-all duration-300"
            >
              <Disc3 className="w-6 h-6 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-foreground text-sm">Gear Guide</h3>
              <p className="text-xs text-muted-foreground mt-1">FLX4 to CDJ-3000</p>
            </Link>
          </div>
        </div>

        {/* Genre Checklists - Enhanced */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-foreground tracking-tight">Genre Practice Guides</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold transition-all duration-200 ${
                  showFavoritesOnly
                    ? 'bg-accent/20 border-accent/50 text-accent glow-accent'
                    : 'bg-muted/30 border-border/30 text-muted-foreground hover:border-accent/40 hover:text-accent'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
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
          <ScrollArea className="h-[340px] rounded-xl border border-border/30 bg-muted/5 p-3">
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
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground">
                    {showFavoritesOnly
                      ? "No favorites yet. Star some genres!"
                      : "No genres match your search."}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Tip - Enhanced */}
          <div className="text-center">
            <p className={`text-xs font-medium ${isAdvanced ? 'text-secondary' : 'text-muted-foreground'}`}>
              {isAdvanced
                ? '✨ Advanced mode active — extra techniques visible'
                : 'Toggle Advanced mode for pro tips'}
            </p>
          </div>
        </div>
      </main>

      <InstallPWA />
    </div>
  );
};

export default Index;

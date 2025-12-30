import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Headphones, Play, BarChart3, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ModeToggle } from '@/components/ModeToggle';
import { GenreCard } from '@/components/GenreCard';
import { genres } from '@/data/genres';
import { useFavorites } from '@/hooks/useFavorites';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';

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
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search genres..."
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                showFavoritesOnly
                  ? 'bg-accent/20 border-accent/50 text-accent glow-accent'
                  : 'bg-muted/50 border-border/50 text-muted-foreground hover:border-accent/30'
              }`}
            >
              <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium hidden sm:inline">Favorites</span>
            </button>
            <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
          </div>
        </div>

        {/* DJ 101 Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">🎧 Start Here — DJ Mixing 101</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {/* Prep Card */}
            <Link
              to="/intro/prep"
              className="group glass-card rounded-xl p-4 border border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    1. Prep
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    Before the crowd hears it
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>

            {/* Playing Card */}
            <Link
              to="/intro/playing"
              className="group glass-card rounded-xl p-4 border border-secondary/30 bg-secondary/5 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                    2. Playing
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    The live transition
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>

            {/* Track Flows Card */}
            <Link
              to="/intro/flows"
              className="group glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    3. Flows
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    Typical track structures
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* Info Banner */}
        <div className="glass-card rounded-xl p-4 border border-muted/30 bg-muted/5">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Tip:</span>{' '}
            {isAdvanced
              ? 'Advanced mode shows extra techniques like +/-2 Camelot, emergency exits, and pro tips.'
              : 'Tap a genre to see its mixing checklist. Toggle Advanced for extra pro tips.'}
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGenres.map(genre => (
            <GenreCard
              key={genre.id}
              genre={genre}
              isFavorite={isFavorite(genre.id)}
              onToggleFavorite={() => toggleFavorite(genre.id)}
            />
          ))}
        </div>

        {filteredGenres.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {showFavoritesOnly
                ? "No favorites yet. Star some genres to see them here!"
                : "No genres match your search."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

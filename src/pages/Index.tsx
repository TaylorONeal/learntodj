import { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
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

        {/* Info Banner */}
        <div className="glass-card rounded-xl p-4 border border-primary/20 bg-primary/5">
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

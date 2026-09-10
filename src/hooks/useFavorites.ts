import { useState, useEffect } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

const FAVORITES_KEY = 'dj-flow-guide-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = readStorage(FAVORITES_KEY);
    return Array.isArray(stored) && stored.every(id => typeof id === 'string') ? stored : [];
  });

  useEffect(() => {
    writeStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  const toggleFavorite = (genreId: string) => {
    setFavorites(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const isFavorite = (genreId: string) => favorites.includes(genreId);

  return { favorites, toggleFavorite, isFavorite };
}

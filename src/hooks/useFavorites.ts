import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'dj-flow-guide-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
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

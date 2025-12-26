import { useState, useEffect } from 'react';

const MODE_KEY = 'dj-flow-guide-advanced-mode';

export function useAdvancedMode() {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(MODE_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(MODE_KEY, JSON.stringify(isAdvanced));
  }, [isAdvanced]);

  const toggleMode = () => setIsAdvanced(prev => !prev);

  return { isAdvanced, setIsAdvanced, toggleMode };
}

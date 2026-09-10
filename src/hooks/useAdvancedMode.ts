import { useState, useEffect } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

const MODE_KEY = 'dj-flow-guide-advanced-mode';

export function useAdvancedMode() {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(() => {
    const stored = readStorage(MODE_KEY);
    return typeof stored === 'boolean' ? stored : false;
  });

  useEffect(() => {
    writeStorage(MODE_KEY, isAdvanced);
  }, [isAdvanced]);

  const toggleMode = () => setIsAdvanced(prev => !prev);

  return { isAdvanced, setIsAdvanced, toggleMode };
}

/** Storage may be unavailable in private mode or when the device is full. */
export function readStorage(key: string): unknown {
  try {
    const value = localStorage.getItem(key);
    return value === null ? undefined : JSON.parse(value);
  } catch { return undefined; }
}

export function writeStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

export function checklistProgress(items: (boolean | null)[], total: number): number {
  if (total <= 0) return 0;
  return Math.round(items.slice(0, total).filter(item => item === true).length / total * 100);
}

export function isChecklistState(value: unknown): value is Record<string, Record<string, (boolean | null)[]>> {
  return !!value && typeof value === 'object' && !Array.isArray(value) &&
    Object.values(value).every(genre => !!genre && typeof genre === 'object' && !Array.isArray(genre) &&
      Object.values(genre).every(section => Array.isArray(section) && section.every(item => typeof item === 'boolean' || item === null)));
}

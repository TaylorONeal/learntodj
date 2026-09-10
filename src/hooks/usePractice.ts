import { useState } from 'react';
import { emptyPractice, parsePractice, PRACTICE_KEY, PracticeState } from '@/data/practice';
import { readStorage, writeStorage } from '@/lib/storage';

export function usePractice() {
  const [state, setState] = useState(() => parsePractice(readStorage(PRACTICE_KEY)));
  const [saved, setSaved] = useState(true);
  function update(next: PracticeState = emptyPractice) {
    setSaved(writeStorage(PRACTICE_KEY, next));
    setState(next);
  }
  return { state, update, saved };
}

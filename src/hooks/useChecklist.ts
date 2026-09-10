import { useState, useEffect } from 'react';
import { readStorage, writeStorage, isChecklistState, checklistProgress } from '@/lib/storage';

const CHECKLIST_KEY = 'dj-flow-guide-checklists';

interface ChecklistState {
  [genreId: string]: {
    [section: string]: (boolean | null)[];
  };
}

export function useChecklist(genreId: string) {
  const [checklistState, setChecklistState] = useState<ChecklistState>(() => {
    const stored = readStorage(CHECKLIST_KEY);
    return isChecklistState(stored) ? stored : {};
  });

  useEffect(() => {
    writeStorage(CHECKLIST_KEY, checklistState);
  }, [checklistState]);

  const toggleItem = (section: string, index: number) => {
    setChecklistState(prev => {
      const genreState = prev[genreId] || {};
      const sectionState = genreState[section] || [];
      const newSectionState = [...sectionState];
      newSectionState[index] = !newSectionState[index];
      
      return {
        ...prev,
        [genreId]: {
          ...genreState,
          [section]: newSectionState
        }
      };
    });
  };

  const isChecked = (section: string, index: number): boolean => {
    return checklistState[genreId]?.[section]?.[index] || false;
  };

  const getProgress = (section: string, totalItems: number): number => {
    const sectionState = checklistState[genreId]?.[section] || [];
    return checklistProgress(sectionState, totalItems);
  };

  const resetSection = (section: string) => {
    setChecklistState(prev => ({
      ...prev,
      [genreId]: {
        ...prev[genreId],
        [section]: []
      }
    }));
  };

  const resetAll = () => {
    setChecklistState(prev => ({
      ...prev,
      [genreId]: {}
    }));
  };

  return { toggleItem, isChecked, getProgress, resetSection, resetAll };
}

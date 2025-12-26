import { useState, useEffect } from 'react';

const CHECKLIST_KEY = 'dj-flow-guide-checklists';

interface ChecklistState {
  [genreId: string]: {
    [section: string]: boolean[];
  };
}

export function useChecklist(genreId: string) {
  const [checklistState, setChecklistState] = useState<ChecklistState>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklistState));
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
    const completed = sectionState.filter(Boolean).length;
    return Math.round((completed / totalItems) * 100);
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

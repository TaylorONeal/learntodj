import { describe, expect, it } from 'vitest';
import { answerQuestion, emptyPractice, parsePractice, questions, startRound } from '../src/data/practice';
import { checklistProgress, isChecklistState, readStorage, writeStorage } from '../src/lib/storage';

describe('practice progression', () => {
  it('awards each concept once and only completes a round after three answers', () => {
    let state = startRound(emptyPractice);
    for (let i = 0; i < 3; i++) {
      state = answerQuestion(state, questions.find(q => q.id === state.active!.ids[i])!.answer);
      expect(state.rounds).toBe(i === 2 ? 1 : 0);
    }
    expect(state.mastered).toHaveLength(3);
    expect(answerQuestion(state, 0)).toBe(state);
    const replay = { ...state, active: { ids: state.active!.ids, answers: [] } };
    expect(answerQuestion(replay, questions[0].answer).mastered).toHaveLength(3);
  });
  it('prioritizes concepts that need work and does not award wrong answers', () => {
    let state = startRound(emptyPractice);
    state = answerQuestion(state, 2);
    expect(state.mastered).toHaveLength(0);
    const next = startRound({ ...state, mastered: ['phrase', 'bass', 'key'] });
    expect(next.active!.ids.every(id => !next.mastered.includes(id))).toBe(true);
  });
  it('restores a partial round and rejects malformed stored progress', () => {
    const state = answerQuestion(startRound(emptyPractice), 0);
    expect(parsePractice(JSON.parse(JSON.stringify(state)))).toEqual(state);
    for (const value of [null, [], 'wrong', { active: { ids: ['missing'], answers: [9] } }]) {
      expect(parsePractice(value)).toEqual(emptyPractice);
    }
    expect(parsePractice({ mastered: ['phrase', 'phrase', 'fake'], rounds: -1 })).toEqual({ ...emptyPractice, mastered: ['phrase'] });
  });
  it('ignores invalid answer indices', () => {
    const state = startRound(emptyPractice);
    expect(answerQuestion(state, -1)).toBe(state);
    expect(answerQuestion(state, 100)).toBe(state);
  });
});

describe('resilient saved checklists', () => {
  it('counts only visible items when switching from advanced to basic', () => {
    expect(checklistProgress([true, true, true], 2)).toBe(100);
    expect(checklistProgress([true, false, true], 2)).toBe(50);
    expect(checklistProgress([], 0)).toBe(0);
  });
  it('validates stored shapes', () => {
    expect(isChecklistState({ house: { grid: [true, false, null] } })).toBe(true);
    expect(isChecklistState(null)).toBe(false);
    expect(isChecklistState({ house: { grid: 'broken' } })).toBe(false);
  });
  it('does not crash when storage is unavailable', () => {
    expect(readStorage('missing')).toBeUndefined();
    expect(writeStorage('missing', {})).toBe(false);
  });
});

describe('recall evidence across repeat practice', () => {
  it('caps rewards at nine unique concepts across repeated rounds and persisted reloads', () => {
    let state = emptyPractice;
    for (let round = 0; round < 6; round++) {
      state = startRound(parsePractice(JSON.parse(JSON.stringify(state))));
      for (const id of state.active!.ids) {
        state = answerQuestion(state, questions.find(question => question.id === id)!.answer);
      }
      expect(state.mastered.length * 20).toBe(Math.min(round + 1, 3) * 60);
    }
    expect(state.rounds).toBe(6);
    expect(state.mastered).toHaveLength(9);
  });
});

export interface Question {
  id: string;
  skill: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const questions: Question[] = [
  { id: 'phrase', skill: 'Phrasing', prompt: 'Your next track is cued. When should you bring it in?', options: ['At the start of a musical phrase', 'Whenever the waveform gets loud', 'Halfway through a vocal line'], answer: 0, explanation: 'Start on beat 1 of a new phrase so the musical changes line up. Listen for repeating 8, 16, or 32-bar sections.' },
  { id: 'bass', skill: 'EQ control', prompt: 'Both tracks are playing and the bass sounds muddy. What helps?', options: ['Boost both LOW knobs', 'Swap the bass: lower one as you introduce the other', 'Turn up the master volume'], answer: 1, explanation: 'Give one track the low end at a time. A controlled bass swap helps the kick and bass stay clear.' },
  { id: 'key', skill: 'Harmonic mixing', prompt: 'Your current track is in 8A. Which is a safe neighboring Camelot key?', options: ['3B', '11A', '9A'], answer: 2, explanation: 'The same key, a neighboring number on the same letter, or the same number on the other letter are common starting points. Always check by ear.' },
  { id: 'cue', skill: 'Preparation', prompt: 'Before the crowd hears the incoming track, what should you do?', options: ['Check the cue in headphones', 'Open its channel fader fully', 'Apply maximum reverb'], answer: 0, explanation: 'Headphone cueing lets you check the track, timing, and level before bringing it into the live mix.' },
  { id: 'grid', skill: 'Beatgrid', prompt: 'Sync is on, but the kicks still clash. What do you check first?', options: ['The track artwork', 'Beat 1 and the beatgrid', 'The master effects'], answer: 1, explanation: 'Sync relies on the analyzed grid. Check that the grid follows the beats and that beat 1 is marked correctly.' },
  { id: 'missed', skill: 'Recovery', prompt: 'You missed the phrase where you planned to start. What is the cleanest move?', options: ['Force the mix immediately', 'Cut the master volume', 'Wait for the next suitable phrase'], answer: 2, explanation: 'Keep the outgoing track stable and wait for the next phrase. Use a prepared loop if you need more time.' },
  { id: 'gain', skill: 'Levels', prompt: 'The channel meter keeps hitting red. What should you adjust?', options: ['Lower the channel gain/trim', 'Raise the bass EQ', 'Add an echo'], answer: 0, explanation: 'Reduce gain to leave headroom. Effects do not repair clipping, and boosting EQ can make it worse.' },
  { id: 'tempo', skill: 'Tempo', prompt: 'Two tracks have matching BPM but their kicks drift apart. What now?', options: ['Ignore what you hear', 'Nudge the incoming track and recheck its tempo/grid', 'Raise both faders'], answer: 1, explanation: 'Matching BPM is only part of beatmatching. Align the beats by ear, then check for continuing drift and adjust the tempo or grid.' },
  { id: 'exit', skill: 'Transitions', prompt: 'The incoming track owns the groove. How do you finish the blend?', options: ['Keep both bass lines at full level', 'Stop both decks', 'Fade out the outgoing track at a musical boundary'], answer: 2, explanation: 'A deliberate exit gives the new track space. Reset the unused deck’s EQ and effects before preparing the next track.' },
];

export interface PracticeState { mastered: string[]; rounds: number; active: { ids: string[]; answers: number[] } | null }
export const emptyPractice: PracticeState = { mastered: [], rounds: 0, active: null };
export const PRACTICE_KEY = 'learntodj-practice-v1';

export function parsePractice(value: unknown): PracticeState {
  if (!value || typeof value !== 'object') return emptyPractice;
  const candidate = value as PracticeState;
  const mastered = Array.isArray(candidate.mastered) ? [...new Set(candidate.mastered.filter(id => questions.some(q => q.id === id)))] : [];
  const rounds = Number.isSafeInteger(candidate.rounds) && candidate.rounds >= 0 ? candidate.rounds : 0;
  const active = candidate.active;
  if (active && Array.isArray(active.ids) && active.ids.length === 3 && new Set(active.ids).size === 3 && active.ids.every(id => questions.some(q => q.id === id)) && Array.isArray(active.answers) && active.answers.length <= 3 && active.answers.every((answer, i) => Number.isInteger(answer) && answer >= 0 && answer < questions.find(q => q.id === active.ids[i])!.options.length)) {
    return { mastered, rounds, active };
  }
  return { mastered, rounds, active: null };
}

export function startRound(state: PracticeState): PracticeState {
  // Prefer unmastered concepts; rotate ties so completed learners get variety too.
  const offset = (state.rounds * 3) % questions.length;
  const ordered = [...questions.slice(offset), ...questions.slice(0, offset)];
  ordered.sort((a, b) => Number(state.mastered.includes(a.id)) - Number(state.mastered.includes(b.id)));
  return { ...state, active: { ids: ordered.slice(0, 3).map(q => q.id), answers: [] } };
}

export function answerQuestion(state: PracticeState, answer: number): PracticeState {
  if (!state.active || state.active.answers.length >= 3) return state;
  const question = questions.find(q => q.id === state.active!.ids[state.active!.answers.length]);
  if (!question || !Number.isInteger(answer) || answer < 0 || answer >= question.options.length) return state;
  const answers = [...state.active.answers, answer];
  const mastered = answer === question.answer ? [...new Set([...state.mastered, question.id])] : state.mastered;
  return { mastered, rounds: state.rounds + (answers.length === 3 ? 1 : 0), active: { ...state.active, answers } };
}

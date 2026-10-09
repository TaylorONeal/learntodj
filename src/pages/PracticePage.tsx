import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Headphones } from 'lucide-react';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { answerQuestion, questions, startRound } from '@/data/practice';
import { usePractice } from '@/hooks/usePractice';

export default function PracticePage() {
  const { state, update, saved } = usePractice();
  const [review, setReview] = useState<number | null>(null);
  const active = state.active;
  const finished = active?.answers.length === 3 && review === null;
  const index = review ?? active?.answers.length ?? 0;
  const question = active ? questions.find(q => q.id === active.ids[index]) : undefined;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (review !== null) feedbackRef.current?.focus();
    else headingRef.current?.focus();
  }, [review, index, finished]);
  const selected = review !== null ? active?.answers[review] : undefined;
  const score = active?.answers.filter((answer, i) => answer === questions.find(q => q.id === active.ids[i])?.answer).length ?? 0;

  return <div className="min-h-screen">
    <Header title="Mixing practice" showBack />
    <main className="container max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between text-sm text-primary"><span>THE PRACTICE ROOM</span><span>{state.mastered.length * 20} XP</span></div>
      {!saved && <p role="status" className="text-destructive">Progress works for this visit, but your device could not save it.</p>}
      {!active ? <section className="practice-panel space-y-5">
        <Headphones size={36} className="text-primary" />
        <h1 className="text-3xl font-bold">Build your mixing instincts.</h1>
        <p className="text-muted-foreground leading-relaxed">Three real mixing decisions. Instant explanations. About two minutes. No timer, no lost lives.</p>
        <button className="btn-neon-primary w-full" onClick={() => update(startRound(state))}>Start practice <ArrowRight className="inline ml-2" size={18} /></button>
        <Link className="block text-sm underline" to="/intro/prep">New to DJing? Learn the prep first</Link>
      </section> : finished ? <section className="practice-panel space-y-5" aria-labelledby="result-heading">
        <Award size={40} className="text-secondary" />
        <p className="text-secondary text-sm">ROUND COMPLETE</p>
        <h1 ref={headingRef} id="result-heading" tabIndex={-1} className="text-3xl font-bold">{score === 3 ? 'Clean mix. Nice work.' : 'Every mix teaches you something.'}</h1>
        <p className="text-lg">{score} of 3 correct</p>
        <p className="text-muted-foreground">{state.mastered.length} of {questions.length} concepts recalled correctly. Earn 20 XP the first time you answer each concept correctly.</p>
        <ProgressBar progress={state.mastered.length / questions.length * 100} label="Concept recall" />
        <button className="btn-neon-primary w-full" onClick={() => { setReview(null); update(startRound(state)); }}>Practice another round</button>
        <Link to="/genre/house" className="btn-neon-secondary block text-center">Try it on your decks: House guide</Link>
        <Link to="/" className="block text-center text-sm underline">Done for now</Link>
      </section> : question && <section className="practice-panel space-y-6" key={question.id}>
        <ProgressBar progress={active.answers.length / 3 * 100} label={`Question ${index + 1} of 3`} />
        <p className="text-secondary text-sm">{question.skill}</p>
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold leading-snug">{question.prompt}</h1>
        <div className="space-y-3" aria-label="Answer choices">
          {question.options.map((option, optionIndex) => <button key={option} disabled={review !== null} aria-pressed={selected === optionIndex} className={`answer-option ${review !== null && optionIndex === question.answer ? 'answer-correct' : ''} ${selected === optionIndex && selected !== question.answer ? 'answer-incorrect' : ''}`} onClick={() => {
            if (review !== null) return;
            setReview(index);
            update(answerQuestion(state, optionIndex));
          }}><span className="answer-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></button>)}
        </div>
        {review !== null && <div ref={feedbackRef} tabIndex={-1} role="status" className="space-y-4 rounded-lg border border-primary/30 p-4">
          <p className="font-bold text-primary">{selected === question.answer ? 'That’s it.' : 'Good moment to learn.'}</p>
          <p className="text-sm leading-relaxed">{question.explanation}</p>
          <button className="btn-neon-primary w-full" onClick={() => setReview(null)}>{active.answers.length === 3 ? 'See my results' : 'Next question'}</button>
        </div>}
      </section>}
      <p className="text-xs text-muted-foreground text-center">XP reflects correct quiz answers, not live mixing skill. Progress is saved locally; take a break whenever you like.</p>
    </main>
  </div>;
}

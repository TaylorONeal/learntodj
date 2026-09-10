import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

type TransitionPhase = 'prep' | 'start' | 'blend' | 'swap' | 'exit' | 'done';

interface DeckState {
  fader: number; // 0-100 volume
  bass: number; // 0-100 (100 = full, 0 = cut)
  filter: number; // 0-100 (50 = neutral)
  active: boolean;
}

interface PhaseState {
  left: DeckState;
  right: DeckState;
  xfader: number; // 0 = full A (left), 100 = full B (right)
}

const phaseDescriptions: Record<TransitionPhase, { title: string; short: string; description: string; tip: string }> = {
  prep: { title: 'Prep', short: 'Prep', description: 'Incoming ready: fader down, bass cut, filter neutral', tip: 'Cue in headphones' },
  start: { title: 'Start on Phrase', short: 'Start', description: 'Begin incoming track on a phrase boundary', tip: 'Wait for the 1' },
  blend: { title: 'Blend', short: 'Blend', description: 'Raise the incoming fader gradually over 4–8 bars', tip: 'Let it breathe' },
  swap: { title: 'Bass Swap', short: 'Swap', description: 'Cut outgoing bass, bring in the incoming bass', tip: 'The key moment' },
  exit: { title: 'Exit Outgoing', short: 'Exit', description: 'Fade or filter out the old track', tip: 'Smooth exit' },
  done: { title: 'Complete', short: 'Done', description: 'Incoming track is fully in control', tip: 'New track owns the room' },
};

const phaseStates: Record<TransitionPhase, PhaseState> = {
  prep: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 0, bass: 0, filter: 50, active: false },
    xfader: 0,
  },
  start: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 20, bass: 0, filter: 50, active: true },
    xfader: 15,
  },
  blend: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 60, bass: 0, filter: 50, active: true },
    xfader: 38,
  },
  swap: {
    left: { fader: 100, bass: 0, filter: 50, active: true },
    right: { fader: 80, bass: 100, filter: 50, active: true },
    xfader: 55,
  },
  exit: {
    left: { fader: 40, bass: 0, filter: 80, active: true },
    right: { fader: 100, bass: 100, filter: 50, active: true },
    xfader: 78,
  },
  done: {
    left: { fader: 0, bass: 0, filter: 50, active: false },
    right: { fader: 100, bass: 100, filter: 50, active: true },
    xfader: 100,
  },
};

const phases: TransitionPhase[] = ['prep', 'start', 'blend', 'swap', 'exit', 'done'];

const TEAL = '#7effdb';
const GOLD = '#ffd60a';
const MUTED = '#99ffe0';
const BODY = '#d8efe9';

export function DeckVisual() {
  const [currentPhase, setCurrentPhase] = useState<TransitionPhase>('prep');
  const [isPlaying, setIsPlaying] = useState(false);

  const phaseIndex = phases.indexOf(currentPhase);

  useEffect(() => {
    if (!isPlaying) return;

    if (phaseIndex >= phases.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPhase(phases[phaseIndex + 1]);
    }, 2200);

    return () => clearTimeout(timer);
  }, [currentPhase, isPlaying, phaseIndex]);

  const togglePlay = () => {
    if (phaseIndex >= phases.length - 1) {
      setCurrentPhase('prep');
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const goToPhase = (phase: TransitionPhase) => {
    setIsPlaying(false);
    setCurrentPhase(phase);
  };

  const step = (dir: -1 | 1) => {
    setIsPlaying(false);
    const next = Math.min(phases.length - 1, Math.max(0, phaseIndex + dir));
    setCurrentPhase(phases[next]);
  };

  const state = phaseStates[currentPhase];
  const atStart = phaseIndex === 0;
  const atEnd = phaseIndex === phases.length - 1;

  return (
    <div className="space-y-5">
      {/* Phase stepper */}
      <div className="relative pt-1">
        {/* Track */}
        {/* Track spans the first→last dot centers (dots are flex-1, so centers sit at 1/12 and 11/12) */}
        <div className="absolute top-[15px] h-0.5 rounded-full" style={{ left: '8.333%', right: '8.333%', background: 'rgba(255,255,255,0.10)' }} />
        <motion.div
          className="absolute top-[15px] h-0.5 rounded-full"
          style={{ left: '8.333%', background: `linear-gradient(90deg, ${TEAL}, ${GOLD})`, boxShadow: `0 0 8px ${TEAL}66` }}
          animate={{ width: `${(phaseIndex / (phases.length - 1)) * 83.333}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <div className="relative flex items-start justify-between">
          {phases.map((phase, i) => {
            const isActive = currentPhase === phase;
            const isPast = phaseIndex > i;
            return (
              <button
                key={phase}
                onClick={() => goToPhase(phase)}
                className="relative z-10 flex flex-col items-center gap-1.5 flex-1 min-w-0 group"
                aria-label={phaseDescriptions[phase].title}
                aria-current={isActive ? 'step' : undefined}
              >
                <motion.span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-mono border-2"
                  animate={{ scale: isActive ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  style={{
                    background: isActive ? GOLD : isPast ? 'rgba(127,255,212,0.18)' : 'rgba(0,0,0,0.50)',
                    borderColor: isActive ? GOLD : isPast ? 'rgba(127,255,212,0.55)' : 'rgba(255,255,255,0.18)',
                    color: isActive ? '#0a0a0c' : isPast ? TEAL : 'rgba(153,255,224,0.55)',
                    boxShadow: isActive ? `0 0 14px ${GOLD}77` : 'none',
                  }}
                >
                  {i + 1}
                </motion.span>
                <span
                  className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.08em] leading-none text-center"
                  style={{ color: isActive ? GOLD : isPast ? TEAL : 'rgba(153,255,224,0.45)' }}
                >
                  {phaseDescriptions[phase].short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase description */}
      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border px-4 py-3 text-center"
        style={{ borderColor: 'rgba(255,214,10,0.30)', background: 'rgba(255,214,10,0.05)' }}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1" style={{ color: GOLD }}>
          Step {phaseIndex + 1}/{phases.length} — {phaseDescriptions[currentPhase].title}
        </p>
        <p className="text-sm font-mono leading-snug" style={{ color: BODY }}>
          {phaseDescriptions[currentPhase].description}
        </p>
        <p className="text-[11px] font-mono mt-1.5" style={{ color: TEAL }}>
          → {phaseDescriptions[currentPhase].tip}
        </p>
      </motion.div>

      {/* Decks */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        <DeckPanel label="Outgoing" sublabel="Deck A" trackKey="8A" state={state.left} accent={TEAL} />
        <DeckPanel label="Incoming" sublabel="Deck B" trackKey="8A" state={state.right} accent={GOLD} />
      </div>

      {/* Crossfader */}
      <div className="rounded-lg border px-3 py-3" style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(0,0,0,0.30)' }}>
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
          <span style={{ color: state.xfader < 50 ? TEAL : 'rgba(153,255,224,0.45)' }}>A</span>
          <span style={{ color: MUTED }}>Crossfader</span>
          <span style={{ color: state.xfader > 50 ? GOLD : 'rgba(153,255,224,0.45)' }}>B</span>
        </div>
        <div className="relative h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          {/* center tick */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: 'rgba(255,255,255,0.20)' }} />
          {/* fill from active side */}
          <motion.div
            className="absolute inset-y-0 rounded-full"
            animate={{
              left: state.xfader <= 50 ? `${state.xfader}%` : '50%',
              right: state.xfader >= 50 ? `${100 - state.xfader}%` : '50%',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: `linear-gradient(90deg, ${TEAL}55, ${GOLD}55)` }}
          />
          {/* handle */}
          <motion.div
            className="absolute top-1/2 w-3.5 h-5 rounded-sm -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
            animate={{ left: `${state.xfader}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: BODY, boxShadow: '0 0 8px rgba(216,239,233,0.4)' }}
          >
            <div className="w-0.5 h-3 rounded-full" style={{ background: 'rgba(0,0,0,0.4)' }} />
          </motion.div>
        </div>
      </div>

      {/* Transport controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => step(-1)}
          disabled={atStart}
          className="w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-30"
          style={{ borderColor: 'rgba(127,255,212,0.30)', background: 'rgba(127,255,212,0.05)', color: TEAL }}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="flex-1 max-w-[180px] h-11 rounded-lg border flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-[0.15em] transition-all duration-200 active:scale-95"
          style={{ borderColor: 'rgba(255,214,10,0.45)', background: 'rgba(255,214,10,0.08)', color: GOLD }}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : atEnd ? (
            <>
              <RotateCcw className="w-4 h-4" /> Replay
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Auto-play
            </>
          )}
        </button>

        <button
          onClick={() => step(1)}
          disabled={atEnd}
          className="w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-30"
          style={{ borderColor: 'rgba(127,255,212,0.30)', background: 'rgba(127,255,212,0.05)', color: TEAL }}
          aria-label="Next step"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] font-mono uppercase tracking-[0.12em]" style={{ color: MUTED }}>
        <LegendDot color={BODY} label="Volume" />
        <LegendDot color={TEAL} label="Bass" />
        <LegendDot color={GOLD} label="Filter" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color, boxShadow: `0 0 6px ${color}88` }} />
      {label}
    </span>
  );
}

interface DeckPanelProps {
  label: string;
  sublabel: string;
  trackKey: string;
  state: DeckState;
  accent: string;
}

function DeckPanel({ label, sublabel, trackKey, state, accent }: DeckPanelProps) {
  const status =
    state.fader === 0
      ? { icon: '○', text: 'Standby', color: 'rgba(153,255,224,0.55)' }
      : state.fader === 100
        ? { icon: '●', text: 'Live', color: accent }
        : { icon: '◐', text: 'Fading', color: GOLD };

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border p-2.5 sm:p-3.5"
      animate={{ opacity: state.active ? 1 : 0.45 }}
      transition={{ duration: 0.4 }}
      style={{
        borderColor: state.fader === 100 ? `${accent}66` : 'rgba(127,255,212,0.18)',
        background: 'rgba(0,0,0,0.35)',
        boxShadow: state.fader === 100 ? `inset 0 0 30px ${accent}14` : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-1">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.12em] truncate" style={{ color: accent }}>
            {label}
          </p>
          <p className="text-[9px] font-mono uppercase tracking-[0.1em]" style={{ color: 'rgba(153,255,224,0.55)' }}>
            {sublabel}
          </p>
        </div>
        <span
          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border flex-shrink-0"
          style={{ color: accent, borderColor: `${accent}40`, background: 'rgba(0,0,0,0.4)' }}
        >
          {trackKey}
        </span>
      </div>

      {/* Controls */}
      <div className="space-y-2.5">
        <Meter label="Vol" value={`${state.fader}%`} valueColor={BODY}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${state.fader}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: BODY }}
          />
        </Meter>

        <Meter
          label="Bass"
          value={state.bass === 0 ? 'CUT' : state.bass === 100 ? 'FULL' : `${state.bass}%`}
          valueColor={state.bass === 0 ? '#ff6060' : TEAL}
        >
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${state.bass}%` }}
            transition={{ duration: 0.4 }}
            style={{
              background: state.bass === 0 ? '#ff6060' : TEAL,
              boxShadow: state.bass > 0 ? `0 0 8px ${TEAL}80` : 'none',
            }}
          />
        </Meter>

        <Meter
          label="Filter"
          value={state.filter === 50 ? 'NEUTRAL' : state.filter > 50 ? 'HI-PASS' : 'LO-PASS'}
          valueColor={state.filter === 50 ? 'rgba(153,255,224,0.55)' : GOLD}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: 'rgba(255,214,10,0.25)' }} />
          <motion.div
            className="absolute inset-y-0 rounded-full"
            animate={{
              left: state.filter < 50 ? `${state.filter}%` : '50%',
              width: state.filter < 50 ? `${50 - state.filter}%` : `${state.filter - 50}%`,
            }}
            transition={{ duration: 0.4 }}
            style={{ background: GOLD, boxShadow: state.filter !== 50 ? `0 0 8px ${GOLD}80` : 'none' }}
          />
        </Meter>
      </div>

      {/* Status */}
      <div
        className="mt-3 text-center py-1.5 rounded border"
        style={{
          background: state.fader === 100 ? `${accent}1a` : 'rgba(0,0,0,0.3)',
          borderColor: state.fader === 100 ? `${accent}40` : 'rgba(255,255,255,0.10)',
        }}
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: status.color }}>
          {status.icon} {status.text}
        </span>
      </div>
    </motion.div>
  );
}

function Meter({
  label,
  value,
  valueColor,
  children,
}: {
  label: string;
  value: string;
  valueColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono">
        <span style={{ color: 'rgba(153,255,224,0.6)' }}>{label}</span>
        <span className="font-bold" style={{ color: valueColor }}>
          {value}
        </span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {children}
      </div>
    </div>
  );
}

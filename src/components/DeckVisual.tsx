import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Radio } from 'lucide-react';

// --- Timeline ---
// Each keyframe defines deck states at a point in time.
// lf/rf = fader (0-100), lb/rb = bass (0-100), lfi/rfi = filter (0-100, 50=neutral)
type Keyframe = {
  t: number;
  phase: string;
  tip: string;
  lf: number; lb: number; lfi: number;
  rf: number; rb: number; rfi: number;
};

const TIMELINE: Keyframe[] = [
  { t: 0,     phase: 'Prep',      tip: 'Cue incoming in headphones — fader down, bass cut',  lf: 100, lb: 100, lfi: 50, rf: 0,   rb: 0,   rfi: 50 },
  { t: 2000,  phase: 'Drop In',   tip: 'Start incoming on phrase boundary',                   lf: 100, lb: 100, lfi: 50, rf: 20,  rb: 0,   rfi: 50 },
  { t: 4500,  phase: 'Blend',     tip: 'Raise incoming fader over 4-8 bars',                  lf: 100, lb: 100, lfi: 50, rf: 75,  rb: 0,   rfi: 50 },
  { t: 6500,  phase: 'Cut Bass',  tip: 'Kill outgoing bass on phrase — never two basses',     lf: 100, lb: 0,   lfi: 50, rf: 80,  rb: 0,   rfi: 50 },
  { t: 7500,  phase: 'Bass Swap', tip: 'Open incoming bass immediately after the cut',         lf: 90,  lb: 0,   lfi: 50, rf: 85,  rb: 100, rfi: 50 },
  { t: 9500,  phase: 'Exit',      tip: 'Filter hi-pass and fade outgoing out',                lf: 25,  lb: 0,   lfi: 78, rf: 100, rb: 100, rfi: 50 },
  { t: 12000, phase: 'Complete',  tip: 'Incoming owns the room',                              lf: 0,   lb: 0,   lfi: 50, rf: 100, rb: 100, rfi: 50 },
];

const TOTAL_MS = TIMELINE[TIMELINE.length - 1].t + 500;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

type LiveState = {
  lf: number; lb: number; lfi: number;
  rf: number; rb: number; rfi: number;
  phase: string; tip: string;
  progress: number; // 0-1 overall
};

function getStateAt(ms: number): LiveState {
  const clamped = Math.max(0, Math.min(ms, TOTAL_MS));

  let k0 = TIMELINE[0];
  let k1 = TIMELINE[1];
  for (let i = 0; i < TIMELINE.length - 1; i++) {
    if (clamped >= TIMELINE[i].t && clamped <= TIMELINE[i + 1].t) {
      k0 = TIMELINE[i];
      k1 = TIMELINE[i + 1];
      break;
    }
  }
  if (clamped >= TIMELINE[TIMELINE.length - 1].t) {
    k0 = k1 = TIMELINE[TIMELINE.length - 1];
  }

  const segLen = k1.t - k0.t || 1;
  const rawT = (clamped - k0.t) / segLen;
  const easedT = easeInOut(rawT);

  // Bass swap segment: bass changes snap faster than everything else
  const isBassPhase = k0.phase === 'Cut Bass' || k0.phase === 'Bass Swap';
  const bassT = isBassPhase
    ? (rawT < 0.15 ? 0 : easeInOut(Math.min(1, (rawT - 0.15) / 0.35)))
    : easedT;

  return {
    lf:  lerp(k0.lf,  k1.lf,  easedT),
    lb:  lerp(k0.lb,  k1.lb,  bassT),
    lfi: lerp(k0.lfi, k1.lfi, easedT),
    rf:  lerp(k0.rf,  k1.rf,  easedT),
    rb:  lerp(k0.rb,  k1.rb,  bassT),
    rfi: lerp(k0.rfi, k1.rfi, easedT),
    phase: k0.phase,
    tip: k0.tip,
    progress: clamped / TOTAL_MS,
  };
}

// --- Component ---

export function DeckVisual() {
  const [ms, setMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback((now: number) => {
    if (startRef.current === null) startRef.current = now;
    const elapsed = now - startRef.current;
    if (elapsed >= TOTAL_MS) {
      setMs(TOTAL_MS);
      setIsPlaying(false);
      return;
    }
    setMs(elapsed);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handlePlay = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setMs(0);
    setIsPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const s = getStateAt(ms);

  // Crossfader: 0 = full A, 100 = full B
  const totalF = s.lf + s.rf || 1;
  const crossPos = (s.rf / totalF) * 100;

  const isBassSwap = s.phase === 'Bass Swap' || s.phase === 'Cut Bass';

  return (
    <div className="space-y-5 font-mono">

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#99ffe0' }}>
            {s.phase}
          </span>
          <span className="text-[10px]" style={{ color: 'rgba(153,255,224,0.45)' }}>
            {Math.round(s.progress * 100)}%
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${s.progress * 100}%`,
              background: 'linear-gradient(90deg, #7effdb, #ffd60a)',
            }}
            transition={{ duration: 0 }}
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: 'rgba(153,255,224,0.55)' }}>
          {s.tip}
        </p>
      </div>

      {/* Phase stepper */}
      <div className="flex items-center justify-between relative">
        <div
          className="absolute top-3 left-3 right-3 h-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />
        <div
          className="absolute top-3 left-3 h-px transition-all duration-150"
          style={{
            width: `calc(${s.progress * 100}% - 6px)`,
            background: 'linear-gradient(90deg, #7effdb, #ffd60a)',
          }}
        />
        {TIMELINE.map((kf, i) => {
          const past = ms > kf.t;
          const active = s.phase === kf.phase;
          return (
            <div key={kf.phase} className="relative z-10 flex flex-col items-center gap-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all duration-300"
                style={{
                  background: active
                    ? '#ffd60a'
                    : past ? 'rgba(126,255,219,0.20)' : 'rgba(0,0,0,0.60)',
                  borderColor: active
                    ? '#ffd60a'
                    : past ? 'rgba(126,255,219,0.50)' : 'rgba(255,255,255,0.12)',
                  color: active ? '#0a0a0c' : past ? '#7effdb' : 'rgba(153,255,224,0.40)',
                  boxShadow: active ? '0 0 12px rgba(255,214,10,0.50)' : undefined,
                }}
              >
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Decks */}
      <div className="grid grid-cols-2 gap-3">
        {/* Outgoing — gold */}
        <DeckPanel
          label="OUTGOING"
          sub="Deck A"
          fader={s.lf}
          bass={s.lb}
          filter={s.lfi}
          accentColor="#ffd60a"
          accentRgb="255,214,10"
          bassPhase={isBassSwap}
        />
        {/* Incoming — teal */}
        <DeckPanel
          label="INCOMING"
          sub="Deck B"
          fader={s.rf}
          bass={s.rb}
          filter={s.rfi}
          accentColor="#7effdb"
          accentRgb="126,255,219"
          bassPhase={isBassSwap}
        />
      </div>

      {/* Crossfader */}
      <div
        className="px-4 py-3 rounded-lg border"
        style={{ background: 'rgba(0,0,0,0.35)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em] mb-2.5">
          <span style={{ color: '#ffd60a' }}>A — OUT</span>
          <span style={{ color: 'rgba(153,255,224,0.50)' }}>Crossfader</span>
          <span style={{ color: '#7effdb' }}>IN — B</span>
        </div>
        <div
          className="relative h-3 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {/* Center mark */}
          <div
            className="absolute inset-y-0 left-1/2 w-px"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-4 rounded transition-none flex items-center justify-center"
            style={{
              left: `calc(${crossPos}% - 10px)`,
              background: '#d8efe9',
              boxShadow: '0 0 8px rgba(255,255,255,0.25)',
            }}
          >
            <div className="w-0.5 h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.40)' }} />
          </div>
        </div>
      </div>

      {/* Play button */}
      <div className="text-center">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-6 py-2.5 rounded border text-[11px] uppercase tracking-[0.2em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          style={{
            borderColor: isPlaying ? 'rgba(255,255,255,0.15)' : 'rgba(255,214,10,0.40)',
            background: isPlaying ? 'rgba(0,0,0,0.30)' : 'rgba(255,214,10,0.06)',
            color: isPlaying ? '#99ffe0' : '#ffd60a',
          }}
        >
          {isPlaying ? (
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Transitioning...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5" />
              Play Transition
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// --- Deck Panel ---

interface DeckPanelProps {
  label: string;
  sub: string;
  fader: number;
  bass: number;
  filter: number;
  accentColor: string;
  accentRgb: string;
  bassPhase: boolean;
}

function DeckPanel({ label, sub, fader, bass, filter, accentColor, accentRgb, bassPhase }: DeckPanelProps) {
  const live = fader > 1;
  const filterLabel = filter < 47 ? 'LO-PASS' : filter > 53 ? 'HI-PASS' : 'NEUTRAL';

  return (
    <div
      className="relative rounded-lg p-3 border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: live ? `rgba(${accentRgb}, 0.35)` : 'rgba(255,255,255,0.08)',
        background: live ? `rgba(${accentRgb}, 0.04)` : 'rgba(0,0,0,0.30)',
        boxShadow: fader > 80 ? `0 0 30px rgba(${accentRgb}, 0.10)` : 'none',
        opacity: live ? 1 : 0.5,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
            {label}
          </p>
          <p className="text-[9px] uppercase tracking-[0.12em]" style={{ color: 'rgba(153,255,224,0.45)' }}>
            {sub}
          </p>
        </div>
        <div
          className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border"
          style={{
            color: fader === 0 ? 'rgba(153,255,224,0.35)' : fader >= 99 ? accentColor : '#ffeaa0',
            borderColor: fader === 0 ? 'rgba(255,255,255,0.08)' : fader >= 99 ? `rgba(${accentRgb},0.40)` : 'rgba(255,234,160,0.30)',
            background: 'rgba(0,0,0,0.30)',
          }}
        >
          {fader === 0 ? 'STDBY' : fader >= 99 ? 'LIVE' : 'FADING'}
        </div>
      </div>

      {/* Volume */}
      <div className="space-y-1 mb-2">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.12em]">
          <span style={{ color: 'rgba(153,255,224,0.50)' }}>VOL</span>
          <span className="font-bold" style={{ color: '#d8efe9' }}>{Math.round(fader)}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${fader}%`,
              background: `rgba(${accentRgb}, 0.85)`,
              boxShadow: fader > 5 ? `0 0 8px rgba(${accentRgb}, 0.40)` : 'none',
            }}
          />
        </div>
      </div>

      {/* Bass */}
      <div className="space-y-1 mb-2">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.12em]">
          <span style={{ color: 'rgba(153,255,224,0.50)' }}>BASS</span>
          <span
            className="font-bold"
            style={{
              color: bass < 5 ? '#ff6060' : bass > 95 ? accentColor : '#ffeaa0',
              textShadow: bassPhase && bass < 5 ? '0 0 8px rgba(255,96,96,0.60)' : undefined,
            }}
          >
            {bass < 5 ? 'CUT' : bass > 95 ? 'FULL' : `${Math.round(bass)}%`}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${bass}%`,
              background: bass < 5 ? 'rgba(255,96,96,0.70)' : `rgba(${accentRgb}, 0.85)`,
              boxShadow: bass > 5 ? `0 0 8px rgba(${accentRgb}, 0.40)` : undefined,
            }}
          />
        </div>
      </div>

      {/* Filter */}
      <div className="space-y-1">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.12em]">
          <span style={{ color: 'rgba(153,255,224,0.50)' }}>FILTER</span>
          <span className="font-bold" style={{ color: filter === 50 ? 'rgba(153,255,224,0.45)' : '#ffeaa0' }}>
            {filterLabel}
          </span>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {/* Center line */}
          <div className="absolute inset-y-0 left-1/2 w-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
          {/* Fill from center */}
          <div
            className="absolute inset-y-0 rounded-full transition-none"
            style={{
              left: filter < 50 ? `${filter}%` : '50%',
              width: `${Math.abs(filter - 50)}%`,
              background: 'rgba(255,234,160,0.70)',
              boxShadow: filter !== 50 ? '0 0 6px rgba(255,234,160,0.30)' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

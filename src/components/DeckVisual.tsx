import { useState, useEffect } from 'react';
import { Volume2, Radio } from 'lucide-react';

type TransitionPhase = 'prep' | 'start' | 'blend' | 'swap' | 'exit' | 'done';

interface DeckState {
  fader: number; // 0-100
  bass: number; // 0-100 (100 = full, 0 = cut)
  filter: number; // 0-100 (50 = neutral)
  active: boolean;
}

const phaseDescriptions: Record<TransitionPhase, { title: string; description: string; tip: string }> = {
  prep: { title: 'Prep', description: 'Incoming ready: fader down, bass cut, filter neutral', tip: 'Cue in headphones' },
  start: { title: 'Start on Phrase', description: 'Begin incoming track on phrase boundary', tip: 'Wait for the 1' },
  blend: { title: 'Blend (4-8 bars)', description: 'Raise incoming fader gradually', tip: 'Let it breathe' },
  swap: { title: 'Bass Swap', description: 'Cut outgoing bass, bring in incoming bass', tip: 'The key moment' },
  exit: { title: 'Exit Outgoing', description: 'Fade or filter out the old track', tip: 'Smooth exit' },
  done: { title: 'Complete', description: 'Incoming track fully in control', tip: 'New track owns the room' }
};

const phaseStates: Record<TransitionPhase, { left: DeckState; right: DeckState }> = {
  prep: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 0, bass: 0, filter: 50, active: false }
  },
  start: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 20, bass: 0, filter: 50, active: true }
  },
  blend: {
    left: { fader: 100, bass: 100, filter: 50, active: true },
    right: { fader: 60, bass: 0, filter: 50, active: true }
  },
  swap: {
    left: { fader: 100, bass: 0, filter: 50, active: true },
    right: { fader: 80, bass: 100, filter: 50, active: true }
  },
  exit: {
    left: { fader: 40, bass: 0, filter: 80, active: true },
    right: { fader: 100, bass: 100, filter: 50, active: true }
  },
  done: {
    left: { fader: 0, bass: 0, filter: 50, active: false },
    right: { fader: 100, bass: 100, filter: 50, active: true }
  }
};

const phases: TransitionPhase[] = ['prep', 'start', 'blend', 'swap', 'exit', 'done'];

export function DeckVisual() {
  const [currentPhase, setCurrentPhase] = useState<TransitionPhase>('prep');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex >= phases.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPhase(phases[currentIndex + 1]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentPhase, isPlaying]);

  const handlePlay = () => {
    setCurrentPhase('prep');
    setIsPlaying(true);
  };

  const handlePhaseClick = (phase: TransitionPhase) => {
    setIsPlaying(false);
    setCurrentPhase(phase);
  };

  const state = phaseStates[currentPhase];

  const phaseIndex = phases.indexOf(currentPhase);

  return (
    <div className="space-y-6">
      {/* Phase Timeline - Enhanced */}
      <div className="relative">
        {/* Progress track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/30 rounded-full -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(phaseIndex / (phases.length - 1)) * 100}%` }}
        />

        <div className="relative flex items-center justify-between">
          {phases.map((phase, i) => {
            const isActive = currentPhase === phase;
            const isPast = phaseIndex > i;
            return (
              <button
                key={phase}
                onClick={() => handlePhaseClick(phase)}
                className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground glow-secondary'
                    : isPast
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-[10px] font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-secondary' : isPast ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {phaseDescriptions[phase].title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase Description - Enhanced */}
      <div className="text-center p-4 rounded-xl bg-secondary/10 border border-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5" />
        <div className="relative">
          <p className="font-bold text-lg text-foreground">{phaseDescriptions[currentPhase].title}</p>
          <p className="text-sm text-muted-foreground mt-1">{phaseDescriptions[currentPhase].description}</p>
          <p className="text-xs text-secondary mt-2 font-medium">💡 {phaseDescriptions[currentPhase].tip}</p>
        </div>
      </div>

      {/* Deck Visualization - Enhanced with crossfader */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Deck (Outgoing) */}
          <DeckPanel
            label="OUTGOING"
            sublabel="Deck A"
            trackKey="8A"
            state={state.left}
            color="primary"
          />

          {/* Right Deck (Incoming) */}
          <DeckPanel
            label="INCOMING"
            sublabel="Deck B"
            trackKey="8A"
            state={state.right}
            color="secondary"
          />
        </div>

        {/* Crossfader visualization */}
        <div className="px-4 py-3 rounded-lg bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="text-primary font-medium">A</span>
            <span className="font-medium">CROSSFADER</span>
            <span className="text-secondary font-medium">B</span>
          </div>
          <div className="relative h-3 bg-muted/50 rounded-full">
            <div className="absolute inset-y-0 left-1/2 w-px bg-muted-foreground/30" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-5 rounded bg-foreground transition-all duration-500 flex items-center justify-center"
              style={{
                left: `calc(${(state.right.fader / (state.left.fader + state.right.fader || 1)) * 100}% - 12px)`
              }}
            >
              <div className="w-1 h-3 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Play Button - Enhanced */}
      <div className="text-center">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
            isPlaying
              ? 'bg-secondary/50 text-secondary-foreground/70 cursor-not-allowed'
              : 'btn-neon-secondary hover:scale-105'
          }`}
        >
          {isPlaying ? (
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 animate-pulse" />
              Playing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Play Transition
            </span>
          )}
        </button>
      </div>

      {/* Legend - Enhanced */}
      <div className="flex justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-foreground" />
          <span>Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary glow-primary" />
          <span>Bass</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent glow-accent" />
          <span>Filter</span>
        </div>
      </div>
    </div>
  );
}

interface DeckPanelProps {
  label: string;
  sublabel: string;
  trackKey: string;
  state: DeckState;
  color: 'primary' | 'secondary';
}

function DeckPanel({ label, sublabel, trackKey, state, color }: DeckPanelProps) {
  const isPrimary = color === 'primary';
  const colorClass = isPrimary ? 'border-primary/40' : 'border-secondary/40';
  const bgClass = isPrimary ? 'bg-primary/5' : 'bg-secondary/5';
  const textClass = isPrimary ? 'text-primary' : 'text-secondary';
  const glowClass = isPrimary ? 'glow-primary' : 'glow-secondary';

  const getStatusInfo = () => {
    if (state.fader === 0) return { icon: '○', text: 'STANDBY', class: 'text-muted-foreground' };
    if (state.fader === 100) return { icon: '●', text: 'LIVE', class: textClass };
    return { icon: '◐', text: 'FADING', class: 'text-accent' };
  };

  const status = getStatusInfo();

  return (
    <div className={`deck-panel ${colorClass} ${bgClass} transition-all duration-500 ${
      state.active ? `opacity-100 ${state.fader === 100 ? glowClass : ''}` : 'opacity-40'
    }`}>
      {/* Ambient glow overlay */}
      {state.active && state.fader > 0 && (
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isPrimary ? 'bg-primary/5' : 'bg-secondary/5'
          }`}
          style={{ opacity: state.fader / 100 }}
        />
      )}

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div>
          <p className={`text-xs font-black uppercase tracking-wider ${textClass}`}>{label}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{sublabel}</p>
        </div>
        <div className={`px-2 py-1 rounded-md text-xs font-mono font-bold ${textClass} bg-background/60 border ${colorClass}`}>
          {trackKey}
        </div>
      </div>

      {/* Controls */}
      <div className="relative space-y-3">
        {/* Fader/Volume */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Volume</span>
            <span className="text-foreground font-bold font-mono">{state.fader}%</span>
          </div>
          <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden border border-border/20">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-500"
              style={{ width: `${state.fader}%` }}
            />
          </div>
        </div>

        {/* Bass EQ */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Bass</span>
            <span className={`font-bold font-mono ${state.bass === 0 ? 'text-destructive' : 'text-primary'}`}>
              {state.bass === 0 ? 'CUT' : state.bass === 100 ? 'FULL' : `${state.bass}%`}
            </span>
          </div>
          <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden border border-border/20">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                state.bass === 0 ? 'bg-destructive' : 'bg-primary'
              }`}
              style={{
                width: `${state.bass}%`,
                boxShadow: state.bass > 0 ? '0 0 10px hsl(185 100% 55% / 0.5)' : undefined
              }}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Filter</span>
            <span className="text-accent font-bold font-mono">
              {state.filter === 50 ? 'NEUTRAL' : state.filter > 50 ? 'HI-PASS' : 'LO-PASS'}
            </span>
          </div>
          <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden relative border border-border/20">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-accent/30" />
            <div
              className="absolute inset-y-0 bg-accent rounded-full transition-all duration-500"
              style={{
                left: state.filter < 50 ? `${state.filter}%` : '50%',
                width: state.filter < 50 ? `${50 - state.filter}%` : `${state.filter - 50}%`,
                boxShadow: state.filter !== 50 ? '0 0 8px hsl(32 100% 55% / 0.5)' : undefined
              }}
            />
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`relative mt-4 text-center py-2.5 rounded-lg transition-all duration-300 ${
        state.fader === 100
          ? (isPrimary ? 'bg-primary/20 border border-primary/40' : 'bg-secondary/20 border border-secondary/40')
          : state.fader > 0
            ? 'bg-accent/10 border border-accent/30'
            : 'bg-muted/20 border border-border/20'
      }`}>
        <span className={`text-xs font-black uppercase tracking-wide ${status.class} ${
          state.fader === 100 ? 'neon-pulse' : ''
        }`}>
          {status.icon} {status.text}
        </span>
      </div>
    </div>
  );
}

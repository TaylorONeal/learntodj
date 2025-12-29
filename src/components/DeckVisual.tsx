import { useState, useEffect } from 'react';

type TransitionPhase = 'prep' | 'start' | 'blend' | 'swap' | 'exit' | 'done';

interface DeckState {
  fader: number; // 0-100
  bass: number; // 0-100 (100 = full, 0 = cut)
  filter: number; // 0-100 (50 = neutral)
  active: boolean;
}

const phaseDescriptions: Record<TransitionPhase, { title: string; description: string }> = {
  prep: { title: 'Prep', description: 'Incoming ready: fader down, bass cut, filter neutral' },
  start: { title: 'Start on Phrase', description: 'Begin incoming track on phrase boundary' },
  blend: { title: 'Blend (4-8 bars)', description: 'Raise incoming fader gradually' },
  swap: { title: 'Bass Swap', description: 'Cut outgoing bass, bring in incoming bass' },
  exit: { title: 'Exit Outgoing', description: 'Fade or filter out the old track' },
  done: { title: 'Complete', description: 'Incoming track fully in control' }
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

  return (
    <div className="space-y-6">
      {/* Phase Timeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {phases.map((phase, i) => (
          <button
            key={phase}
            onClick={() => handlePhaseClick(phase)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentPhase === phase
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            {i + 1}. {phaseDescriptions[phase].title}
          </button>
        ))}
      </div>

      {/* Phase Description */}
      <div className="text-center p-3 rounded-lg bg-secondary/10 border border-secondary/20">
        <p className="font-medium text-foreground">{phaseDescriptions[currentPhase].title}</p>
        <p className="text-sm text-muted-foreground">{phaseDescriptions[currentPhase].description}</p>
      </div>

      {/* Deck Visualization */}
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

      {/* Play Button */}
      <div className="text-center">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
        >
          {isPlaying ? 'Playing...' : '▶ Play Transition'}
        </button>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-foreground"></div>
          <span>Fader Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary"></div>
          <span>Bass EQ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent"></div>
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
  const colorClass = color === 'primary' ? 'border-primary/30' : 'border-secondary/30';
  const bgClass = color === 'primary' ? 'bg-primary/5' : 'bg-secondary/5';
  const textClass = color === 'primary' ? 'text-primary' : 'text-secondary';

  return (
    <div className={`rounded-xl p-4 border ${colorClass} ${bgClass} transition-all duration-500 ${state.active ? 'opacity-100' : 'opacity-40'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${textClass}`}>{label}</p>
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${textClass} bg-background/50`}>
          {trackKey}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Fader */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fader</span>
            <span className="text-foreground font-medium">{state.fader}%</span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-500"
              style={{ width: `${state.fader}%` }}
            />
          </div>
        </div>

        {/* Bass EQ */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Bass</span>
            <span className={`font-medium ${state.bass === 0 ? 'text-destructive' : 'text-primary'}`}>
              {state.bass === 0 ? 'CUT' : state.bass === 100 ? 'FULL' : `${state.bass}%`}
            </span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${state.bass === 0 ? 'bg-destructive' : 'bg-primary'}`}
              style={{ width: `${state.bass}%` }}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Filter</span>
            <span className="text-accent font-medium">
              {state.filter === 50 ? 'NEUTRAL' : state.filter > 50 ? 'HI-PASS' : 'LO-PASS'}
            </span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-accent/50" />
            <div
              className="absolute inset-y-0 bg-accent rounded-full transition-all duration-500"
              style={{
                left: state.filter < 50 ? `${state.filter}%` : '50%',
                width: state.filter < 50 ? `${50 - state.filter}%` : `${state.filter - 50}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={`mt-4 text-center py-2 rounded-lg ${state.active ? (color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20') : 'bg-muted/20'}`}>
        <span className={`text-xs font-bold uppercase ${state.active ? textClass : 'text-muted-foreground'}`}>
          {state.fader > 0 ? (state.fader === 100 ? '● LIVE' : '◐ FADING') : '○ STANDBY'}
        </span>
      </div>
    </div>
  );
}

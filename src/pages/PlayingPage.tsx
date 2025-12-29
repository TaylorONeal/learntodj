import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Play, ArrowRight } from 'lucide-react';
import { TermInfoBox } from '@/components/TermInfoBox';
import { DeckVisual } from '@/components/DeckVisual';

const PlayingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/intro/prep"
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              ← Prep
            </Link>
            <Link
              to="/intro"
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              101 Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-2xl space-y-4">
        {/* Compact Hero */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Playing</h1>
            <p className="text-sm text-muted-foreground">Enter on phrase. One decision at a time.</p>
          </div>
        </div>

        {/* Compact Visual Guide */}
        <div className="glass-card rounded-xl p-4 border border-secondary/20 space-y-3">
          <h2 className="font-semibold text-foreground text-sm">🎛️ Visual Transition</h2>
          <DeckVisual />
        </div>

        {/* Compact Checklist */}
        <div className="glass-card rounded-xl p-4 border border-secondary/20 space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            Checklist
          </h2>
          <ul className="grid grid-cols-1 gap-1.5">
            {[
              { step: 'Start on phrase', detail: '8 or 16 bar boundary' },
              { step: 'Raise fader', detail: 'Gradual over 4-8 bars' },
              { step: 'One bass only', detail: 'Never two together' },
              { step: 'Listen for handoff', detail: 'Feel the takeover' },
              { step: 'Swap bass', detail: 'Cut old, raise new' },
              { step: 'Exit old track', detail: 'Fade or filter out' },
              { step: 'Restore BPM', detail: 'During next build' }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border/30">
                <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-sm">{item.step}</span>
                  <span className="text-muted-foreground text-xs ml-2">— {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Emergency inline */}
          <div className="rounded-lg bg-destructive/10 p-2.5 border border-destructive/20 text-sm">
            <span className="font-medium text-foreground">🚨 Emergency:</span>
            <span className="text-muted-foreground ml-1">Cut bass → Filter/loop → Commit to new track</span>
          </div>
        </div>

        {/* Compact Terms */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">📚 Quick Reference</h3>
          <div className="grid grid-cols-2 gap-2">
            <TermInfoBox term="Bass Swap">
              <p>Cut old bass, raise new — on phrase boundary.</p>
            </TermInfoBox>
            <TermInfoBox term="Bars">
              <p>4 beats = 1 bar. 8 bars ≈ 15 sec at 128 BPM.</p>
            </TermInfoBox>
            <TermInfoBox term="Build">
              <p>Pre-drop section. Good time to restore BPM.</p>
            </TermInfoBox>
            <TermInfoBox term="Loop">
              <p>Repeat section. Extend or emergency use.</p>
            </TermInfoBox>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayingPage;

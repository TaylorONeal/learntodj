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

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Hero */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <Play className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Playing</h1>
            <p className="text-muted-foreground">The part the crowd hears — should feel almost boring to you</p>
          </div>
        </div>

        {/* Visual Guide */}
        <div className="glass-card rounded-xl p-6 border border-secondary/20 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">🎛️ Visual Transition Guide</h2>
          <p className="text-sm text-muted-foreground">
            Watch how the two decks interact during a typical transition. Click phases or press play.
          </p>
          <DeckVisual />
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-xl p-6 border border-secondary/20 space-y-6">
          <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
            <p className="text-foreground">
              Your job while playing: <strong>Enter on a phrase. Let the music do the work. Make one clear decision at a time.</strong>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              Playing Checklist
            </h2>
            <ul className="space-y-3">
              {[
                { step: 'Start on phrase', detail: 'Count 8 or 16 — drop incoming at phrase boundary' },
                { step: 'Raise fader gradually', detail: 'Smooth increase over 4–8 bars' },
                { step: 'One bass at a time', detail: 'Never two basslines together' },
                { step: 'Listen for the handoff', detail: 'Feel when the new track should take over' },
                { step: 'Swap bass on phrase', detail: 'Cut outgoing bass, raise incoming bass' },
                { step: 'Exit the old track', detail: 'Fade or filter out the outgoing' },
                { step: 'Restore BPM', detail: 'During the next build, return to original tempo' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{item.step}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div className="rounded-lg bg-destructive/10 p-4 border border-destructive/20">
            <h4 className="font-medium text-foreground mb-2">🚨 If something goes wrong:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Cut the outgoing bass immediately</li>
              <li>• Filter or loop briefly to recover</li>
              <li>• Commit to the new track cleanly</li>
            </ul>
          </div>
        </div>

        {/* Term Explanations */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">📚 Terms Explained</h3>
          <div className="space-y-2">
            <TermInfoBox term="Bass Swap">
              <p>The moment where you <strong>cut the bass on the outgoing track</strong> and <strong>bring in the bass on the incoming track</strong>. Done at a phrase boundary for a clean handoff.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Bars">
              <p>A <strong>bar</strong> = 4 beats in 4/4 time. "4-8 bars" = 16-32 beats. At 128 BPM, 8 bars ≈ 15 seconds.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Build">
              <p>The section before a drop where energy rises. Good time to restore BPM if you adjusted it during the transition.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Loop">
              <p>Repeats a section indefinitely. Use to extend a breakdown or as an emergency technique.</p>
            </TermInfoBox>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Link
            to="/intro/prep"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back: Prep
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            Genre Checklists
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PlayingPage;

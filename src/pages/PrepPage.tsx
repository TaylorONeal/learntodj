import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Headphones, ArrowRight } from 'lucide-react';
import { TermInfoBox } from '@/components/TermInfoBox';

const PrepPage = () => {
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
              to="/intro"
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              101 Hub
            </Link>
            <Link
              to="/intro/playing"
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
            >
              Playing →
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Hero */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Prep</h1>
            <p className="text-muted-foreground">Everything before the audience hears the next track</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-xl p-6 border border-primary/20 space-y-6">
          <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
            <p className="text-foreground">
              Your job in prep is simple: <strong>Make sure the next track will land cleanly.</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Remove uncertainty so the transition feels inevitable, not rushed.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Prep Checklist
            </h2>
            <ul className="space-y-3">
              {[
                { step: 'Choose the next track', detail: 'Match the current energy, BPM, and key' },
                { step: 'Check beat 1', detail: 'Verify it\'s correct after analysis — fix if off' },
                { step: 'Set a hot cue', detail: 'At the phrase you want to mix in (usually 8 or 16 bars)' },
                { step: 'Match key', detail: 'Same Camelot or ±1 step' },
                { step: 'Match BPM', detail: 'Within ~4–6 BPM, or meet in the middle' },
                { step: 'Pull LOW EQ down', detail: 'On the incoming track' },
                { step: 'Fader down, filter neutral', detail: 'Ready position' },
                { step: 'Cue in headphones', detail: 'Count the phrasing' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
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

          <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
            <p className="text-foreground font-medium">If prep is done right, the mix feels easy.</p>
            <p className="text-sm text-muted-foreground mt-1">If prep is sloppy, you'll feel rushed and start forcing things.</p>
          </div>
        </div>

        {/* Term Explanations */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">📚 Terms Explained</h3>
          <div className="space-y-2">
            <TermInfoBox term="BPM">
              <p><strong>Beats Per Minute</strong> — the tempo of a track. Matching BPM between tracks keeps them in sync.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Camelot Key">
              <p><strong>Camelot Wheel</strong> simplifies harmonic mixing. Each key gets a number (1-12) and letter (A=minor, B=major).</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>Same key</strong> (8A → 8A) = perfect match</li>
                <li><strong>±1 step</strong> (8A → 7A or 9A) = smooth shift</li>
              </ul>
            </TermInfoBox>
            
            <TermInfoBox term="Beat 1 / Beatgrid">
              <p><strong>Beat 1</strong> is the first beat of the bar. The <strong>beatgrid</strong> shows where each beat falls. If beat 1 is wrong, tracks will feel "off" even when synced.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Hot Cue">
              <p>A saved position you can instantly jump to. Set hot cues at key moments (intro, drop, breakdown).</p>
            </TermInfoBox>
            
            <TermInfoBox term="Phrase">
              <p>Groups of bars (usually 8, 16, or 32). Changes happen at phrase boundaries. Mix "on phrase" for seamless blends.</p>
            </TermInfoBox>
            
            <TermInfoBox term="EQ (LOW/MID/HIGH)">
              <p><strong>LOW</strong> = bass, <strong>MID</strong> = vocals/synths, <strong>HIGH</strong> = hi-hats/cymbals. Golden rule: <strong>never two basses at once</strong>.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Fader & Filter">
              <p><strong>Fader</strong> controls volume. <strong>Filter</strong> removes frequencies (up = removes bass, down = removes highs). "Neutral" = full sound.</p>
            </TermInfoBox>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Link
            to="/intro"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to 101
          </Link>
          <Link
            to="/intro/playing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          >
            Next: Playing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PrepPage;

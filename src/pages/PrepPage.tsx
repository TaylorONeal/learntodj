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

      <main className="container mx-auto px-4 py-4 max-w-2xl space-y-4">
        {/* Compact Hero */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Prep</h1>
            <p className="text-sm text-muted-foreground">Make sure the next track will land cleanly</p>
          </div>
        </div>

        {/* Compact Checklist */}
        <div className="glass-card rounded-xl p-4 border border-primary/20 space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Checklist
          </h2>
          <ul className="grid grid-cols-1 gap-1.5">
            {[
              { step: 'Choose next track', detail: 'Match energy, BPM, key' },
              { step: 'Check beat 1', detail: 'Fix if analysis is off' },
              { step: 'Set hot cue', detail: 'At mix-in phrase (8/16 bars)' },
              { step: 'Match key', detail: 'Same Camelot or ±1' },
              { step: 'Match BPM', detail: '±4-6 BPM range' },
              { step: 'Pull LOW EQ down', detail: 'On incoming track' },
              { step: 'Fader down', detail: 'Filter neutral, ready' },
              { step: 'Cue in headphones', detail: 'Count the phrasing' }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border/30">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-sm">{item.step}</span>
                  <span className="text-muted-foreground text-xs ml-2">— {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="rounded-lg bg-accent/10 p-2.5 border border-accent/20 text-sm">
            <p className="text-foreground">If prep is done right, the mix feels <strong>easy</strong>.</p>
          </div>
        </div>

        {/* Compact Terms - Horizontal Scrollable */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">📚 Quick Reference</h3>
          <div className="grid grid-cols-2 gap-2">
            <TermInfoBox term="BPM">
              <p>Beats Per Minute — tempo. Match between tracks.</p>
            </TermInfoBox>
            <TermInfoBox term="Camelot">
              <p>Key wheel (1-12, A/B). Same or ±1 = safe mix.</p>
            </TermInfoBox>
            <TermInfoBox term="Beat 1">
              <p>First beat of bar. Must be correct for sync.</p>
            </TermInfoBox>
            <TermInfoBox term="Phrase">
              <p>8/16/32 bars. Mix at boundaries.</p>
            </TermInfoBox>
            <TermInfoBox term="EQ">
              <p>LOW/MID/HIGH. Never two basses!</p>
            </TermInfoBox>
            <TermInfoBox term="Hot Cue">
              <p>Saved jump point for instant access.</p>
            </TermInfoBox>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrepPage;

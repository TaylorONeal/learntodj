import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Headphones, Play, Brain } from 'lucide-react';

const Intro101 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Genres</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            🎧 DJ Mixing 101
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            DJ mixing is really just two repeating phases: <span className="text-primary font-medium">Prep</span> and <span className="text-secondary font-medium">Playing</span>.
          </p>
        </div>

        {/* Core Principle */}
        <div className="glass-card rounded-xl p-6 border border-accent/30 bg-accent/5 text-center">
          <Brain className="w-8 h-8 text-accent mx-auto mb-3" />
          <blockquote className="text-lg font-medium text-foreground italic">
            "Prep removes risk. Playing is just timing and restraint."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-3">
            Most good DJs aren't doing more. They're doing less, on purpose, at the right moment.
          </p>
        </div>

        {/* Section 1: Prep */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">1. Prep</h2>
              <p className="text-sm text-muted-foreground">Everything before the audience hears the next track</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-primary/20 space-y-4">
            <p className="text-muted-foreground">
              Your job in prep is simple: <span className="text-foreground font-medium">Make sure the next track will land cleanly.</span> Remove uncertainty so the transition feels inevitable, not rushed.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Prep Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Choose the next track that fits the current energy, BPM, and key',
                  'Check that beat 1 is correct after analysis — fix it if off',
                  'Set a hot cue at the phrase you want to mix in (usually 8 or 16 bars)',
                  'Match key (same Camelot or ±1 step)',
                  'Match BPM (within ~4–6 BPM, or meet in the middle if needed)',
                  "Pull the incoming track's LOW EQ down",
                  'Keep the fader down and filter neutral',
                  'Cue in headphones and count the phrasing'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-medium">If prep is done right,</span> the mix feels easy.<br />
                <span className="text-muted-foreground">If prep is sloppy, you'll feel rushed and start forcing things.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Playing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">2. Playing</h2>
              <p className="text-sm text-muted-foreground">The part the crowd hears — should feel almost boring to you</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-secondary/20 space-y-4">
            <p className="text-muted-foreground">
              Your job while playing: <span className="text-foreground font-medium">Enter on a phrase. Let the music do the work. Make one clear decision at a time.</span>
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                Playing Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Start the incoming track on the phrase (count 8 or 16)',
                  'Bring the fader up smoothly over 4–8 bars',
                  'Keep only one bass active at a time',
                  'Listen for the moment where the new track should take over',
                  'Swap bass at the phrase boundary',
                  'Fade or filter out the old track',
                  'During the next build, return the new track to its original BPM'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
              <h4 className="font-medium text-foreground text-sm mb-2">If something goes wrong:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cut the outgoing bass</li>
                <li>• Filter or loop briefly</li>
                <li>• Commit to the new track cleanly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="glass-card rounded-xl p-5 border border-destructive/30 bg-destructive/5 space-y-3">
          <h3 className="font-semibold text-foreground">⚠️ Most Beginner Mistakes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              Mixing off-phrase
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              Bass on bass (muddiness)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              Forcing a transition because prep wasn't finished
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Explore Genre Checklists
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Intro101;

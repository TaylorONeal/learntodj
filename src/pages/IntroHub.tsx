import { Link } from 'react-router-dom';
import { ArrowLeft, Headphones, Play, Brain, ChevronRight } from 'lucide-react';

const IntroHub = () => {
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

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            🎧 DJ Mixing 101
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            DJ mixing is really just two repeating phases.
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

        {/* Two Phases */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Prep Card */}
          <Link
            to="/intro/prep"
            className="group glass-card rounded-xl p-6 border border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="w-7 h-7 text-primary" />
              </div>
              <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Prep</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Everything that happens before the audience hears the next track.
            </p>
            <div className="text-xs text-primary font-medium">
              8 steps • Key matching • Beatgrid • EQ setup
            </div>
          </Link>

          {/* Playing Card */}
          <Link
            to="/intro/playing"
            className="group glass-card rounded-xl p-6 border border-secondary/30 bg-secondary/5 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-secondary" />
              </div>
              <ChevronRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Playing</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The part the crowd hears — should feel almost boring to you.
            </p>
            <div className="text-xs text-secondary font-medium">
              7 steps • Bass swap • Phrase timing • Visual guide
            </div>
          </Link>
        </div>

        {/* Common Mistakes */}
        <div className="glass-card rounded-xl p-5 border border-destructive/30 bg-destructive/5 space-y-3">
          <h3 className="font-semibold text-foreground">⚠️ Most Beginner Mistakes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Mixing off-phrase</strong> — transitions that don't align with phrase boundaries</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Bass on bass</strong> — two basslines at once = muddy mess</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Forcing it</strong> — rushing because prep wasn't finished</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            Explore Genre Checklists
          </Link>
        </div>
      </main>
    </div>
  );
};

export default IntroHub;

import { Link } from 'react-router-dom';
import { ArrowLeft, Waves, Repeat, Sliders } from 'lucide-react';

const EffectsLoopsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Home
          </Link>
          <div className="flex gap-4 text-sm">
            <Link to="/intro" className="text-muted-foreground hover:text-foreground transition-colors">
              101 Hub
            </Link>
            <Link to="/intro/remixes" className="text-muted-foreground hover:text-foreground transition-colors">
              Remixes
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            🎛️ Effects & Loops
          </h1>
          <p className="text-sm text-muted-foreground">
            Add texture without losing control
          </p>
        </div>

        {/* Core Principle */}
        <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 text-center">
          <blockquote className="text-sm font-medium text-foreground italic">
            "Effects enhance a mix. They shouldn't define it."
          </blockquote>
        </div>

        {/* Effects Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Essential Effects</h2>
          </div>
          
          <div className="grid gap-3">
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Echo Out / Delay</h3>
              <p className="text-xs text-muted-foreground">
                Your emergency exit. When a mix goes wrong, echo out the current track and bring in the next. 
                Set to 1/2 or 3/4 beat for smooth trails.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">High/Low Pass Filter</h3>
              <p className="text-xs text-muted-foreground">
                Gradually remove frequencies to create space. High-pass removes bass (great for builds), 
                low-pass removes highs (creates underwater feel).
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Reverb</h3>
              <p className="text-xs text-muted-foreground">
                Adds space and atmosphere. Use sparingly on transitions or breakdowns. 
                Too much = muddy mix.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Flanger / Phaser</h3>
              <p className="text-xs text-muted-foreground">
                Creates sweeping, jet-like sounds. Best on builds leading to drops. 
                Use briefly — gets tiring quickly.
              </p>
            </div>
          </div>
        </div>

        {/* Loops Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-bold text-foreground">Loop Basics</h2>
          </div>
          
          <div className="grid gap-3">
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">What Loops Do</h3>
              <p className="text-xs text-muted-foreground">
                Repeat a section of the track indefinitely. Use to extend intros/outros, 
                hold a groove while you prep, or create tension before a drop.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Common Loop Lengths</h3>
              <p className="text-xs text-muted-foreground">
                <strong>4-8 bars:</strong> Standard for extending sections<br/>
                <strong>1-2 bars:</strong> Tension builders<br/>
                <strong>1/2 - 1/4 beat:</strong> Stutter/build effects
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Loop + Halve Trick</h3>
              <p className="text-xs text-muted-foreground">
                Start with 4-bar loop, halve it repeatedly (4→2→1→1/2→1/4) for 
                increasing tension. Release right before the drop.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="glass-card rounded-xl p-4 border border-primary/30 bg-primary/5 space-y-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Pro Tips</h3>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Learn echo out first — it's your safety net</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Set loops on-beat by hitting the button on the 1</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Less is more — one well-timed effect beats constant tweaking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Practice effects on headphones before using live</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default EffectsLoopsPage;

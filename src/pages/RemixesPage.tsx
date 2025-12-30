import { Link } from 'react-router-dom';
import { ArrowLeft, Shuffle, Layers, Music } from 'lucide-react';

const RemixesPage = () => {
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
            <Link to="/intro/effects" className="text-muted-foreground hover:text-foreground transition-colors">
              Effects
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            🔀 Remixes & Edits
          </h1>
          <p className="text-sm text-muted-foreground">
            Same song, different energy
          </p>
        </div>

        {/* Types */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Types of Remixes</h2>
          
          <div className="grid gap-3">
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Official Remix</h3>
              <p className="text-xs text-muted-foreground">
                Commissioned by the label. Producer gets the stems (individual tracks) 
                and creates a new version. Usually different BPM/genre.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Bootleg / Unofficial</h3>
              <p className="text-xs text-muted-foreground">
                Made without permission using the original track. Can't be sold officially 
                but often shared freely. Quality varies wildly.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Edit</h3>
              <p className="text-xs text-muted-foreground">
                Minor changes for DJ use — extended intro/outro, removed vocals, 
                adjusted structure. Same core track, just DJ-friendly.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Mashup</h3>
              <p className="text-xs text-muted-foreground">
                Two or more tracks combined — usually vocals from one over the 
                instrumental of another. Key and tempo matching is critical.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">VIP (Variation In Production)</h3>
              <p className="text-xs text-muted-foreground">
                Artist's own rework of their track, often for live sets. 
                Usually more energy or different drop.
              </p>
            </div>
          </div>
        </div>

        {/* Stems Section */}
        <div className="glass-card rounded-xl p-4 border border-secondary/30 bg-secondary/5 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-secondary" />
            <h2 className="font-bold text-foreground">Stems & Live Remixing</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Some DJ software and hardware can separate tracks into stems in real-time:
          </p>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
              <span><strong>Drums</strong> — Kick, snare, hats</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
              <span><strong>Bass</strong> — Low-end elements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
              <span><strong>Melody</strong> — Synths, instruments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
              <span><strong>Vocals</strong> — Isolated voice</span>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-2 mt-2">
            Supported on: rekordbox (with compatible hardware), Serato, Traktor, 
            and some Pioneer gear like XDJ-XZ and CDJ-3000.
          </p>
        </div>

        {/* DJ Tips */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Using Remixes in Sets</h2>
          </div>
          
          <div className="grid gap-3">
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Energy Management</h3>
              <p className="text-xs text-muted-foreground">
                Different remixes = different energy levels. A tech house remix of a pop song 
                can bridge mainstream and underground.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Crowd Recognition</h3>
              <p className="text-xs text-muted-foreground">
                Familiar vocals over a new beat gets instant crowd reaction. 
                Use sparingly — it's a powerful tool.
              </p>
            </div>
            
            <div className="glass-card rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-1">Building a Collection</h3>
              <p className="text-xs text-muted-foreground">
                Find 2-3 good remixes of crowd favorites in your genre. 
                Label them clearly in your library with [Remix] or [Edit] tags.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RemixesPage;

import { Link } from 'react-router-dom';
import { ArrowLeft, Disc3, Monitor, Layers } from 'lucide-react';

const DevicesPage = () => {
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            🎚️ DJ Gear Guide
          </h1>
          <p className="text-sm text-muted-foreground">
            Understanding your hardware
          </p>
        </div>

        {/* FLX4 - Primary */}
        <div className="glass-card rounded-xl p-4 border border-primary/30 bg-primary/5 space-y-3">
          <div className="flex items-center gap-2">
            <Disc3 className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Pioneer DDJ-FLX4</h2>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Beginner</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Perfect entry controller. Lightweight, portable, works with rekordbox, Serato, and even iOS/Android.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Channels:</span>
              <span className="text-foreground ml-1">2</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Jog Size:</span>
              <span className="text-foreground ml-1">Small</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Stems:</span>
              <span className="text-foreground ml-1">No</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-foreground ml-1">~$270</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">
            <strong>Best for:</strong> Learning basics, bedroom practice, mobile gigs
          </div>
        </div>

        {/* XDJ-XZ */}
        <div className="glass-card rounded-xl p-4 border border-secondary/30 bg-secondary/5 space-y-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-secondary" />
            <h2 className="font-bold text-foreground">Pioneer XDJ-XZ</h2>
            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">Pro All-in-One</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Club-quality standalone unit. No laptop needed with USB drives. Full-size jogs and pro mixer.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Channels:</span>
              <span className="text-foreground ml-1">4</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Jog Size:</span>
              <span className="text-foreground ml-1">Full-size</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Stems:</span>
              <span className="text-foreground ml-1">Yes (rekordbox)</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-foreground ml-1">~$2,500</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">
            <strong>vs FLX4:</strong> Standalone capability, 4 channels, full-size jogs, pro FX, stems support
          </div>
        </div>

        {/* CDJ-3000 */}
        <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            <h2 className="font-bold text-foreground">Pioneer CDJ-3000 + DJM</h2>
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Industry Standard</span>
          </div>
          <p className="text-xs text-muted-foreground">
            What you'll find in 90% of clubs. Separate players + mixer. The muscle memory transfers everywhere.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Setup:</span>
              <span className="text-foreground ml-1">Modular</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Jog Size:</span>
              <span className="text-foreground ml-1">Full-size</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Stems:</span>
              <span className="text-foreground ml-1">Yes (built-in)</span>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-foreground ml-1">~$5,000+ (pair + mixer)</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border/50 pt-2">
            <strong>vs FLX4:</strong> Industry standard layout, built-in stems, best jog feel, pro-grade reliability
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center py-2 text-primary font-medium">FLX4</th>
                  <th className="text-center py-2 text-secondary font-medium">XDJ-XZ</th>
                  <th className="text-center py-2 text-accent font-medium">CDJ-3000</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Laptop Required</td>
                  <td className="text-center py-2">Yes</td>
                  <td className="text-center py-2">Optional</td>
                  <td className="text-center py-2">No</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Stems</td>
                  <td className="text-center py-2">❌</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Club Standard</td>
                  <td className="text-center py-2">❌</td>
                  <td className="text-center py-2">~</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Portability</td>
                  <td className="text-center py-2">✓✓</td>
                  <td className="text-center py-2">~</td>
                  <td className="text-center py-2">❌</td>
                </tr>
                <tr>
                  <td className="py-2 text-muted-foreground">Learning Value</td>
                  <td className="text-center py-2">✓✓</td>
                  <td className="text-center py-2">✓✓</td>
                  <td className="text-center py-2">✓✓✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upgrade Path */}
        <div className="glass-card rounded-xl p-4 border border-border/50 space-y-2">
          <h3 className="font-semibold text-foreground">💡 Upgrade Path</h3>
          <p className="text-xs text-muted-foreground">
            <strong>FLX4 → XDJ-XZ:</strong> When you want standalone capability and more channels<br/>
            <strong>XDJ-XZ → CDJ-3000:</strong> When you're playing clubs regularly and need the industry standard
          </p>
          <p className="text-xs text-muted-foreground italic">
            Tip: Skills transfer between all Pioneer gear. Start with FLX4, the concepts apply everywhere.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DevicesPage;

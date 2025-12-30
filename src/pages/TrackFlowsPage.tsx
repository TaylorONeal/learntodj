import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Music2 } from 'lucide-react';
import { genres } from '@/data/genres';
import { TrackFlowTimeline, TrackSection } from '@/components/TrackFlowTimeline';

const sectionTypeDescriptions: Record<TrackSection['type'], string> = {
  intro: 'Opening bars with minimal elements, designed for mixing in.',
  build: 'Rising energy with risers, snare rolls, and tension.',
  drop: 'Peak energy section with full bass and main elements.',
  breakdown: 'Stripped-back section for mixing or emotional contrast.',
  outro: 'Closing bars with reduced elements, designed for mixing out.',
  vocal: 'Melodic or vocal-focused section with lyrical content.',
  groove: 'Rhythmic section focused on percussion and bassline.'
};

const TrackFlowsPage = () => {
  const genresWithFlow = genres.filter(g => g.trackFlow && g.trackFlow.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              <span>Home</span>
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link to="/intro" className="text-muted-foreground hover:text-primary transition-colors">
              101 Hub
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <div className="text-3xl">📊</div>
          <h1 className="text-xl font-bold text-foreground">Track Structures</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Typical section layouts by genre — know where to mix in and out.
          </p>
        </div>

        {/* Section Type Legend */}
        <div className="glass-card rounded-xl p-4 border border-border/50">
          <h2 className="text-sm font-semibold text-foreground mb-3">Section Types</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {Object.entries(sectionTypeDescriptions).map(([type, desc]) => (
              <div key={type} className="flex items-start gap-2">
                <span className="text-xs font-medium text-primary capitalize w-20 flex-shrink-0">{type}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Flows */}
        <div className="space-y-4">
          {genresWithFlow.map(genre => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className="block glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{genre.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <span className="text-xs text-muted-foreground ml-auto">
                  {genre.bpmRange.min}–{genre.bpmRange.max} BPM
                </span>
              </div>
              <TrackFlowTimeline sections={genre.trackFlow!} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrackFlowsPage;

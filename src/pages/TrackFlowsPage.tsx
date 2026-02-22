import { Link } from 'react-router-dom';
import { genres } from '@/data/genres';
import { TrackFlowTimeline, TrackSection } from '@/components/TrackFlowTimeline';
import { Header } from '@/components/Header';

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
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="Track Structures" showBack />

      <main className="container mx-auto px-4 py-4 space-y-6 relative z-10">
        {/* Hero */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
            Track Structures
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            Typical section layouts by genre — know where to mix in and out
          </p>
        </div>

        {/* Section Type Legend */}
        <div
          className="relative rounded-lg overflow-hidden border p-4"
          style={{ borderColor: 'rgba(127,255,212,0.20)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: '#7effdb' }}>
              Section Types
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {Object.entries(sectionTypeDescriptions).map(([type, desc]) => (
                <div key={type} className="flex items-start gap-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.1em] w-20 flex-shrink-0 mt-0.5"
                    style={{ color: '#ffd60a' }}
                  >
                    {type}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Genre Flows */}
        <div className="space-y-3">
          {genresWithFlow.map(genre => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className="block relative rounded-lg overflow-hidden border p-4 transition-all duration-300 group hover:scale-[1.005]"
              style={{ borderColor: 'rgba(127,255,212,0.20)', background: '#061116' }}
            >
              <div className="terminal-scanlines" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{genre.icon}</span>
                  <h3
                    className="text-[11px] font-mono uppercase tracking-[0.15em] transition-colors"
                    style={{ color: '#d8efe9' }}
                  >
                    {genre.name}
                  </h3>
                  <span className="text-[10px] font-mono ml-auto" style={{ color: '#99ffe0' }}>
                    {genre.bpmRange.min}–{genre.bpmRange.max} BPM
                  </span>
                </div>
                <TrackFlowTimeline sections={genre.trackFlow!} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrackFlowsPage;

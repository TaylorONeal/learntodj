import { Shuffle, Layers } from 'lucide-react';
import { Header } from '@/components/Header';

const RemixesPage = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="Remixes & Edits" showBack />

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 relative z-10">
        {/* Hero */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
            Remixes & Edits
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            Same song, different energy
          </p>
        </div>

        {/* Types of Remixes */}
        <div className="space-y-3">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
            Types of Remixes
          </h2>

          <div className="grid gap-2">
            {[
              {
                title: 'Official Remix',
                body: 'Commissioned by the label. Producer gets the stems (individual tracks) and creates a new version. Usually different BPM/genre.',
              },
              {
                title: 'Bootleg / Unofficial',
                body: "Made without permission using the original track. Can't be sold officially but often shared freely. Quality varies wildly.",
              },
              {
                title: 'Edit',
                body: 'Minor changes for DJ use — extended intro/outro, removed vocals, adjusted structure. Same core track, just DJ-friendly.',
              },
              {
                title: 'Mashup',
                body: 'Two or more tracks combined — usually vocals from one over the instrumental of another. Key and tempo matching is critical.',
              },
              {
                title: 'VIP (Variation In Production)',
                body: "Artist's own rework of their track, often for live sets. Usually more energy or different drop.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative rounded border p-3 overflow-hidden"
                style={{ borderColor: 'rgba(127,255,212,0.20)', background: '#061116' }}
              >
                <div className="terminal-scanlines" />
                <div className="relative">
                  <h3 className="text-[11px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: '#d8efe9' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: '#99ffe0' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stems */}
        <div
          className="relative rounded-lg overflow-hidden border p-4 space-y-3"
          style={{ borderColor: 'rgba(255,214,10,0.25)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4" style={{ color: '#ffd60a' }} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#ffd60a' }}>
                Stems & Live Remixing
              </h2>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: '#99ffe0' }}>
              Some DJ software and hardware can separate tracks into stems in real-time:
            </p>
            <ul className="space-y-1.5">
              {['Drums — Kick, snare, hats', 'Bass — Low-end elements', 'Melody — Synths, instruments', 'Vocals — Isolated voice'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs font-mono" style={{ color: '#d8efe9' }}>
                  <span style={{ color: '#ffd60a' }}>›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] font-mono mt-3 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#99ffe0' }}>
              Supported: rekordbox (compatible hardware), Serato, Traktor, XDJ-XZ, CDJ-3000.
            </p>
          </div>
        </div>

        {/* Using Remixes in Sets */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shuffle className="w-4 h-4" style={{ color: '#7effdb' }} />
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
              Using Remixes in Sets
            </h2>
          </div>

          <div className="grid gap-2">
            {[
              {
                title: 'Energy Management',
                body: 'Different remixes = different energy levels. A tech house remix of a pop song can bridge mainstream and underground.',
              },
              {
                title: 'Crowd Recognition',
                body: 'Familiar vocals over a new beat gets instant crowd reaction. Use sparingly — it\'s a powerful tool.',
              },
              {
                title: 'Building a Collection',
                body: 'Find 2-3 good remixes of crowd favorites in your genre. Label them clearly in your library with [Remix] or [Edit] tags.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative rounded border p-3 overflow-hidden"
                style={{ borderColor: 'rgba(127,255,212,0.20)', background: '#061116' }}
              >
                <div className="terminal-scanlines" />
                <div className="relative">
                  <h3 className="text-[11px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: '#d8efe9' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: '#99ffe0' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RemixesPage;

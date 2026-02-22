import { Disc3, Monitor, Layers } from 'lucide-react';
import { Header } from '@/components/Header';

const DevicesPage = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="DJ Gear Guide" showBack />

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-5 relative z-10">
        {/* Hero */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
            DJ Gear Guide
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            Understanding your hardware
          </p>
        </div>

        {/* DDJ-FLX4 */}
        <div
          className="relative rounded-lg overflow-hidden border p-4 space-y-3"
          style={{ borderColor: 'rgba(127,255,212,0.30)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Disc3 className="w-4 h-4" style={{ color: '#7effdb' }} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: '#7effdb' }}>
                Pioneer DDJ-FLX4
              </h2>
              <span
                className="text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 border rounded"
                style={{ borderColor: 'rgba(127,255,212,0.30)', color: '#7effdb', background: 'rgba(127,255,212,0.08)' }}
              >
                Beginner
              </span>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: '#99ffe0' }}>
              Perfect entry controller. Lightweight, portable, works with rekordbox, Serato, and even iOS/Android.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Channels', value: '2' },
                { label: 'Jog Size', value: 'Small' },
                { label: 'Stems', value: 'No' },
                { label: 'Price', value: '~$270' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-2 p-2 rounded border text-xs font-mono"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}
                >
                  <span style={{ color: '#99ffe0' }}>{label}:</span>
                  <span style={{ color: '#d8efe9' }}>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono mt-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#99ffe0' }}>
              Best for: Learning basics, bedroom practice, mobile gigs
            </p>
          </div>
        </div>

        {/* XDJ-XZ */}
        <div
          className="relative rounded-lg overflow-hidden border p-4 space-y-3"
          style={{ borderColor: 'rgba(255,214,10,0.25)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4" style={{ color: '#ffd60a' }} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: '#ffd60a' }}>
                Pioneer XDJ-XZ
              </h2>
              <span
                className="text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 border rounded"
                style={{ borderColor: 'rgba(255,214,10,0.30)', color: '#ffd60a', background: 'rgba(255,214,10,0.08)' }}
              >
                Pro All-in-One
              </span>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: '#99ffe0' }}>
              Club-quality standalone unit. No laptop needed with USB drives. Full-size jogs and pro mixer.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Channels', value: '4' },
                { label: 'Jog Size', value: 'Full-size' },
                { label: 'Stems', value: 'Yes (rekordbox)' },
                { label: 'Price', value: '~$2,500' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-2 p-2 rounded border text-xs font-mono"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}
                >
                  <span style={{ color: '#99ffe0' }}>{label}:</span>
                  <span style={{ color: '#d8efe9' }}>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono mt-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#99ffe0' }}>
              vs FLX4: Standalone capability, 4 channels, full-size jogs, pro FX, stems support
            </p>
          </div>
        </div>

        {/* CDJ-3000 */}
        <div
          className="relative rounded-lg overflow-hidden border p-4 space-y-3"
          style={{ borderColor: 'rgba(255,128,128,0.25)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4" style={{ color: '#ff8080' }} />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: '#ff8080' }}>
                Pioneer CDJ-3000 + DJM
              </h2>
              <span
                className="text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 border rounded"
                style={{ borderColor: 'rgba(255,128,128,0.30)', color: '#ff8080', background: 'rgba(255,128,128,0.08)' }}
              >
                Industry Standard
              </span>
            </div>
            <p className="text-xs font-mono mb-3" style={{ color: '#99ffe0' }}>
              What you'll find in 90% of clubs. Separate players + mixer. The muscle memory transfers everywhere.
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Setup', value: 'Modular' },
                { label: 'Jog Size', value: 'Full-size' },
                { label: 'Stems', value: 'Yes (built-in)' },
                { label: 'Price', value: '~$5,000+ (pair + mixer)' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-2 p-2 rounded border text-xs font-mono"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}
                >
                  <span style={{ color: '#99ffe0' }}>{label}:</span>
                  <span style={{ color: '#d8efe9' }}>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono mt-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#99ffe0' }}>
              vs FLX4: Industry standard layout, built-in stems, best jog feel, pro-grade reliability
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#ffd60a' }}>
            Quick Comparison
          </h2>
          <div
            className="relative rounded-lg overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.10)', background: '#061116' }}
          >
            <div className="terminal-scanlines" />
            <div className="relative overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <th className="text-left px-3 py-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: '#99ffe0' }}>Feature</th>
                    <th className="text-center px-3 py-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: '#7effdb' }}>FLX4</th>
                    <th className="text-center px-3 py-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: '#ffd60a' }}>XDJ-XZ</th>
                    <th className="text-center px-3 py-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: '#ff8080' }}>CDJ-3000</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#d8efe9' }}>
                  {[
                    { feature: 'Laptop Required', flx4: 'Yes', xdj: 'Optional', cdj: 'No' },
                    { feature: 'Stems', flx4: '❌', xdj: '✓', cdj: '✓' },
                    { feature: 'Club Standard', flx4: '❌', xdj: '~', cdj: '✓' },
                    { feature: 'Portability', flx4: '✓✓', xdj: '~', cdj: '❌' },
                    { feature: 'Learning Value', flx4: '✓✓', xdj: '✓✓', cdj: '✓✓✓' },
                  ].map((row) => (
                    <tr key={row.feature} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <td className="px-3 py-2" style={{ color: '#99ffe0' }}>{row.feature}</td>
                      <td className="px-3 py-2 text-center">{row.flx4}</td>
                      <td className="px-3 py-2 text-center">{row.xdj}</td>
                      <td className="px-3 py-2 text-center">{row.cdj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upgrade Path */}
        <div
          className="relative rounded-lg overflow-hidden border p-4"
          style={{ borderColor: 'rgba(255,255,255,0.10)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative space-y-2">
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#ffd60a' }}>
              Upgrade Path
            </h3>
            <p className="text-xs font-mono" style={{ color: '#d8efe9' }}>
              FLX4 → XDJ-XZ: When you want standalone capability and more channels
            </p>
            <p className="text-xs font-mono" style={{ color: '#d8efe9' }}>
              XDJ-XZ → CDJ-3000: When you're playing clubs regularly and need the industry standard
            </p>
            <p className="text-[10px] font-mono pt-1" style={{ color: '#99ffe0' }}>
              Skills transfer between all Pioneer gear. Start with FLX4, the concepts apply everywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DevicesPage;

import { Waves, Repeat, Sliders } from 'lucide-react';
import { Scanlines } from '@/components/Scanlines';
import { Header } from '@/components/Header';

const cardStyle = {
  borderColor: 'rgba(127,255,212,0.20)',
  background: '#061116',
};

const EffectsLoopsPage = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="Effects & Loops" showBack />

      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6 relative z-10">
        {/* Hero */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
            Effects & Loops
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#99ffe0' }}>
            Add texture without losing control
          </p>
        </div>

        {/* Core Principle */}
        <div
          className="relative rounded-lg overflow-hidden border px-4 py-3 text-center"
          style={{ borderColor: 'rgba(255,214,10,0.25)', background: 'rgba(255,214,10,0.04)' }}
        >
          <p className="text-sm font-mono" style={{ color: '#ffd60a' }}>
            "Effects enhance a mix. They shouldn't define it."
          </p>
        </div>

        {/* Essential Effects */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4" style={{ color: '#7effdb' }} />
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
              Essential Effects
            </h2>
          </div>

          <div className="grid gap-2">
            {[
              {
                title: 'Echo Out / Delay',
                body: 'Your emergency exit. When a mix goes wrong, echo out the current track and bring in the next. Set to 1/2 or 3/4 beat for smooth trails.',
              },
              {
                title: 'High/Low Pass Filter',
                body: 'Gradually remove frequencies to create space. High-pass removes bass (great for builds), low-pass removes highs (creates underwater feel).',
              },
              {
                title: 'Reverb',
                body: 'Adds space and atmosphere. Use sparingly on transitions or breakdowns. Too much = muddy mix.',
              },
              {
                title: 'Flanger / Phaser',
                body: 'Creates sweeping, jet-like sounds. Best on builds leading to drops. Use briefly — gets tiring quickly.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative rounded border p-3 overflow-hidden"
                style={cardStyle}
              >
                <Scanlines />
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

        {/* Loops */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4" style={{ color: '#ffd60a' }} />
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#ffd60a' }}>
              Loop Basics
            </h2>
          </div>

          <div className="grid gap-2">
            {[
              {
                title: 'What Loops Do',
                body: 'Repeat a section of the track indefinitely. Use to extend intros/outros, hold a groove while you prep, or create tension before a drop.',
              },
              {
                title: 'Common Loop Lengths',
                body: '4-8 bars: Standard for extending sections\n1-2 bars: Tension builders\n1/2 - 1/4 beat: Stutter/build effects',
              },
              {
                title: 'Loop + Halve Trick',
                body: 'Start with 4-bar loop, halve it repeatedly (4→2→1→1/2→1/4) for increasing tension. Release right before the drop.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative rounded border p-3 overflow-hidden"
                style={{ borderColor: 'rgba(255,214,10,0.20)', background: '#061116' }}
              >
                <Scanlines />
                <div className="relative">
                  <h3 className="text-[11px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: '#d8efe9' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono whitespace-pre-line" style={{ color: '#99ffe0' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div
          className="relative rounded-lg overflow-hidden border p-4 space-y-3"
          style={{ borderColor: 'rgba(127,255,212,0.25)', background: '#061116' }}
        >
          <Scanlines />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4" style={{ color: '#7effdb' }} />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
                Pro Tips
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                "Learn echo out first — it's your safety net",
                'Set loops on-beat by hitting the button on the 1',
                'Less is more — one well-timed effect beats constant tweaking',
                'Practice effects on headphones before using live',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-mono" style={{ color: '#d8efe9' }}>
                  <span style={{ color: '#7effdb' }}>›</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EffectsLoopsPage;

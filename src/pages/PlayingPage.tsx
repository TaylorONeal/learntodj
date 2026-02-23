import { Link } from 'react-router-dom';
import { Scanlines } from '@/components/Scanlines';
import { CheckCircle2, Play } from 'lucide-react';
import { Header } from '@/components/Header';
import { TermInfoBox } from '@/components/TermInfoBox';
import { DeckVisual } from '@/components/DeckVisual';

const PlayingPage = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="Playing" showBack />

      <main className="container mx-auto px-4 py-4 max-w-2xl space-y-4 relative z-10">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center border"
            style={{ background: 'rgba(255,214,10,0.08)', borderColor: 'rgba(255,214,10,0.25)' }}
          >
            <Play className="w-5 h-5" style={{ color: '#ffd60a' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
              Playing
            </h1>
            <p className="text-xs font-mono" style={{ color: '#99ffe0' }}>
              Enter on phrase. One decision at a time.
            </p>
          </div>
        </div>

        {/* Visual Transition */}
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{ borderColor: 'rgba(255,214,10,0.25)', background: '#061116' }}
        >
          <Scanlines />
          <div className="relative p-4 space-y-3">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#ffd60a' }}>
              Visual Transition
            </h2>
            <DeckVisual />
          </div>
        </div>

        {/* Checklist */}
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{ borderColor: 'rgba(255,214,10,0.25)', background: '#061116' }}
        >
          <Scanlines />
          <div className="relative p-4 space-y-3">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: '#ffd60a' }}>
              <CheckCircle2 className="w-4 h-4" />
              Checklist
            </h2>
            <ul className="grid grid-cols-1 gap-1.5">
              {[
                { step: 'Start on phrase', detail: '8 or 16 bar boundary' },
                { step: 'Raise fader', detail: 'Gradual over 4-8 bars' },
                { step: 'One bass only', detail: 'Never two together' },
                { step: 'Listen for handoff', detail: 'Feel the takeover' },
                { step: 'Swap bass', detail: 'Cut old, raise new' },
                { step: 'Exit old track', detail: 'Fade or filter out' },
                { step: 'Restore BPM', detail: 'During next build' }
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-2 rounded border"
                  style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="w-5 h-5 rounded text-[10px] font-bold font-mono flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: 'rgba(255,214,10,0.10)',
                      borderColor: 'rgba(255,214,10,0.25)',
                      color: '#ffd60a',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-sm" style={{ color: '#d8efe9' }}>{item.step}</span>
                    <span className="font-mono text-[10px] ml-2" style={{ color: '#99ffe0' }}>— {item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div
              className="rounded p-2.5 border text-xs font-mono"
              style={{
                background: 'rgba(255,96,96,0.06)',
                borderColor: 'rgba(255,63,63,0.30)',
                color: '#ff8080',
              }}
            >
              <span className="font-bold" style={{ color: '#ff6060' }}>Emergency:</span>
              <span className="ml-1">Cut bass → Filter/loop → Commit to new track</span>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: '#99ffe0' }}>
            Quick Reference
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <TermInfoBox term="Bass Swap">
              <p>Cut old bass, raise new — on phrase boundary.</p>
            </TermInfoBox>
            <TermInfoBox term="Bars">
              <p>4 beats = 1 bar. 8 bars ≈ 15 sec at 128 BPM.</p>
            </TermInfoBox>
            <TermInfoBox term="Build">
              <p>Pre-drop section. Good time to restore BPM.</p>
            </TermInfoBox>
            <TermInfoBox term="Loop">
              <p>Repeat section. Extend or emergency use.</p>
            </TermInfoBox>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayingPage;

import { Link } from 'react-router-dom';
import { CheckCircle2, Headphones } from 'lucide-react';
import { Header } from '@/components/Header';
import { TermInfoBox } from '@/components/TermInfoBox';

const PrepPage = () => {
  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header title="Prep" showBack />

      <main className="container mx-auto px-4 py-4 max-w-2xl space-y-4 relative z-10">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded flex items-center justify-center border"
            style={{ background: 'rgba(127,255,212,0.08)', borderColor: 'rgba(127,255,212,0.25)' }}
          >
            <Headphones className="w-5 h-5" style={{ color: '#7effdb' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
              Prep
            </h1>
            <p className="text-xs font-mono" style={{ color: '#99ffe0' }}>
              Make sure the next track will land cleanly
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{ borderColor: 'rgba(127,255,212,0.25)', background: '#061116' }}
        >
          <div className="terminal-scanlines" />
          <div className="relative p-4 space-y-3">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: '#7effdb' }}>
              <CheckCircle2 className="w-4 h-4" />
              Checklist
            </h2>
            <ul className="grid grid-cols-1 gap-1.5">
              {[
                { step: 'Choose next track', detail: 'Match energy, BPM, key' },
                { step: 'Check beat 1', detail: 'Fix if analysis is off' },
                { step: 'Set hot cue', detail: 'At mix-in phrase (8/16 bars)' },
                { step: 'Match key', detail: 'Same Camelot or ±1' },
                { step: 'Match BPM', detail: '±4-6 BPM range' },
                { step: 'Pull LOW EQ down', detail: 'On incoming track' },
                { step: 'Fader down', detail: 'Filter neutral, ready' },
                { step: 'Cue in headphones', detail: 'Count the phrasing' }
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-2 rounded border"
                  style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="w-5 h-5 rounded text-[10px] font-bold font-mono flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: 'rgba(127,255,212,0.10)',
                      borderColor: 'rgba(127,255,212,0.25)',
                      color: '#7effdb',
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
              className="rounded p-2.5 border text-sm font-mono"
              style={{
                background: 'rgba(255,214,10,0.06)',
                borderColor: 'rgba(255,214,10,0.25)',
                color: '#ffd60a',
              }}
            >
              If prep is done right, the mix feels easy.
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: '#99ffe0' }}>
            Quick Reference
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <TermInfoBox term="BPM">
              <p>Beats Per Minute — tempo. Match between tracks.</p>
            </TermInfoBox>
            <TermInfoBox term="Camelot">
              <p>Key wheel (1-12, A/B). Same or ±1 = safe mix.</p>
            </TermInfoBox>
            <TermInfoBox term="Beat 1">
              <p>First beat of bar. Must be correct for sync.</p>
            </TermInfoBox>
            <TermInfoBox term="Phrase">
              <p>8/16/32 bars. Mix at boundaries.</p>
            </TermInfoBox>
            <TermInfoBox term="EQ">
              <p>LOW/MID/HIGH. Never two basses!</p>
            </TermInfoBox>
            <TermInfoBox term="Hot Cue">
              <p>Saved jump point for instant access.</p>
            </TermInfoBox>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/intro/playing"
            className="inline-block px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] border rounded transition-all duration-200 hover:scale-[1.02]"
            style={{
              borderColor: 'rgba(255,214,10,0.35)',
              color: '#ffd60a',
              background: 'rgba(255,214,10,0.06)',
            }}
          >
            Playing →
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PrepPage;

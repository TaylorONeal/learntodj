import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TrackSection {
  name: string;
  bars: number;
  type: 'intro' | 'build' | 'drop' | 'breakdown' | 'outro' | 'vocal' | 'groove';
  description?: string;
}

interface TrackFlowTimelineProps {
  sections: TrackSection[];
  className?: string;
  bpm?: number;
}

const sectionStyles: Record<TrackSection['type'], { bg: string; border: string; label: string; text: string; energy: string }> = {
  intro: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', label: 'Intro', text: '#d8efe9', energy: 'rgba(255,255,255,0.12)' },
  build: { bg: 'rgba(126,255,219,0.12)', border: 'rgba(126,255,219,0.35)', label: 'Build', text: '#7effdb', energy: 'rgba(126,255,219,0.5)' },
  drop: { bg: 'rgba(255,214,10,0.18)', border: 'rgba(255,214,10,0.50)', label: 'Drop', text: '#ffd60a', energy: 'rgba(255,214,10,0.7)' },
  breakdown: { bg: 'rgba(126,255,219,0.06)', border: 'rgba(126,255,219,0.20)', label: 'Breakdown', text: '#99ffe0', energy: 'rgba(126,255,219,0.2)' },
  outro: { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', label: 'Outro', text: '#d8efe9', energy: 'rgba(255,255,255,0.1)' },
  vocal: { bg: 'rgba(180,130,255,0.12)', border: 'rgba(180,130,255,0.35)', label: 'Vocal', text: '#c9a0ff', energy: 'rgba(180,130,255,0.4)' },
  groove: { bg: 'rgba(126,255,219,0.10)', border: 'rgba(126,255,219,0.30)', label: 'Groove', text: '#7effdb', energy: 'rgba(126,255,219,0.35)' },
};

export const TrackFlowTimeline = ({ sections, className, bpm = 120 }: TrackFlowTimelineProps) => {
  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0);
  const [selected, setSelected] = useState<number | null>(null);

  // 1 bar = 4 beats; seconds = bars * 4 * 60 / bpm
  const barsToSeconds = (bars: number) => Math.round((bars * 4 * 60) / bpm);
  const totalSeconds = barsToSeconds(totalBars);
  const fmt = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Timeline visual — tap a section for details */}
      <div className="relative">
        <div
          className="flex h-16 rounded-lg overflow-hidden border"
          style={{ borderColor: 'rgba(127,255,212,0.25)', background: 'rgba(0,0,0,0.3)' }}
        >
          {sections.map((section, i) => {
            const width = (section.bars / totalBars) * 100;
            const style = sectionStyles[section.type];
            const isSelected = selected === i;

            return (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(isSelected ? null : i);
                }}
                className="relative flex flex-col items-center justify-center border-r last:border-r-0 transition-all duration-200 min-w-0 outline-none"
                style={{
                  width: `${width}%`,
                  background: isSelected ? style.border : style.bg,
                  borderColor: style.border,
                }}
                aria-label={`${section.name}, ${section.bars} bars`}
                aria-pressed={isSelected}
              >
                {width > 8 ? (
                  <>
                    <span className="text-[10px] sm:text-xs font-mono font-medium truncate px-1 max-w-full" style={{ color: style.text }}>
                      {section.name}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono" style={{ color: 'rgba(153,255,224,0.6)' }}>
                      {section.bars}
                    </span>
                  </>
                ) : (
                  <span className="w-1 h-1 rounded-full" style={{ background: style.text }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Energy indicator line */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="flex h-full">
            {sections.map((section, i) => {
              const width = (section.bars / totalBars) * 100;
              return <div key={i} className="h-full" style={{ width: `${width}%`, background: sectionStyles[section.type].energy }} />;
            })}
          </div>
        </div>
      </div>

      {/* Selected section detail */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-lg border px-3 py-2.5 mt-1"
              style={{ borderColor: sectionStyles[sections[selected].type].border, background: 'rgba(0,0,0,0.35)' }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.12em]" style={{ color: sectionStyles[sections[selected].type].text }}>
                  {sections[selected].name}
                </span>
                <span className="text-[10px] font-mono whitespace-nowrap" style={{ color: '#99ffe0' }}>
                  {sections[selected].bars} bars · ~{fmt(barsToSeconds(sections[selected].bars))}
                </span>
              </div>
              {sections[selected].description && (
                <p className="text-[11px] font-mono mt-1.5 leading-relaxed" style={{ color: '#d8efe9' }}>
                  {sections[selected].description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
        {Object.entries(sectionStyles).map(([type, style]) => {
          if (!sections.some((s) => s.type === type)) return null;
          return (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border" style={{ background: style.bg, borderColor: style.border }} />
              <span className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>{style.label}</span>
            </div>
          );
        })}
      </div>

      {/* Hint + total */}
      <div className="flex items-center justify-between text-[10px] font-mono">
        <span style={{ color: 'rgba(153,255,224,0.55)' }}>tap a section for detail</span>
        <span style={{ color: '#7effdb' }}>{totalBars} bars · ~{fmt(totalSeconds)} @ {bpm} BPM</span>
      </div>
    </div>
  );
};

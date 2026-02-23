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
}

const sectionStyles: Record<TrackSection['type'], {
  bg: string;
  border: string;
  label: string;
  textColor: string;
  subColor: string;
}> = {
  intro: {
    bg: 'bg-black/40',
    border: 'border-white/10',
    label: 'Intro',
    textColor: '#99ffe0',
    subColor: 'rgba(153,255,224,0.55)',
  },
  build: {
    bg: 'bg-[#7effdb]/20',
    border: 'border-[#7effdb]/40',
    label: 'Build',
    textColor: '#7effdb',
    subColor: 'rgba(126,255,219,0.60)',
  },
  drop: {
    bg: 'bg-gradient-to-r from-[#7effdb] to-[#ffd60a]',
    border: 'border-[#ffd60a]/70',
    label: 'Drop',
    textColor: '#0a0a0c',
    subColor: 'rgba(10,10,12,0.70)',
  },
  breakdown: {
    bg: 'bg-[#ffd60a]/15',
    border: 'border-[#ffd60a]/35',
    label: 'Breakdown',
    textColor: '#ffd60a',
    subColor: 'rgba(255,214,10,0.60)',
  },
  outro: {
    bg: 'bg-black/30',
    border: 'border-white/[0.07]',
    label: 'Outro',
    textColor: '#99ffe0',
    subColor: 'rgba(153,255,224,0.40)',
  },
  vocal: {
    bg: 'bg-purple-500/30',
    border: 'border-purple-400/50',
    label: 'Vocal',
    textColor: '#e0b4ff',
    subColor: 'rgba(224,180,255,0.55)',
  },
  groove: {
    bg: 'bg-teal-500/30',
    border: 'border-teal-400/50',
    label: 'Groove',
    textColor: '#7effdb',
    subColor: 'rgba(126,255,219,0.55)',
  },
};

export const TrackFlowTimeline = ({ sections, className }: TrackFlowTimelineProps) => {
  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Timeline visual */}
      <div className="relative">
        <div className="flex h-16 rounded-lg overflow-hidden border border-white/10">
          {sections.map((section, i) => {
            const width = (section.bars / totalBars) * 100;
            const style = sectionStyles[section.type];

            return (
              <div
                key={i}
                className={cn(
                  'relative flex flex-col items-center justify-center border-r last:border-r-0 transition-all duration-300 hover:brightness-110',
                  style.bg,
                  style.border
                )}
                style={{ width: `${width}%` }}
              >
                {width > 8 && (
                  <>
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold truncate px-1 uppercase tracking-[0.06em] drop-shadow-sm"
                      style={{ color: style.textColor }}
                    >
                      {section.name}
                    </span>
                    <span
                      className="text-[8px] sm:text-[9px] font-mono"
                      style={{ color: style.subColor }}
                    >
                      {section.bars}b
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Energy indicator line */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden bg-white/[0.06]">
          <div className="flex h-full">
            {sections.map((section, i) => {
              const width = (section.bars / totalBars) * 100;
              const intensity =
                section.type === 'drop' ? 'bg-[#ffd60a]'
                : section.type === 'build' ? 'bg-[#7effdb]/70'
                : section.type === 'breakdown' ? 'bg-[#ffd60a]/40'
                : 'bg-white/20';

              return (
                <div
                  key={i}
                  className={cn('h-full', intensity)}
                  style={{ width: `${width}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-2">
        {Object.entries(sectionStyles).map(([type, style]) => {
          if (!sections.some(s => s.type === type)) return null;
          return (
            <div key={type} className="flex items-center gap-1.5">
              <div className={cn('w-3 h-3 rounded-sm border', style.bg, style.border)} />
              <span className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>
                {style.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total bars */}
      <div className="text-[10px] font-mono text-right" style={{ color: 'rgba(153,255,224,0.50)' }}>
        {totalBars} bars · ~{Math.round(totalBars * 2)}s @ 120 BPM
      </div>
    </div>
  );
};

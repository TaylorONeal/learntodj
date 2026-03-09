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

const sectionStyles: Record<TrackSection['type'], { bg: string; border: string; label: string; text: string }> = {
  intro: { 
    bg: 'rgba(255,255,255,0.06)', 
    border: 'rgba(255,255,255,0.15)',
    label: 'Intro',
    text: '#d8efe9',
  },
  build: { 
    bg: 'rgba(126,255,219,0.12)', 
    border: 'rgba(126,255,219,0.35)',
    label: 'Build',
    text: '#7effdb',
  },
  drop: { 
    bg: 'rgba(255,214,10,0.18)', 
    border: 'rgba(255,214,10,0.50)',
    label: 'Drop',
    text: '#ffd60a',
  },
  breakdown: { 
    bg: 'rgba(126,255,219,0.06)', 
    border: 'rgba(126,255,219,0.20)',
    label: 'Breakdown',
    text: '#99ffe0',
  },
  outro: { 
    bg: 'rgba(255,255,255,0.04)', 
    border: 'rgba(255,255,255,0.12)',
    label: 'Outro',
    text: '#d8efe9',
  },
  vocal: { 
    bg: 'rgba(180,130,255,0.12)', 
    border: 'rgba(180,130,255,0.35)',
    label: 'Vocal',
    text: '#c9a0ff',
  },
  groove: { 
    bg: 'rgba(126,255,219,0.10)', 
    border: 'rgba(126,255,219,0.30)',
    label: 'Groove',
    text: '#7effdb',
  }
};

export const TrackFlowTimeline = ({ sections, className }: TrackFlowTimelineProps) => {
  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0);
  
  return (
    <div className={cn('space-y-3', className)}>
      {/* Timeline visual */}
      <div className="relative">
        <div
          className="flex h-16 rounded-lg overflow-hidden border"
          style={{ borderColor: 'rgba(127,255,212,0.25)', background: 'rgba(0,0,0,0.3)' }}
        >
          {sections.map((section, i) => {
            const width = (section.bars / totalBars) * 100;
            const style = sectionStyles[section.type];
            
            return (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center border-r last:border-r-0 transition-all duration-300"
                style={{
                  width: `${width}%`,
                  background: style.bg,
                  borderColor: style.border,
                }}
              >
                {width > 8 && (
                  <>
                    <span
                      className="text-[10px] sm:text-xs font-mono font-medium truncate px-1"
                      style={{ color: style.text }}
                    >
                      {section.name}
                    </span>
                    <span
                      className="text-[8px] sm:text-[10px] font-mono"
                      style={{ color: 'rgba(153,255,224,0.6)' }}
                    >
                      {section.bars} bars
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Energy indicator line */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="flex h-full">
            {sections.map((section, i) => {
              const width = (section.bars / totalBars) * 100;
              const intensity = section.type === 'drop' ? 'rgba(255,214,10,0.7)' 
                : section.type === 'build' ? 'rgba(126,255,219,0.5)'
                : section.type === 'breakdown' ? 'rgba(126,255,219,0.2)'
                : 'rgba(255,255,255,0.1)';
              
              return (
                <div
                  key={i}
                  className="h-full"
                  style={{ width: `${width}%`, background: intensity }}
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
              <div
                className="w-3 h-3 rounded-sm border"
                style={{ background: style.bg, borderColor: style.border }}
              />
              <span className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>{style.label}</span>
            </div>
          );
        })}
      </div>
      
      {/* Total bars */}
      <div className="text-[10px] font-mono text-right" style={{ color: '#7effdb' }}>
        Total: {totalBars} bars (~{Math.round(totalBars * 2)} seconds at 120 BPM)
      </div>
    </div>
  );
};
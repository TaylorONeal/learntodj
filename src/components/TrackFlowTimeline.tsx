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

const sectionStyles: Record<TrackSection['type'], { bg: string; border: string; label: string }> = {
  intro: { 
    bg: 'bg-muted/60', 
    border: 'border-muted-foreground/30',
    label: 'Intro'
  },
  build: { 
    bg: 'bg-gradient-to-r from-primary/20 to-primary/50', 
    border: 'border-primary/50',
    label: 'Build'
  },
  drop: { 
    bg: 'bg-gradient-to-r from-primary to-secondary', 
    border: 'border-secondary',
    label: 'Drop'
  },
  breakdown: { 
    bg: 'bg-accent/30', 
    border: 'border-accent/50',
    label: 'Breakdown'
  },
  outro: { 
    bg: 'bg-muted/40', 
    border: 'border-muted-foreground/20',
    label: 'Outro'
  },
  vocal: { 
    bg: 'bg-purple-500/40', 
    border: 'border-purple-400/60',
    label: 'Vocal'
  },
  groove: { 
    bg: 'bg-teal-500/40', 
    border: 'border-teal-400/60',
    label: 'Groove'
  }
};

export const TrackFlowTimeline = ({ sections, className }: TrackFlowTimelineProps) => {
  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0);
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* Timeline visual */}
      <div className="relative">
        <div className="flex h-16 rounded-lg overflow-hidden border border-border/50">
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
                    <span className="text-[10px] sm:text-xs font-medium text-foreground truncate px-1">
                      {section.name}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground">
                      {section.bars} bars
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Energy indicator line */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden bg-muted/30">
          <div className="flex h-full">
            {sections.map((section, i) => {
              const width = (section.bars / totalBars) * 100;
              const intensity = section.type === 'drop' ? 'bg-secondary' 
                : section.type === 'build' ? 'bg-primary/70'
                : section.type === 'breakdown' ? 'bg-accent/50'
                : 'bg-muted-foreground/30';
              
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
              <span className="text-xs text-muted-foreground">{style.label}</span>
            </div>
          );
        })}
      </div>
      
      {/* Total bars */}
      <div className="text-xs text-muted-foreground text-right">
        Total: {totalBars} bars (~{Math.round(totalBars * 2)} seconds at 120 BPM)
      </div>
    </div>
  );
};

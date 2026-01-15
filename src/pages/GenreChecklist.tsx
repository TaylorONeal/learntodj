import { useParams, Navigate } from 'react-router-dom';
import {
  Key,
  Gauge,
  Grid3X3,
  Layers,
  Activity,
  ListChecks,
  Zap,
  AlertTriangle,
  RotateCcw,
  Star,
  Clock,
  Play,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { ModeToggle } from '@/components/ModeToggle';
import { ChecklistSection } from '@/components/ChecklistSection';
import { InfoCard } from '@/components/InfoCard';
import { TrackFlowTimeline } from '@/components/TrackFlowTimeline';
import { genres } from '@/data/genres';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';
import { useChecklist } from '@/hooks/useChecklist';
import { useFavorites } from '@/hooks/useFavorites';

const GenreChecklist = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const { isAdvanced, toggleMode } = useAdvancedMode();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const genre = genres.find(g => g.id === genreId);
  
  const { toggleItem, isChecked, getProgress, resetSection, resetAll } = useChecklist(genreId || '');

  if (!genre) {
    return <Navigate to="/" replace />;
  }

  const allSections = [
    { key: 'beatgrid', items: genre.beatgridSteps },
    { key: 'transition', items: genre.transitionChecklist },
    { key: 'emergency', items: isAdvanced
      ? [...genre.emergencyOut.basic, ...genre.emergencyOut.advanced]
      : genre.emergencyOut.basic
    },
  ];

  const totalItems = allSections.reduce((sum, s) => sum + s.items.length, 0);
  const checkedItems = allSections.reduce((sum, s) =>
    sum + s.items.filter((_, i) => isChecked(s.key, i)).length, 0
  );
  const hasActiveSession = checkedItems > 0;

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title={genre.name} showBack />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Genre Header - Redesigned */}
        <div className="glass-card rounded-xl p-6 border border-primary/30 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <div className="relative flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl filter drop-shadow-lg">{genre.icon}</div>
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tight">{genre.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bpm-badge">
                    {genre.bpmRange.min}–{genre.bpmRange.max} BPM
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(genre.id)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isFavorite(genre.id)
                    ? 'bg-accent/20 text-accent glow-accent border border-accent/40'
                    : 'bg-muted/30 text-muted-foreground hover:text-accent hover:bg-accent/10 border border-border/30'
                }`}
              >
                <Star className={`w-5 h-5 ${isFavorite(genre.id) ? 'fill-current' : ''}`} />
              </button>
              <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
            </div>
          </div>
        </div>

        {/* Practice Session Banner - New Concept */}
        <div className={`rounded-xl p-4 border transition-all duration-300 ${
          hasActiveSession
            ? 'bg-secondary/10 border-secondary/40 glow-secondary'
            : 'bg-muted/20 border-border/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasActiveSession ? (
                <>
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-secondary fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary">Practice Session Active</p>
                    <p className="text-xs text-muted-foreground">
                      {checkedItems} of {totalItems} steps checked off
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Ready to Practice</p>
                    <p className="text-xs text-muted-foreground">
                      Use checklists below to guide your mix session
                    </p>
                  </div>
                </>
              )}
            </div>
            {hasActiveSession && (
              <button
                onClick={resetAll}
                className="btn-neon-secondary text-sm flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Session
              </button>
            )}
          </div>

          {/* Session tip */}
          <div className="mt-3 pt-3 border-t border-border/20">
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">Tip:</span> These checklists are practice guides, not achievements.
              Check items as you practice each technique, then start fresh for your next session.
            </p>
          </div>
        </div>

        {/* Track Flow Timeline */}
        {genre.trackFlow && (
          <InfoCard title="Typical Track Flow" icon={<Clock className="w-5 h-5" />} variant="secondary">
            <TrackFlowTimeline sections={genre.trackFlow} />
          </InfoCard>
        )}

        {/* Key Mixing */}
        <InfoCard title="Key Mixing (Camelot)" icon={<Key className="w-5 h-5" />} variant="primary">
          <ul className="space-y-2">
            {genre.keyTips.basic.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
            {isAdvanced && genre.keyTips.advanced.map((tip, i) => (
              <li key={`adv-${i}`} className="flex items-start gap-2">
                <span className="text-secondary mt-1">★</span>
                <span className="text-secondary">{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* BPM Transitions */}
        <InfoCard title="BPM Transitions" icon={<Gauge className="w-5 h-5" />} variant="secondary">
          <ul className="space-y-2">
            {genre.bpmTips.basic.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
            {isAdvanced && genre.bpmTips.advanced.map((tip, i) => (
              <li key={`adv-${i}`} className="flex items-start gap-2">
                <span className="text-secondary mt-1">★</span>
                <span className="text-secondary">{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Beatgrid Steps */}
        <ChecklistSection
          title="Beat-1 / Beatgrid Setup"
          icon={<Grid3X3 className="w-5 h-5" />}
          items={genre.beatgridSteps}
          sectionKey="beatgrid"
          isChecked={(index) => isChecked('beatgrid', index)}
          onToggle={(index) => toggleItem('beatgrid', index)}
          onReset={() => resetSection('beatgrid')}
          progress={getProgress('beatgrid', genre.beatgridSteps.length)}
        />

        {/* Phrase Timing */}
        <InfoCard title="Phrase Timing" icon={<Layers className="w-5 h-5" />}>
          <ul className="space-y-2">
            {genre.phraseTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Waveform Reading */}
        <InfoCard title="Waveform Reading" icon={<Activity className="w-5 h-5" />}>
          <ul className="space-y-2">
            {genre.waveformTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Standard Transition Checklist */}
        <ChecklistSection
          title="Standard Transition Checklist"
          icon={<ListChecks className="w-5 h-5" />}
          items={genre.transitionChecklist}
          sectionKey="transition"
          isChecked={(index) => isChecked('transition', index)}
          onToggle={(index) => toggleItem('transition', index)}
          onReset={() => resetSection('transition')}
          progress={getProgress('transition', genre.transitionChecklist.length)}
        />

        {/* Emergency Out */}
        <ChecklistSection
          title="Quick Transition / Emergency Out"
          icon={<Zap className="w-5 h-5" />}
          items={isAdvanced 
            ? [...genre.emergencyOut.basic, ...genre.emergencyOut.advanced]
            : genre.emergencyOut.basic
          }
          sectionKey="emergency"
          isChecked={(index) => isChecked('emergency', index)}
          onToggle={(index) => toggleItem('emergency', index)}
          onReset={() => resetSection('emergency')}
          progress={getProgress('emergency', isAdvanced 
            ? genre.emergencyOut.basic.length + genre.emergencyOut.advanced.length
            : genre.emergencyOut.basic.length
          )}
          variant="tip"
        />

        {/* Watchouts */}
        <div className="glass-card rounded-xl p-4 border border-accent/30 bg-accent/5 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Watchouts</h3>
          </div>
          <ul className="space-y-3">
            {genre.watchouts.map((watchout, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-medium">
                  !
                </span>
                <span className="text-muted-foreground">{watchout}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default GenreChecklist;

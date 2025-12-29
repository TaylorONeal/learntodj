import { useParams, Navigate } from 'react-router-dom';
import { 
  Music, 
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
  Clock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { ModeToggle } from '@/components/ModeToggle';
import { ChecklistSection } from '@/components/ChecklistSection';
import { InfoCard } from '@/components/InfoCard';
import { ProgressBar } from '@/components/ProgressBar';
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
  const completedItems = allSections.reduce((sum, s) => 
    sum + s.items.filter((_, i) => isChecked(s.key, i)).length, 0
  );
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title={genre.name} showBack />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Genre Header */}
        <div className="glass-card rounded-xl p-6 border border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{genre.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{genre.name}</h2>
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
                className={`p-2 rounded-full transition-all duration-300 ${
                  isFavorite(genre.id)
                    ? 'bg-accent/20 text-accent glow-accent'
                    : 'bg-muted/50 text-muted-foreground hover:text-accent'
                }`}
              >
                <Star className={`w-5 h-5 ${isFavorite(genre.id) ? 'fill-current' : ''}`} />
              </button>
              <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <button
                onClick={resetAll}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>
            <ProgressBar progress={overallProgress} />
            <p className="text-xs text-muted-foreground text-right">
              {completedItems} of {totalItems} steps completed
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

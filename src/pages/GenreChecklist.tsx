import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { Scanlines } from '@/components/Scanlines';
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
    <div className="min-h-screen pb-8 relative" style={{ background: '#0a0a0c' }}>
      <Header title={genre.name} showBack />

      <main className="container mx-auto px-4 py-6 space-y-5 relative z-10">
        {/* Genre Header */}
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{
            borderColor: 'rgba(127,255,212,0.30)',
            background: 'radial-gradient(circle at top, rgba(0,255,184,0.10), transparent 50%), #061116',
            boxShadow: '0 0 60px rgba(0,255,184,0.08)',
          }}
        >
          <Scanlines />
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0 1px, transparent 2px), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.09) 0 1px, transparent 2px)',
              backgroundSize: '10px 10px, 14px 14px',
              mixBlendMode: 'screen',
            }}
          />
          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl filter drop-shadow-lg">{genre.icon}</div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1" style={{ color: '#99ffe0' }}>
                    Genre // Practice Guide
                  </p>
                  <h2 className="text-xl font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
                    {genre.name}
                  </h2>
                  <div className="mt-2">
                    <span className="bpm-badge">
                      {genre.bpmRange.min}–{genre.bpmRange.max} BPM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(genre.id)}
                  className="p-2 rounded border transition-all duration-300"
                  style={{
                    borderColor: isFavorite(genre.id) ? 'rgba(255,214,10,0.40)' : 'rgba(255,255,255,0.10)',
                    background: isFavorite(genre.id) ? 'rgba(255,214,10,0.10)' : 'rgba(0,0,0,0.30)',
                    color: isFavorite(genre.id) ? '#ffd60a' : 'rgba(153,255,224,0.40)',
                  }}
                >
                  <Star className={`w-4 h-4 ${isFavorite(genre.id) ? 'fill-current' : ''}`} />
                </button>
                <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
              </div>
            </div>
          </div>
        </div>

        {/* Practice Session Banner */}
        <div
          className="rounded-lg p-4 border transition-all duration-300"
          style={{
            borderColor: hasActiveSession ? 'rgba(127,255,212,0.30)' : 'rgba(255,255,255,0.08)',
            background: hasActiveSession ? 'rgba(127,255,212,0.04)' : 'rgba(0,0,0,0.25)',
            boxShadow: hasActiveSession ? '0 0 40px rgba(0,255,184,0.06)' : 'none',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasActiveSession ? (
                <>
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center border"
                    style={{ background: 'rgba(127,255,212,0.10)', borderColor: 'rgba(127,255,212,0.25)' }}
                  >
                    <Play className="w-4 h-4 fill-current" style={{ color: '#7effdb' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#7effdb' }}>
                      Session Active
                    </p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                      {checkedItems} of {totalItems} steps checked
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center border"
                    style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(0,0,0,0.30)' }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#99ffe0' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: '#d8efe9' }}>
                      Ready to Practice
                    </p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                      Use checklists below to guide your session
                    </p>
                  </div>
                </>
              )}
            </div>
            {hasActiveSession && (
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] border rounded transition-all duration-200 hover:scale-[1.02]"
                style={{
                  borderColor: 'rgba(255,214,10,0.35)',
                  color: '#ffd60a',
                  background: 'rgba(255,214,10,0.06)',
                }}
              >
                <RotateCcw className="w-3 h-3" />
                New Session
              </button>
            )}
          </div>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] font-mono" style={{ color: '#99ffe0' }}>
              <span style={{ color: '#7effdb' }}>//</span> Checklists are practice guides, not achievements.
              Check items as you practice each technique.
            </p>
          </div>
        </div>

        {/* Track Flow Timeline */}
        {genre.trackFlow && (
          <InfoCard title="Typical Track Flow" icon={<Clock className="w-4 h-4" />} variant="secondary">
            <TrackFlowTimeline sections={genre.trackFlow} />
          </InfoCard>
        )}

        {/* Key Mixing */}
        <InfoCard title="Key Mixing (Camelot)" icon={<Key className="w-4 h-4" />} variant="primary">
          <ul className="space-y-2">
            {genre.keyTips.basic.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#7effdb' }}>›</span>
                <span>{tip}</span>
              </li>
            ))}
            {isAdvanced && genre.keyTips.advanced.map((tip, i) => (
              <li key={`adv-${i}`} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#ffd60a' }}>★</span>
                <span style={{ color: '#ffd60a' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* BPM Transitions */}
        <InfoCard title="BPM Transitions" icon={<Gauge className="w-4 h-4" />} variant="secondary">
          <ul className="space-y-2">
            {genre.bpmTips.basic.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#7effdb' }}>›</span>
                <span>{tip}</span>
              </li>
            ))}
            {isAdvanced && genre.bpmTips.advanced.map((tip, i) => (
              <li key={`adv-${i}`} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#ffd60a' }}>★</span>
                <span style={{ color: '#ffd60a' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Beatgrid Steps */}
        <ChecklistSection
          title="Beat-1 / Beatgrid Setup"
          icon={<Grid3X3 className="w-4 h-4" />}
          items={genre.beatgridSteps}
          sectionKey="beatgrid"
          isChecked={(index) => isChecked('beatgrid', index)}
          onToggle={(index) => toggleItem('beatgrid', index)}
          onReset={() => resetSection('beatgrid')}
          progress={getProgress('beatgrid', genre.beatgridSteps.length)}
        />

        {/* Phrase Timing */}
        <InfoCard title="Phrase Timing" icon={<Layers className="w-4 h-4" />}>
          <ul className="space-y-2">
            {genre.phraseTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#7effdb' }}>›</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Waveform Reading */}
        <InfoCard title="Waveform Reading" icon={<Activity className="w-4 h-4" />}>
          <ul className="space-y-2">
            {genre.waveformTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#7effdb' }}>›</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Standard Transition Checklist */}
        <ChecklistSection
          title="Standard Transition Checklist"
          icon={<ListChecks className="w-4 h-4" />}
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
          icon={<Zap className="w-4 h-4" />}
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

        {/* Watchouts — red alert critical banner */}
        <motion.section
          className="relative border-2 rounded-lg overflow-hidden"
          style={{ borderColor: 'rgba(255,63,63,0.50)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Pulsing header */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.55, repeat: Infinity }}
            className="px-4 py-2 text-center border-b font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{
              background: '#2a0000',
              borderColor: 'rgba(255,63,63,0.40)',
              color: '#ff6060',
            }}
          >
            ⚠ Watchouts — Avoid These Mistakes ⚠
          </motion.div>

          {/* Content */}
          <div className="relative p-4" style={{ background: '#150505' }}>
            <Scanlines />
            <ul className="relative z-10 space-y-3">
              {genre.watchouts.map((watchout, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-mono">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border"
                    style={{
                      background: 'rgba(255,96,96,0.15)',
                      borderColor: 'rgba(255,96,96,0.30)',
                      color: '#ff6060',
                    }}
                  >
                    !
                  </span>
                  <span style={{ color: '#d8efe9' }}>{watchout}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pulsing border flash overlay */}
          <motion.div
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.55, repeat: Infinity }}
            className="absolute inset-0 border-4 border-red-500 pointer-events-none rounded-lg"
          />
        </motion.section>
      </main>
    </div>
  );
};

export default GenreChecklist;

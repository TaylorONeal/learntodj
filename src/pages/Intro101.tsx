import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Headphones, Play, Brain } from 'lucide-react';
import { TermInfoBox } from '@/components/TermInfoBox';

const Intro101 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Genres</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            🎧 DJ Mixing 101
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            DJ mixing is really just two repeating phases: <span className="text-primary font-medium">Prep</span> and <span className="text-secondary font-medium">Playing</span>.
          </p>
        </div>

        {/* Core Principle */}
        <div className="glass-card rounded-xl p-6 border border-accent/30 bg-accent/5 text-center">
          <Brain className="w-8 h-8 text-accent mx-auto mb-3" />
          <blockquote className="text-lg font-medium text-foreground italic">
            "Prep removes risk. Playing is just timing and restraint."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-3">
            Most good DJs aren't doing more. They're doing less, on purpose, at the right moment.
          </p>
        </div>

        {/* Section 1: Prep */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">1. Prep</h2>
              <p className="text-sm text-muted-foreground">Everything before the audience hears the next track</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-primary/20 space-y-4">
            <p className="text-muted-foreground">
              Your job in prep is simple: <span className="text-foreground font-medium">Make sure the next track will land cleanly.</span> Remove uncertainty so the transition feels inevitable, not rushed.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Prep Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Choose the next track that fits the current energy, BPM, and key',
                  'Check that beat 1 is correct after analysis — fix it if off',
                  'Set a hot cue at the phrase you want to mix in (usually 8 or 16 bars)',
                  'Match key (same Camelot or ±1 step)',
                  'Match BPM (within ~4–6 BPM, or meet in the middle if needed)',
                  "Pull the incoming track's LOW EQ down",
                  'Keep the fader down and filter neutral',
                  'Cue in headphones and count the phrasing'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-medium">If prep is done right,</span> the mix feels easy.<br />
                <span className="text-muted-foreground">If prep is sloppy, you'll feel rushed and start forcing things.</span>
              </p>
            </div>
          </div>

          {/* Term Explanations for Prep */}
          <div className="space-y-2">
            <TermInfoBox term="BPM">
              <p><strong>Beats Per Minute</strong> — the tempo or speed of a track. A track at 128 BPM has 128 beats in one minute. Matching BPM between tracks keeps them in sync so they don't drift apart.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Camelot Key">
              <p><strong>Camelot Wheel</strong> is a color-coded system that simplifies harmonic mixing. Each key gets a number (1-12) and letter (A for minor, B for major).</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>Same key</strong> (e.g., 8A → 8A) = perfect harmonic match</li>
                <li><strong>±1 step</strong> (e.g., 8A → 7A or 9A) = smooth energy shift</li>
                <li><strong>A ↔ B same number</strong> (e.g., 8A → 8B) = minor to major mood shift</li>
              </ul>
            </TermInfoBox>
            
            <TermInfoBox term="Beat 1 / Beatgrid">
              <p>DJ software analyzes tracks to create a <strong>beatgrid</strong> — markers showing where each beat falls. <strong>Beat 1</strong> is the first beat of the bar (the downbeat, usually a kick drum). If the software misplaces beat 1, your tracks will seem synced but feel "off" rhythmically.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Hot Cue">
              <p>A <strong>hot cue</strong> is a saved position in a track that you can instantly jump to by pressing a button. DJs set hot cues at key moments (intro, drop, breakdown) so they can start playback at the perfect spot without scrolling.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Phrase">
              <p>EDM tracks are built in <strong>phrases</strong> — groups of bars (usually 8, 16, or 32 bars). Changes like drops, breakdowns, and new elements almost always happen at phrase boundaries. Mixing "on phrase" means starting and ending transitions at these natural boundaries for seamless blends.</p>
            </TermInfoBox>
            
            <TermInfoBox term="EQ (LOW/MID/HIGH)">
              <p>Your mixer has <strong>EQ knobs</strong> that control frequency bands:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>LOW</strong> = bass frequencies (kick drums, sub-bass)</li>
                <li><strong>MID</strong> = vocals, synths, main melody</li>
                <li><strong>HIGH</strong> = hi-hats, cymbals, brightness</li>
              </ul>
              <p className="mt-2">The golden rule: <strong>never have two basses at once</strong> — it sounds muddy. Cut the LOW on one track during transitions.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Fader">
              <p>The <strong>channel fader</strong> controls the volume of a track (up = loud, down = silent). The <strong>crossfader</strong> blends between two channels. Most DJs keep the crossfader centered and use channel faders for volume control during transitions.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Filter">
              <p>A <strong>filter</strong> removes frequencies from a sound:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>High-pass (filter up)</strong> = removes bass, leaves highs (sounds thin/airy)</li>
                <li><strong>Low-pass (filter down)</strong> = removes highs, leaves bass (sounds muffled)</li>
              </ul>
              <p className="mt-2">"Filter neutral" or "center" means no filtering — full sound.</p>
            </TermInfoBox>
          </div>
        </section>

        {/* Section 2: Playing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">2. Playing</h2>
              <p className="text-sm text-muted-foreground">The part the crowd hears — should feel almost boring to you</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-secondary/20 space-y-4">
            <p className="text-muted-foreground">
              Your job while playing: <span className="text-foreground font-medium">Enter on a phrase. Let the music do the work. Make one clear decision at a time.</span>
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                Playing Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Start the incoming track on the phrase (count 8 or 16)',
                  'Bring the fader up smoothly over 4–8 bars',
                  'Keep only one bass active at a time',
                  'Listen for the moment where the new track should take over',
                  'Swap bass at the phrase boundary',
                  'Fade or filter out the old track',
                  'During the next build, return the new track to its original BPM'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
              <h4 className="font-medium text-foreground text-sm mb-2">If something goes wrong:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cut the outgoing bass</li>
                <li>• Filter or loop briefly</li>
                <li>• Commit to the new track cleanly</li>
              </ul>
            </div>
          </div>

          {/* Term Explanations for Playing */}
          <div className="space-y-2">
            <TermInfoBox term="Bass Swap">
              <p>The moment during a transition where you <strong>cut the bass on the outgoing track</strong> and <strong>bring in the bass on the incoming track</strong>. Done at a phrase boundary, this creates a clean handoff. Never have both basses playing — it sounds muddy and unprofessional.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Bars">
              <p>A <strong>bar</strong> (or measure) is a unit of musical time. In 4/4 time (standard for EDM), one bar = 4 beats. So "4-8 bars" means 16-32 beats. At 128 BPM, 8 bars ≈ 15 seconds.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Build">
              <p>The <strong>build</strong> (or buildup) is the section before a drop where energy rises — drums intensify, risers sweep up, tension increases. This is often where you restore the incoming track's original BPM if you adjusted it during the transition.</p>
            </TermInfoBox>
            
            <TermInfoBox term="Loop">
              <p>A <strong>loop</strong> repeats a section of a track indefinitely. DJs use loops to extend a section (like a breakdown) while preparing the next track, or as an emergency technique to buy time if something goes wrong.</p>
            </TermInfoBox>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="glass-card rounded-xl p-5 border border-destructive/30 bg-destructive/5 space-y-3">
          <h3 className="font-semibold text-foreground">⚠️ Most Beginner Mistakes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Mixing off-phrase</strong> — transitions that don't align with phrase boundaries sound jarring</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Bass on bass</strong> — two basslines at once = muddy, boomy mess</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              <span><strong>Forcing it</strong> — rushing a transition because prep wasn't finished</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Explore Genre Checklists
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Intro101;

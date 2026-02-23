import { TrackSection } from '@/components/TrackFlowTimeline';

export interface Genre {
  id: string;
  name: string;
  icon: string;
  bpmRange: { min: number; max: number };
  keyTips: {
    basic: string[];
    advanced: string[];
  };
  bpmTips: {
    basic: string[];
    advanced: string[];
  };
  beatgridSteps: string[];
  phraseTips: string[];
  waveformTips: string[];
  transitionChecklist: string[];
  emergencyOut: {
    basic: string[];
    advanced: string[];
  };
  watchouts: string[];
  trackFlow?: TrackSection[];
}

export const genres: Genre[] = [
  {
    id: "house",
    name: "House",
    icon: "HSE",
    bpmRange: { min: 120, max: 130 },
    keyTips: {
      basic: [
        "Mix tracks in the same Camelot key (e.g., 8A to 8A)",
        "Move +1 or -1 on the Camelot wheel for energy shifts",
        "Avoid clashing keys (more than 1 step apart)"
      ],
      advanced: [
        "+/-2 Camelot steps can work during breakdowns",
        "Energy boost: move from minor (A) to major (B) same number",
        "Harmonic mixing creates smooth, professional blends"
      ]
    },
    bpmTips: {
      basic: [
        "Stay within 4-6 BPM of current track",
        "If further apart, adjust outgoing UP and incoming DOWN",
        "Meet in the middle, then restore after transition"
      ],
      advanced: [
        "Use breakdown sections for larger BPM jumps (8-10 BPM)",
        "Gradually restore tempo during the build section",
        "Master tempo vs keylock: know when to use each"
      ]
    },
    beatgridSteps: [
      "Analyze the track in your DJ software",
      "Check that beat 1 aligns with the first kick drum",
      "If off, enter beatgrid edit mode",
      "Set the first beat marker on the actual downbeat",
      "Verify by playing - the grid should lock to kicks",
      "Save the beatgrid analysis"
    ],
    phraseTips: [
      "House uses 8, 16, and 32-bar phrases",
      "Count kicks: 1-2-3-4 repeating = 1 bar",
      "Count to 8 or 16 to find phrase boundaries",
      "Mix IN at the start of a phrase",
      "Mix OUT as the outgoing track's phrase ends",
      "Drops typically land on beat 1 of a new 32-bar section"
    ],
    waveformTips: [
      "Breakdown: lower, thinner waveform section",
      "Build: gradually rising energy, denser pattern",
      "Drop: sudden thick/loud waveform after build",
      "Look for visual 'walls' indicating major transitions",
      "Cymbal rolls show as fuzzy tops before drops"
    ],
    transitionChecklist: [
      "Set incoming track fader DOWN",
      "Center the filter (12 o'clock)",
      "Turn LOW EQ down on incoming track",
      "Set hot cue at a phrase start point",
      "Cue incoming track in headphones",
      "Start incoming on a phrase boundary",
      "Raise fader gradually over 4-8 bars",
      "Bass swap: drop outgoing lows, raise incoming lows",
      "Only ONE track's bass playing at a time",
      "Complete transition by phrase end"
    ],
    emergencyOut: {
      basic: [
        "Kill the LOW EQ on the outgoing track immediately",
        "If needed, set a 1-beat loop on outgoing",
        "Push filter UP (high-pass) on outgoing",
        "Quick fader down on the next beat 1",
        "Bring incoming track fully in at next phrase"
      ],
      advanced: [
        "Echo out: enable delay/echo effect before cutting",
        "Use a quick 1/2 beat backspin for drama",
        "Filter sweep + reverb tail for smooth emergency exit"
      ]
    },
    watchouts: [
      "Mixing off-phrase creates jarring transitions",
      "Bass-on-bass = muddy, unprofessional sound",
      "Key clashes are obvious - check Camelot!",
      "Drifting beatgrid = train wreck incoming",
      "SYNC without grid check = false confidence",
      "Redlining meters = distortion city",
      "BPM jumps over 8 are noticeable to dancers"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Build 1', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown', bars: 32, type: 'breakdown' },
      { name: 'Build 2', bars: 16, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "tech-house",
    name: "Tech House",
    icon: "TCH",
    bpmRange: { min: 124, max: 130 },
    keyTips: {
      basic: [
        "Same key or +/-1 Camelot step works great",
        "Tech house is more forgiving with percussive tracks",
        "Focus on groove compatibility over strict harmony"
      ],
      advanced: [
        "Use +/-2 during stripped-back percussion sections",
        "Key becomes less critical with minimal melodic content",
        "Layer vocals carefully - they expose key clashes"
      ]
    },
    bpmTips: {
      basic: [
        "Tight range makes BPM matching easy",
        "4-5 BPM variance is standard",
        "Groove matters more than exact BPM"
      ],
      advanced: [
        "Push up to 132 for peak energy moments",
        "Use loop tricks during BPM transitions",
        "Gradual 1 BPM increments build energy subtly"
      ]
    },
    beatgridSteps: [
      "Analyze and verify the main kick pattern",
      "Tech house often has shuffled/swung kicks",
      "Set beat 1 on the first prominent kick",
      "Watch for off-beat hi-hats that can confuse",
      "Double-check grid during breakdowns",
      "Save corrected beatgrid"
    ],
    phraseTips: [
      "16 and 32-bar phrases dominate",
      "Percussion builds telegraph phrase changes",
      "Mix during groove sections for seamless blends",
      "Count hi-hats: 8 = 1 bar (1-and-2-and-3-and-4-and)",
      "Drops are less dramatic - focus on groove"
    ],
    waveformTips: [
      "Consistent density throughout groove sections",
      "Breakdowns show as thinner but not silent",
      "Look for hi-hat pattern changes",
      "Vocal chops appear as spikes in waveform",
      "Less dramatic drop contrast than other genres"
    ],
    transitionChecklist: [
      "Fader down, filter centered on incoming",
      "LOW and possibly MID EQ reduced",
      "Find a groovy 16-bar loop point",
      "Cue and beatmatch in headphones",
      "Start on phrase, let grooves layer",
      "Gradual fader raise over 8-16 bars",
      "Swap bass frequencies smoothly",
      "Let both grooves interlock before full swap"
    ],
    emergencyOut: {
      basic: [
        "Cut lows immediately",
        "High-pass filter sweep up",
        "Quick fade on a snare hit or downbeat"
      ],
      advanced: [
        "Loop a percussion-only section while exiting",
        "Use reverb to tail out gracefully"
      ]
    },
    watchouts: [
      "Clashing hi-hat patterns = messy mix",
      "Bass frequencies need clean separation",
      "Off-grid tracks wreck the groove immediately",
      "Don't rush - tech house is about the journey",
      "Avoid obvious vocal overlaps"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Groove 1', bars: 32, type: 'groove' },
      { name: 'Breakdown', bars: 16, type: 'breakdown' },
      { name: 'Groove 2', bars: 32, type: 'groove' },
      { name: 'Build', bars: 8, type: 'build' },
      { name: 'Drop', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "progressive",
    name: "Progressive House",
    icon: "PRG",
    bpmRange: { min: 126, max: 132 },
    keyTips: {
      basic: [
        "Key is CRITICAL - melodic content is prominent",
        "Stick to same key or +/-1 Camelot",
        "Listen for chord progressions and pad clashes"
      ],
      advanced: [
        "+/-2 works only during percussion-only sections",
        "Relative major/minor shifts add emotional depth",
        "Pre-plan key journeys for your set"
      ]
    },
    bpmTips: {
      basic: [
        "Narrow BPM range - stay within 4 BPM",
        "Long builds allow subtle tempo adjustments",
        "Match during breakdown for cleanest blend"
      ],
      advanced: [
        "Use the long breakdowns for bigger BPM shifts",
        "Energy arc: start lower BPM, peak higher",
        "2-hour sets can cover 126-132 journey"
      ]
    },
    beatgridSteps: [
      "Analyze the track fully",
      "Find the first prominent kick in the intro",
      "Set beat marker precisely on the transient",
      "Progressive tracks often have long intros - verify throughout",
      "Check grid holds during melodic sections",
      "Save corrected analysis"
    ],
    phraseTips: [
      "32 and 64-bar phrases are standard",
      "Breakdowns can be 32-64 bars long",
      "Mix during breakdowns for seamless blends",
      "Count bars during build: builds are typically 16-32 bars",
      "Major transitions happen every 64 bars"
    ],
    waveformTips: [
      "Clear verse/breakdown/build/drop structure",
      "Breakdowns are obviously thin sections",
      "Builds show gradual density increase",
      "Drops are dramatic thick walls",
      "Look for melodic 'stabs' in waveform"
    ],
    transitionChecklist: [
      "Plan transitions during breakdown sections",
      "Fader down, filter center, LOW+MID reduced",
      "Hot cue at breakdown start of incoming",
      "Blend melodies carefully in headphones first",
      "Start incoming at phrase boundary",
      "Long blend over 16-32 bars during breakdowns",
      "Gradual EQ swap, bass last",
      "Complete before the incoming drop"
    ],
    emergencyOut: {
      basic: [
        "Use the breakdown as emergency cover",
        "Filter up the outgoing completely",
        "Fade during a pad swell if possible"
      ],
      advanced: [
        "Layer incoming pad over outgoing to mask exit",
        "Echo/reverb the outgoing into infinity"
      ]
    },
    watchouts: [
      "Melodic clashes are very obvious",
      "Long tracks = must plan ahead",
      "Dropping out of key ruins the vibe",
      "Don't mix drops into drops",
      "Energy flow is everything - no jarring jumps"
    ],
    trackFlow: [
      { name: 'Intro', bars: 32, type: 'intro' },
      { name: 'Melodic Build', bars: 32, type: 'build' },
      { name: 'Breakdown 1', bars: 32, type: 'breakdown' },
      { name: 'Build 1', bars: 32, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown 2', bars: 64, type: 'breakdown' },
      { name: 'Build 2', bars: 32, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 32, type: 'outro' }
    ]
  },
  {
    id: "trance",
    name: "Trance",
    icon: "TRN",
    bpmRange: { min: 136, max: 145 },
    keyTips: {
      basic: [
        "Harmonic mixing is essential for trance",
        "Same key creates euphoric buildups",
        "+/-1 Camelot for energy shifts up/down"
      ],
      advanced: [
        "Key lifts (+1 semitone) are a classic trance trick",
        "Build tension with minor, release with major",
        "Arpeggio conflicts are very noticeable"
      ]
    },
    bpmTips: {
      basic: [
        "Stay within 4-5 BPM during blends",
        "Faster BPM = less margin for error",
        "Use breakdowns for BPM adjustments"
      ],
      advanced: [
        "138 is the classic trance sweet spot",
        "Uplifting sets can push to 142+",
        "Tech-trance sits lower around 136-138"
      ]
    },
    beatgridSteps: [
      "Analyze the track and verify kick alignment",
      "Trance kicks are prominent - easy to grid",
      "Set beat 1 on the opening kick",
      "Verify during the breakdown (kicks may drop)",
      "Check that builds align perfectly",
      "Save the corrected beatgrid"
    ],
    phraseTips: [
      "32-bar phrases are the standard unit",
      "Breakdowns: 32-64 bars common",
      "Count during builds: 8-16-24-32... DROP!",
      "Mix during long breakdowns for best results",
      "Anthem drops must hit perfectly on phrase"
    ],
    waveformTips: [
      "Very clear structure visible in waveform",
      "Long thin breakdowns are obvious",
      "Rising builds with characteristic sawtooth pattern",
      "Massive drops = thick dense walls",
      "Cymbal rolls visible as fuzzy sections before drop"
    ],
    transitionChecklist: [
      "Prep incoming: fader down, EQs neutral/reduced",
      "Hot cue the breakdown or intro",
      "Cue in headphones and verify key compatibility",
      "Start incoming during outgoing breakdown",
      "Blend melodies - check for clashes!",
      "Long 16-32 bar blends work best",
      "EQ swap during the blend, bass last",
      "Time exit for outgoing drop to fade"
    ],
    emergencyOut: {
      basic: [
        "Kill bass and sweep filter up",
        "Use a 1-bar loop if track derails",
        "Cut at the drop moment for drama"
      ],
      advanced: [
        "Echo out creates the classic trance tail",
        "Reverb + high-pass = ethereal exit",
        "Reverse cymbal crash to mask cut"
      ]
    },
    watchouts: [
      "Key clashes destroy the euphoria",
      "Off-phrase mixing is immediately obvious",
      "Two arpeggios at once = chaos",
      "BPM drift at 140 BPM is very noticeable",
      "Don't cut anthems short - fans will notice!"
    ],
    trackFlow: [
      { name: 'Intro', bars: 32, type: 'intro' },
      { name: 'Melodic Verse', bars: 32, type: 'vocal' },
      { name: 'Breakdown 1', bars: 32, type: 'breakdown' },
      { name: 'Build 1', bars: 32, type: 'build' },
      { name: 'Drop/Anthem', bars: 32, type: 'drop' },
      { name: 'Breakdown 2', bars: 64, type: 'breakdown' },
      { name: 'Build 2', bars: 32, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 32, type: 'outro' }
    ]
  },
  {
    id: "dubstep",
    name: "Dubstep",
    icon: "DBS",
    bpmRange: { min: 140, max: 150 },
    keyTips: {
      basic: [
        "Melodic dubstep: key is critical",
        "Heavy dubstep: bass matters more than key",
        "Check during breakdowns and vocals"
      ],
      advanced: [
        "Aggressive dubstep is more forgiving harmonically",
        "Match bass frequencies more than actual keys",
        "Vocal tracks expose every key clash"
      ]
    },
    bpmTips: {
      basic: [
        "140 BPM is the classic dubstep tempo",
        "Half-time feel = count half as fast",
        "4-6 BPM range is comfortable"
      ],
      advanced: [
        "Brostep/riddim can push 145-150",
        "Can jump to 70/140/150 using half-time",
        "Tempo switches create energy spikes"
      ]
    },
    beatgridSteps: [
      "Analyze track - may need manual correction",
      "Half-time feel can confuse auto-analysis",
      "Set beat 1 on the first prominent snare/kick",
      "Verify during the drop section specifically",
      "Bass wobbles should align with beat markers",
      "Save corrected grid"
    ],
    phraseTips: [
      "16 and 32-bar phrases",
      "Half-time means count half: 1---2---3---4---",
      "Drops hit hard - time them perfectly",
      "Builds are typically 8-16 bars",
      "Second drops often differ from first"
    ],
    waveformTips: [
      "Drops are MASSIVE thick walls",
      "Breakdowns are thin/sparse sections",
      "Builds show risers and snare rolls",
      "Bass wobbles visible as rhythmic patterns",
      "Look for gaps between drop sections"
    ],
    transitionChecklist: [
      "Prep incoming: fader down, filter ready",
      "LOW EQ completely down for the swap",
      "Hot cue at the breakdown start",
      "Cue in headphones - feel the groove",
      "Start on a phrase boundary",
      "Quick blend during breakdown (8-16 bars)",
      "HARD bass swap - no overlap",
      "Time for incoming drop to hit clean"
    ],
    emergencyOut: {
      basic: [
        "Kill outgoing bass immediately",
        "High-pass filter slam",
        "Cut on a snare hit for drama"
      ],
      advanced: [
        "Use a backspin on the outgoing",
        "1-beat loop into filter sweep",
        "Bass wobble mask with reverb"
      ]
    },
    watchouts: [
      "Bass overlap = MUD and damage speakers",
      "Off-grid wobbles are painful",
      "Don't cut drops short - audiences wait for them",
      "Redlining is tempting but damaging",
      "Half-time feel requires different counting"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Vocal/Melodic', bars: 16, type: 'vocal' },
      { name: 'Build 1', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown', bars: 16, type: 'breakdown' },
      { name: 'Build 2', bars: 8, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 8, type: 'outro' }
    ]
  },
  {
    id: "trap",
    name: "Trap",
    icon: "TRP",
    bpmRange: { min: 140, max: 160 },
    keyTips: {
      basic: [
        "Trap is bass-heavy; frequency matching matters",
        "Horn/synth stabs should harmonize",
        "Vocals expose key mismatches"
      ],
      advanced: [
        "808s are often in key - match the root notes",
        "Half-time sections are more forgiving",
        "Build tension with dissonance, resolve on drops"
      ]
    },
    bpmTips: {
      basic: [
        "Wide BPM range requires planning",
        "Half-time (70-80 BPM feel) common",
        "Meet in the middle for big jumps"
      ],
      advanced: [
        "Jump 70→140 using tempo double perception",
        "Festival trap sits 145-155",
        "Hybrid tracks blur tempo boundaries"
      ]
    },
    beatgridSteps: [
      "Analyze - watch for half-time confusion",
      "Set beat 1 on the first hard kick/snare",
      "Verify the 808 pattern aligns with grid",
      "Hi-hat rolls should fall on expected subdivisions",
      "Check grid during the drop specifically",
      "Save corrected beatgrid"
    ],
    phraseTips: [
      "16-bar phrases typical",
      "Drops are often 8-16 bars each",
      "Count in half-time: 1---2---3---4---",
      "Horn builds signal phrase endings",
      "Second/third drops may vary"
    ],
    waveformTips: [
      "808s show as low-end thick sections",
      "Hi-hat rolls visible as dense upper patterns",
      "Drops have characteristic shapes",
      "Breakdowns are sparse",
      "Horns/synth stabs show as mid-range spikes"
    ],
    transitionChecklist: [
      "Prep incoming: fader down, lows down",
      "Filter center, ready to sweep",
      "Hot cue at intro or breakdown",
      "Cue in headphones",
      "Start on phrase boundary",
      "8-16 bar blend typical",
      "Clean 808 swap - never overlap",
      "Incoming drop should hit fresh"
    ],
    emergencyOut: {
      basic: [
        "Kill the 808 immediately (low EQ)",
        "Filter up fast",
        "Cut on a snare/horn hit"
      ],
      advanced: [
        "Airhorn/siren can mask rough exits",
        "Quick backspin on the cut",
        "Loop a horn stab while switching"
      ]
    },
    watchouts: [
      "808 overlap destroys low end",
      "Half-time counting is essential",
      "Key clashes are obvious on melodic trap",
      "Hi-hat patterns must not conflict",
      "Don't rush the builds"
    ],
    trackFlow: [
      { name: 'Intro', bars: 8, type: 'intro' },
      { name: 'Build 1', bars: 8, type: 'build' },
      { name: 'Drop 1', bars: 16, type: 'drop' },
      { name: 'Breakdown', bars: 8, type: 'breakdown' },
      { name: 'Build 2', bars: 8, type: 'build' },
      { name: 'Drop 2', bars: 16, type: 'drop' },
      { name: 'Drop 3', bars: 16, type: 'drop' },
      { name: 'Outro', bars: 8, type: 'outro' }
    ]
  },
  {
    id: "dnb",
    name: "Drum & Bass",
    icon: "DNB",
    bpmRange: { min: 170, max: 180 },
    keyTips: {
      basic: [
        "Liquid DnB: harmonic mixing is crucial",
        "Neurofunk/Jump-up: less critical, match bass",
        "+/-1 Camelot for smooth blends"
      ],
      advanced: [
        "Reese bass frequencies should complement",
        "Vocal tracks demand key accuracy",
        "Amen breaks are key-agnostic but watch layers"
      ]
    },
    bpmTips: {
      basic: [
        "174 BPM is the classic sweet spot",
        "High BPM = tiny margin for error",
        "Stay within 4 BPM for comfort"
      ],
      advanced: [
        "Rollers sit around 170-172",
        "Jump-up/Neurofunk can push 175-178",
        "Jungle throwbacks at 160-165"
      ]
    },
    beatgridSteps: [
      "Analyze and verify - complex breaks challenge auto-detect",
      "Find the first kick of the two-step pattern",
      "Set beat 1 there precisely",
      "DnB is two-step: kick-snare-kick-snare per bar",
      "Verify during busy break sections",
      "Save the corrected grid"
    ],
    phraseTips: [
      "16 and 32-bar phrases at high speed",
      "Count snares: every other snare = 1 bar",
      "Drops hit fast - prep early",
      "Breakdowns are short in neuro/jump-up",
      "Liquid gives you more mixing room"
    ],
    waveformTips: [
      "Fast transients = busy waveform",
      "Drops are dense with bass",
      "Breakdowns visible as thinner sections",
      "Amen breaks have characteristic patterns",
      "Sub-bass shows as thick low sections"
    ],
    transitionChecklist: [
      "Prep fast: fader down, EQs ready",
      "LOW down to avoid bass stack",
      "Hot cue at a 16-bar intro point",
      "Cue and beatmatch precisely",
      "Start on phrase, work fast",
      "4-8 bar blends work best",
      "Quick bass swap",
      "Complete transition before drop"
    ],
    emergencyOut: {
      basic: [
        "Kill bass instantly",
        "Filter slam up",
        "Cut on snare hit"
      ],
      advanced: [
        "Rewind/pull-back for drama",
        "Loop an amen section while exiting",
        "Delay throw for smooth tail"
      ]
    },
    watchouts: [
      "Speed leaves no room for mistakes",
      "Bass overlap is immediately audible",
      "Off-grid at 174 BPM = disaster",
      "Beatgrid MUST be perfect",
      "Quick transitions are expected"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Build', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown', bars: 16, type: 'breakdown' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "hardstyle",
    name: "Hardstyle",
    icon: "HRD",
    bpmRange: { min: 150, max: 160 },
    keyTips: {
      basic: [
        "Melody-heavy = harmonic mixing critical",
        "Same key or +/-1 Camelot",
        "Euphoric hardstyle especially sensitive"
      ],
      advanced: [
        "Rawstyle can be more forgiving",
        "Key lifts (+1 semitone) classic in anthems",
        "Reverse bass sections more flexible"
      ]
    },
    bpmTips: {
      basic: [
        "150 BPM is the classic tempo",
        "Stay within 4-5 BPM",
        "Use breakdowns for any adjustments"
      ],
      advanced: [
        "Euphoric sits 150-155",
        "Rawstyle can push 155-160",
        "Tempo matching is very precise"
      ]
    },
    beatgridSteps: [
      "Analyze the track",
      "Set beat 1 on the first reverse bass kick",
      "Verify during the main kick pattern",
      "Hardstyle kicks have long tails - grid to attack",
      "Check anti-climax sections stay aligned",
      "Save corrected grid"
    ],
    phraseTips: [
      "32-bar phrases standard",
      "Anti-climax: the main climax section",
      "Count the reverse bass: heavy on beat 1",
      "Breakdowns can be 32-64 bars",
      "Anthem drops must be timed perfectly"
    ],
    waveformTips: [
      "Massive reverse bass kicks visible",
      "Breakdowns are melodic, thinner",
      "Builds show rising intensity",
      "Drops are thick and punchy",
      "Look for the anti-climax section"
    ],
    transitionChecklist: [
      "Prep incoming track fully",
      "Fader down, filter center, LOW down",
      "Hot cue at breakdown or intro",
      "Cue in headphones carefully",
      "Start on phrase boundary",
      "Blend during melodic breakdown",
      "EQ swap before the kicks return",
      "One set of reverse bass at a time"
    ],
    emergencyOut: {
      basic: [
        "Kill the kick channel (LOW EQ)",
        "Filter up sharply",
        "Cut before the drop if needed"
      ],
      advanced: [
        "Use the breakdown as natural exit",
        "Echo out the melody",
        "Crowd engagement during transitions"
      ]
    },
    watchouts: [
      "Melodic clashes ruin euphoric moments",
      "Reverse bass overlap = massive mud",
      "Anthem timings are sacred to fans",
      "Off-phrase kills the energy",
      "BPM must be precise at this tempo"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Melodic Verse', bars: 32, type: 'vocal' },
      { name: 'Anti-Climax', bars: 32, type: 'breakdown' },
      { name: 'Build 1', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Mid-Section', bars: 32, type: 'breakdown' },
      { name: 'Build 2', bars: 16, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "hybrid",
    name: "Hybrid EDM",
    icon: "HBR",
    bpmRange: { min: 128, max: 150 },
    keyTips: {
      basic: [
        "Check key at each genre transition",
        "Festival/big room: key less critical during drops",
        "Melodic sections need harmonic care"
      ],
      advanced: [
        "Genre-blend tracks often modulate keys",
        "Match bass frequencies across styles",
        "Use breakdowns to reset harmonic context"
      ]
    },
    bpmTips: {
      basic: [
        "Wide range requires planning",
        "Meet in the middle for big jumps",
        "Use builds/breakdowns for tempo shifts"
      ],
      advanced: [
        "Tempo switch is part of the energy arc",
        "Big room 128 → Bass house 126 easy",
        "Trap 150 → DnB 174 needs half-time tricks"
      ]
    },
    beatgridSteps: [
      "Analyze each track carefully",
      "Hybrid tracks may have tempo changes",
      "Set beat 1 on primary drop kick",
      "Verify grid through different sections",
      "Some hybrid tracks need multiple markers",
      "Save and test the grid"
    ],
    phraseTips: [
      "Study each track's structure",
      "Festival tracks often have clear 32-bar sections",
      "Breaks and drops alternate predictably",
      "Know your tracks inside and out",
      "Phrase timing varies by sub-genre"
    ],
    waveformTips: [
      "Look for genre-shift moments",
      "Drops vary in intensity and style",
      "Breakdowns signal transition opportunities",
      "Multiple climaxes common in festival tracks",
      "Energy ebbs and flows visibly"
    ],
    transitionChecklist: [
      "Know both tracks' structures",
      "Prep incoming: fader, filter, EQs",
      "Match energy levels at transition point",
      "Cue carefully - genre shifts tricky",
      "Start at logical phrase boundary",
      "Blend length depends on compatible sections",
      "Clean bass swap regardless of genre",
      "Energy should flow naturally"
    ],
    emergencyOut: {
      basic: [
        "Kill bass immediately",
        "Filter sweep up",
        "Cut at any phrase end"
      ],
      advanced: [
        "Use FX to mask genre jumps",
        "Loop a transitional element",
        "Build energy bridges between styles"
      ]
    },
    watchouts: [
      "Genre clashes can confuse the floor",
      "Energy arc matters more than genre purity",
      "BPM jumps need musical justification",
      "Know your audience's expectations",
      "Prep time is essential with varied sets"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Build 1', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown', bars: 32, type: 'breakdown' },
      { name: 'Build 2', bars: 16, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "melodic-bass",
    name: "Melodic Bass",
    icon: "MLB",
    bpmRange: { min: 140, max: 160 },
    keyTips: {
      basic: [
        "Harmonic mixing is ESSENTIAL - melodies are central",
        "Same key or +/-1 Camelot for smooth blends",
        "Minor keys dominate - match the emotional arc"
      ],
      advanced: [
        "+/-2 Camelot during bass-only sections",
        "Key lifts (+1 semitone) create euphoric moments",
        "Layer pads carefully - check harmonic stacking"
      ]
    },
    bpmTips: {
      basic: [
        "Wide range: know your track tempos",
        "Stay within 4-6 BPM for blends",
        "Use long breakdowns for larger BPM shifts"
      ],
      advanced: [
        "150 BPM is the sweet spot for most melodic bass",
        "Can transition to/from future bass (140) smoothly",
        "Half-time sections allow tempo perception changes"
      ]
    },
    beatgridSteps: [
      "Analyze track fully",
      "Beat 1 should align with the first kick",
      "Melodic bass often has complex arrangements",
      "Verify grid during both melodic and bass sections",
      "Check for tempo changes in hybrid tracks",
      "Save corrected beatgrid"
    ],
    phraseTips: [
      "16 and 32-bar phrases are standard",
      "Breakdowns can be long (32-64 bars)",
      "Builds are emotional and telegraphed",
      "Drops typically 32 bars with variations",
      "Second drops often have different bass design"
    ],
    waveformTips: [
      "Breakdowns show melodic pads and vocals",
      "Builds rise gradually with synths and drums",
      "Drops are thick but have melodic movement",
      "Look for bass wobble patterns in drop sections",
      "Outro often mirrors intro with decay"
    ],
    transitionChecklist: [
      "Prep incoming: fader down, EQs ready",
      "LOW completely down for incoming",
      "Hot cue at breakdown or intro",
      "Cue in headphones - check melody compatibility",
      "Start during outgoing breakdown",
      "Blend melodies over 16-32 bars",
      "Clean bass swap - one bass at a time",
      "Exit before incoming drop for maximum impact"
    ],
    emergencyOut: {
      basic: [
        "Kill bass on outgoing immediately",
        "Filter sweep up quickly",
        "Fade during a melodic swell"
      ],
      advanced: [
        "Echo/reverb the melodic elements out",
        "Use incoming pad to mask the exit",
        "Breakdown provides natural cover"
      ]
    },
    watchouts: [
      "Melody clashes are immediately obvious",
      "Emotional arc matters - don't kill the vibe",
      "Bass overlap destroys the low end",
      "Long tracks require planning ahead",
      "Vocal timing must be considered"
    ],
    trackFlow: [
      { name: 'Intro', bars: 16, type: 'intro' },
      { name: 'Vocal/Melodic', bars: 16, type: 'vocal' },
      { name: 'Build 1', bars: 16, type: 'build' },
      { name: 'Drop 1', bars: 32, type: 'drop' },
      { name: 'Breakdown', bars: 32, type: 'breakdown' },
      { name: 'Build 2', bars: 16, type: 'build' },
      { name: 'Drop 2', bars: 32, type: 'drop' },
      { name: 'Outro', bars: 16, type: 'outro' }
    ]
  },
  {
    id: "ecstatic-dance",
    name: "Ecstatic Dance",
    icon: "ECD",
    bpmRange: { min: 90, max: 130 },
    keyTips: {
      basic: [
        "Organic, flowing transitions - key less strict",
        "World music elements may not follow Western scales",
        "Feel the frequency match over strict Camelot"
      ],
      advanced: [
        "Modal mixing (Dorian, Mixolydian) common",
        "Drone-based tracks are key-flexible",
        "Vocals and chants need harmonic awareness"
      ]
    },
    bpmTips: {
      basic: [
        "Wide BPM range - journey from slow to peak",
        "Gradual tempo shifts over many tracks",
        "Meet in the middle for larger jumps"
      ],
      advanced: [
        "Opening wave: 90-100 BPM grounding",
        "Peak energy: 120-130 BPM",
        "Cool down: 100-90 BPM organic descent"
      ]
    },
    beatgridSteps: [
      "Analyze track - organic rhythms may need manual work",
      "World percussion doesn't always grid perfectly",
      "Set beat 1 on the first clear downbeat",
      "Ecstatic tracks may have tempo drift - that's OK",
      "Focus on feel over perfect grid",
      "Some tracks work better with SYNC off"
    ],
    phraseTips: [
      "Phrases are more fluid - feel the cycles",
      "8-bar cycles common but not rigid",
      "Drum circles build organically",
      "Transitions happen when energy aligns",
      "Let tracks breathe - no rush"
    ],
    waveformTips: [
      "Less dramatic structure than EDM",
      "Energy ebbs and flows organically",
      "Percussion patterns visible as rhythmic texture",
      "Breakdowns may just be lower energy, not silent",
      "Look for natural transition points"
    ],
    transitionChecklist: [
      "Prep incoming: fader down, EQs neutral",
      "May not need LOW cut - depends on bass content",
      "Find a groovy loop point in incoming",
      "Cue in headphones - feel the groove compatibility",
      "Start when the vibe feels right",
      "Long, gradual blends work well (16-32+ bars)",
      "Let rhythms interlock naturally",
      "Energy should flow, not jump"
    ],
    emergencyOut: {
      basic: [
        "Reduce bass gently",
        "Let the track fade naturally",
        "Filter slowly - no abrupt changes"
      ],
      advanced: [
        "Use ambient/drone to bridge tracks",
        "Percussion-only sections for transitions",
        "Layer nature sounds or pads to smooth exits"
      ]
    },
    watchouts: [
      "Jarring transitions break the trance state",
      "Respect the journey - slow build is intentional",
      "Don't over-EQ - organic sound is the goal",
      "Read the room's energy, not the BPM counter",
      "Silence and space are valid transitions"
    ],
    trackFlow: [
      { name: 'Intro/Grounding', bars: 32, type: 'intro' },
      { name: 'Groove 1', bars: 32, type: 'groove' },
      { name: 'Build', bars: 16, type: 'build' },
      { name: 'Peak Energy', bars: 32, type: 'drop' },
      { name: 'Groove 2', bars: 32, type: 'groove' },
      { name: 'Breakdown', bars: 16, type: 'breakdown' },
      { name: 'Vocal/Chant', bars: 16, type: 'vocal' },
      { name: 'Outro/Fade', bars: 32, type: 'outro' }
    ]
  }
];

# LearnToDJ (DJ Flow Guide)

Live app: https://learntodj.lovable.app/

A lightweight, genre-based **EDM mixing checklist** app. The goal is dead simple: help you run the same repeatable mixing workflow every time (prep → phrase-aligned transition → clean exit), without drowning you in DJ forum lore.

## What this is
- Pick a genre (House, Trance, Dubstep, DnB, etc.)
- Get a **practical checklist** for mixing that genre:
  - BPM range guidance
  - Camelot key compatibility rules
  - Beat-1 / beatgrid sanity check
  - Phrase counting (8/16/32 bars)
  - Mix-in / mix-out timing
  - Quick “get out of trouble” transitions
  - Common watchouts (bass-on-bass, off-phrase, key clash)

This is intentionally **not** an FX tutorial or a “become a pro in 7 days” thing.

## Core mixing mental model
Mixing is two phases on repeat:

1. **Prep**
   - Choose the next track (energy, BPM, key)
   - Verify beat 1 / grid
   - Set a hot cue at a phrase boundary (8/16 bars)
   - Prep EQ (incoming LOW down), fader down, filter neutral
   - Cue in headphones and count phrasing

2. **Playing**
   - Start incoming track on the phrase
   - Blend in over 4–8 bars
   - Bass swap on a phrase boundary
   - Exit outgoing track cleanly
   - If BPM bridging: “meet in the middle,” then restore track to original BPM during the build

## Key rules (the ones that matter)
- **Camelot key mixing:** same key or **±1 step** is the safe default (e.g., 8A → 9A or 7A).
- **BPM matching:** stay within **~4–6 BPM** for natural blends inside a groove.
- **If BPMs are far apart:** meet in the middle (outgoing slightly up, incoming slightly down), then return the incoming track to its original BPM during the build.
- **Phrase alignment:** most EDM changes happen in **8/16/32 bar blocks**. If you miss the phrase, wait for the next one (forcing it sounds worse than waiting).

## Features
- Genre picker (EDM-focused)
- Checklist per genre (with checkboxes)
- “Simplified” vs “Advanced tips” toggle (optional)
- Watchouts section to prevent the most common mistakes
- Favorites (star a genre) and persistence via local storage (if enabled)

## Tech notes
This project was created with Lovable and is intended to stay simple:
- Static genre data (JSON / in-code constants)
- No auth
- No backend required

If the codebase uses a standard modern web stack (common in Lovable builds), local development will look like the commands below.

## Local development
> If you cloned the repo locally:

```bash
npm install
npm run dev

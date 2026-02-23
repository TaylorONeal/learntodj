# LearnToDJ — Project Context for Claude

## Stack
React 18 + Vite 5 + TypeScript · Tailwind CSS v3 · shadcn/ui · React Router · framer-motion · PWA (vite-plugin-pwa)

## Dev
```bash
npm run dev      # http://localhost:8080
npm run build    # production build
npm run lint
```

---

## CRT Terminal Design System

Every visual decision should feel like an 80s government workstation — rendered with modern precision.

### Core Principles
- Monospace everything — JetBrains Mono, all text
- Dark backgrounds + colored glow — never white or light UI
- Subtle motion — scanlines, pulsing borders, fading text
- Information hierarchy through color temperature — accent = important, muted = body, warning = alert
- CRT texture — scanline overlay on every terminal panel

### Color Tokens
```
--terminal-bg:       #061116   /* primary panel background */
--terminal-bg-alt:   #0f0907   /* alternate / warm mode */
--page-bg:           #0a0a0c   /* full-page background */

--text-primary:      #d8efe9
--text-muted:        #99ffe0
--text-teal:         #7effdb   /* accent / sub-headings */
--text-gold:         #ffd60a   /* important labels, headings */
--text-warn:         #ff8080
--text-warn-bright:  #ff6060
--text-highlight:    #ffeaa0

--warn-bg:           #2a0b0b
--warn-text:         #ffb3b3
--critical-bg:       #2a0000
--critical-text:     #ff6060

--border-teal:       rgba(127, 255, 212, 0.30)
--border-gold:       rgba(255, 214, 10, 0.40)
--border-red:        rgba(255, 63, 63, 0.40)
--border-subtle:     rgba(255, 255, 255, 0.10)

--glow-primary:      0 0 90px rgba(0,255,184,0.12)
--glow-alt:          0 0 100px rgba(255,64,64,0.18)
```

### Reusable Components

**`<Scanlines />`** — always first child of any terminal panel
**`<TerminalChrome label="..." />`** — macOS-style chrome bar after overlays

### Card Shell Pattern
```tsx
<div className="relative rounded-xl border overflow-hidden"
  style={{
    borderColor: 'rgba(127,255,212,0.30)',
    background: 'radial-gradient(circle at top, rgba(0,255,184,0.14), transparent 50%), radial-gradient(circle at bottom right, rgba(44,113,255,0.12), transparent 60%), #061116',
    boxShadow: '0 0 90px rgba(0,255,184,0.12), inset 0 0 70px rgba(114,209,255,0.07)',
  }}
>
  <Scanlines />
  <GrainOverlay />   {/* pointer-events-none opacity-30 radial-gradient dots */}
  <TerminalChrome label="section — label" />
  <div className="p-5 font-mono">{/* content */}</div>
</div>
```

### Warning Banner (framer-motion)
```tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {warningActive && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.25, 0.9, 0.25] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, repeat: Infinity }}
      className="px-4 py-2 border-b border-red-500/40 bg-[#2a0b0b] text-[#ffb3b3] text-[11px] font-mono uppercase tracking-[0.2em] text-center"
    >
      WARNING // System Alert
    </motion.div>
  )}
</AnimatePresence>
```

### Critical Banner (framer-motion)
```tsx
<motion.section className="relative border-2 border-red-500/70 rounded-lg overflow-hidden">
  <motion.div
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 0.55, repeat: Infinity }}
    className="bg-[#2a0000] px-4 py-2 text-center text-red-400 font-mono text-[11px] uppercase tracking-[0.28em] border-b border-red-500/50"
  >
    ⚠ WATCHOUTS — AVOID THESE MISTAKES ⚠
  </motion.div>
  <motion.div
    animate={{ opacity: [0, 0.6, 0] }}
    transition={{ duration: 0.55, repeat: Infinity }}
    className="absolute inset-0 border-4 border-red-500 pointer-events-none rounded-lg"
  />
  <div className="p-4 bg-[#150505]">{/* items */}</div>
</motion.section>
```

### Typography Scale
| Element | Classes |
|---|---|
| Page classified bar | `text-[10px] font-mono uppercase tracking-[0.35em]` |
| Terminal chrome label | `text-[10px] font-mono uppercase tracking-widest` |
| Section heading | `text-lg font-bold font-mono uppercase tracking-wide` (gold) |
| Card sub-header | `text-[10px] uppercase tracking-[0.2em] font-mono` |
| Body | `text-sm font-mono` |
| Alert label | `text-[11px] uppercase tracking-[0.22em] font-mono` |

### Quick-Start Checklist
- [ ] Page background `#0a0a0c`
- [ ] Fixed grid overlay (`pointer-events-none z-0`)
- [ ] Card shell: `relative overflow-hidden border` + glow shadow
- [ ] `<Scanlines />` as first child
- [ ] Grain overlay after scanlines
- [ ] `<TerminalChrome />` after overlays
- [ ] All text: `font-mono`
- [ ] Buttons: ghost/bordered only — no filled backgrounds
- [ ] All decorative overlays: `pointer-events-none`
- [ ] No flash faster than 0.5s (accessibility)

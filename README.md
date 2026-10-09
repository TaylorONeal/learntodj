# LearnToDJ

A mobile-friendly DJ learning app built with React, TypeScript, Vite, Tailwind, and Capacitor. Use short mixing challenges to learn the concepts, then apply them with genre-specific checklists.

## Features

- Three-question practice rounds with immediate explanations, saved progress, and concept recall XP.
- Genre guides for BPM, harmonic mixing, beatgrids, phrasing, transitions, and recovery.
- Persistent checklist state, favorites, and basic/advanced guidance.
- Installable offline web app and native Android/iOS source projects.
- No account or backend required.

## Development

Node 22+ and npm are the supported toolchain. Use the committed `package-lock.json` with npm.

```sh
npm ci
npm run dev
npm run check
npx playwright install chromium webkit
npm run test:e2e
```

`npm run check` runs TypeScript, ESLint, unit tests, and the production PWA build. `npm run build:native` creates bundled assets without a service worker.

```sh
npm run android:sync
npm run android:open
npm run ios:sync
npm run ios:open
```

Native builds need Android Studio/SDK/JDK or Xcode respectively. Store signing, publisher identity, store screenshots, and real-device testing are still required; this is not a published store release.

For provider-neutral hosting and local artwork generation, see [independent hosting](docs/independent-hosting.md).

See the [documentation index](docs/INDEX.md), [mobile release checklist](docs/mobile-release.md), and [UX/testing notes](docs/ux-and-testing.md).

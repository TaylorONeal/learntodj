# UX and functional verification

## Learning loop

The home page highlights a two-minute practice challenge before reference guides. A round contains three questions from nine mixing concepts. Answers show explanations immediately; a wrong answer costs no lives and ends no session. The next round prioritizes concepts not yet mastered and rotates the remaining questions.

Each concept earns 20 XP once, on its first correct answer. Maximum XP is 180; repeated answers do not inflate it. Round count increases only after all three answers. This is a knowledge check, not a certification of practical DJ skill. Users can stop at any point and return to their saved unfinished round.

Progress uses `learntodj-practice-v1` in local storage. Saved values are validated before use. A write failure leaves practice working and displays a notice. Legacy genre favorites, advanced mode, and checklist keys remain intact. Checklist percentages count only visible items, including when advanced tips are hidden.

## Mobile and accessibility

The interface retains its dark teal/gold identity with a clearer home hierarchy, ordinary page scrolling for genres, larger controls, keyboard focus indicators, labeled controls, toggle state announcements, and accessible progress bars. Page zoom is enabled and device safe areas are respected. Framer Motion follows the reduced-motion preference; repeating warning flashes were removed from genre guides. Fonts ship locally. Lessons are bundled up front so in-app navigation does not depend on a later network request; unused query-client initialization was removed from the static app. Android back navigates through routes and minimizes at home.

## Commands

```sh
npm run check
npx playwright install chromium webkit
npm run test:e2e
npm run android:sync
npm run ios:sync
```

Unit tests cover scoring, unique rewards, round completion, concept selection, saved state validation, invalid answers, hidden checklist items, and unavailable storage. End-to-end tests run with Android Chrome and iPhone WebKit viewport profiles against the production web build. They cover the practice round and reload, search, checklist persistence, malformed storage, and route rendering/overflow.

The iOS install suggestion is inline so it cannot cover navigation. Offline in-app navigation is tested in both engines; cold offline navigation is tested in Chromium. WebKit’s emulated offline hard navigation returned an internal browser error, so verify cold offline launch in real Safari and the native wrapper.

Native signing, device testing, and store review are separate from browser verification. See [mobile release gates](mobile-release.md).

## Verification result — 2026-09-10

- TypeScript: passed for application, tests, and build/native configuration.
- ESLint: no errors; seven existing Fast Refresh warnings in generated UI components.
- Unit tests: 7 passed.
- Browser checks: 11 passed across the final run and targeted Android route rerun. One Safari cold-offline navigation case is explicitly skipped pending real-device verification. The Android route sweep exceeded its initial 30-second timeout on the busy development machine; it passed after setting a 90-second allowance and waiting for DOM content before checking rendered headings.
- Android Chrome and iPhone WebKit: practice/feedback/results, reload persistence, search/favorites, every genre and lesson route, storage failures, and offline in-app navigation verified.
- Android Chrome: cold offline navigation verified. iPhone WebKit: cold offline navigation remains unverified because the engine returned an internal error.
- Dependency audit: zero reported vulnerabilities after updates.
- Web production build: passed. Native compile/device results and remaining release gates are recorded in [mobile release](mobile-release.md).
- Native web build and Capacitor sync: passed for Android and iOS; all 17 bundled files match the build output and neither native bundle contains a service worker.

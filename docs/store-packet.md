# Android store preparation packet

Status: review draft, September 16, 2026. No store upload, publication, account change, or policy attestation has been performed. Studio/legal owner, final application ID, publisher signing, support contact, and public privacy URL remain undecided.

## Asset inventory and provenance

| Asset | Source / output | Status |
| --- | --- | --- |
| App icon | [Existing 512px PNG](../public/favicon.png), [original SVG](../assets/brand/icon.svg) | Reused owned artwork, no external stock logo |
| Feature graphic | [1024×500 PNG](../assets/store/android/feature-graphic.png), [SVG source](../assets/brand/play-feature.svg) | Original composition using owned record artwork; RGB, no alpha |
| Social card | [Existing 1200×630 PNG](../public/social-card.png) | Reused for web sharing, not stretched into the feature graphic |
| Six phone draft screenshots | [Capture manifest](../assets/store/android/mobile-web-drafts/capture-manifest.json) | Actual mobile-web UI, 1080×1920; **not installed Android screenshots** |
| Android binary and hashes | [Candidate handoff](android-candidate.md) | Debug APK and unsigned AAB; publisher release still pending |

No emulator executable or configured AVD was available in the inspected local SDK/user directories. Screenshot drafts use an isolated Chromium session, 540×960 CSS viewport at 2× scale. All learning progress is earned by actual UI interactions in that demonstration session; no storage injection, fabricated results, composited UI, OS chrome, device frames, or claimed native verification. Files live in a deliberately named `mobile-web-drafts` directory. Recapture the same flows from the approved installed Android build before store submission.

## Screenshot order and accessible descriptions

1. [Start](../assets/store/android/mobile-web-drafts/01-start.png): LearnToDJ home screen with zero XP and an invitation to a short mixing challenge.
2. [Question](../assets/store/android/mobile-web-drafts/02-question.png): A phrasing question asks when to bring in the next track, with three answer choices.
3. [Explanation](../assets/store/android/mobile-web-drafts/03-explanation.png): Correct phrasing answer with an explanation about starting on beat one of a new phrase.
4. [Results](../assets/store/android/mobile-web-drafts/04-round-results.png): Demonstration round completed through three correct answers, earning 60 XP.
5. [House checklist](../assets/store/android/mobile-web-drafts/05-house-checklist.png): House mixing guide with one preparation step checked through the app.
6. [Track flow](../assets/store/android/mobile-web-drafts/06-track-flow.png): Track-flow lesson showing the structure of an EDM track.

Feature graphic alt text: LearnToDJ, practice the next transition, with teal record artwork and short challenges and practical guides.

## Listing draft

**App name:** LearnToDJ

**Short description:** Build your DJ mixing skills with quick challenges and practical genre guides

**Full description:**

Learn one mixing concept, practice a decision, then try it on your decks. LearnToDJ combines short three-question challenges with genre-specific checklists for preparing tracks and building transitions.

Practice phrasing, harmonic mixing, cueing, beatgrids, levels, tempo, transitions, and recovery. Get an explanation after every answer and earn concept mastery XP as you learn. There is no timer or lives system.

Explore preparation, playing, track structure, effects, loops, remixes, and gear guides. Save favorite genres and check off steps as you work through a mixing guide.

No account is required. Lessons and progress work locally on your device. LearnToDJ is a learning companion; it does not play, record, or mix music. Clearing app data removes saved progress. Progress does not sync through an app account; operating-system backup may affect restoration.

Publisher name, legal owner, support email, privacy URL, target audience, content rating, and distribution choices are not filled in. No invented studio identity or popularity/ranking claims are used.

## Reproduce and validate

```sh
npm ci
npm run assets:generate
npx playwright install chromium
npm run build
npm run preview -- --host 127.0.0.1 --port 4193
# In another terminal, using the local preview:
node scripts/capture-store-drafts.mjs
node scripts/validate-store-assets.mjs
```

The capture script checks for console/runtime errors, horizontal overflow, and unexpected external HTTP requests. It starts a fresh context and records the exact UI route and provenance per capture. Brand exports use a system sans-serif font: inspect the feature graphic if regenerating on another machine.

The feature graphic follows Google's 1024×500, no-alpha specification. Phone draft screenshots use a portrait 9:16 size. The reused app icon is 512×512. These format checks are not store approval; see [Google Play preview asset guidance](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en).

## Remaining gates

- Choose studio/legal owner, final app ID, and signing ownership; configure no personal publisher defaults.
- Review the [privacy and Data safety fact sheet](privacy-data-safety.md), confirm final SDK/backup/network behavior, then prepare and publish the real policy/contact pages.
- Capture native screenshots, test the signed installed build, and perform the account's Play testing/pre-launch requirements.
- Complete audience, content rating, Data safety, and listing attestations in the real publisher account. This packet makes none of those decisions.

## Validation result

All six screenshots and the feature graphic were visually inspected. Automated checks pass for image dimensions, PNG format, alpha requirements, screenshot provenance, zero captured browser errors/overflow/external requests, and listing length (76-character short description, 869-character full description). The production web build and 13 existing unit tests pass. ESLint reports zero errors and seven existing warnings. No application logic, identity, authentication, backup policy, or native package content changed in this packet task.

# LearnToDJ: conceptual practice PRD and execution record

Adopted from the product-specific GTM handoff, September 16, 2026. Public product name is **LearnToDJ**; “Learn2DJ” was a planning alias, not a rename. This product-only adaptation contains no private portfolio research, contacts, or transcript copies. Owner: product owner and this repository's maintainer. Status: initial preparation locally implemented; no campaign launched.

## Customer, promise, and boundaries

For beginner DJs between hands-on sessions: understand one concept, answer a short challenge, and identify a related task to try on their equipment. Promise: **Practice a DJ concept in a short challenge.** Entry: existing home challenge → `/practice` → three questions → explanations → related House guide → another round later.

A correct quiz answer is recall evidence, not observed mixing skill. The app does not listen to audio, analyze uploaded tracks, operate decks, certify competence, or provide a licensed commercial music library. Existing no-account use, local persistence, offline behavior, guides, and content remain available. Monetization is undecided; no forever-free promise or paywall is introduced.

## Acceptance and evidence

- Incorrect answers receive an explanation; partial rounds survive reload; unavailable/malformed storage does not crash the learning path.
- A concept earns 20 XP on its first correct answer only. Replaying all nine concepts cannot exceed 180 XP. “Recalled” now replaces public “mastered” language, and results explicitly distinguish quiz XP from live mixing ability. The legacy storage field `mastered` remains for compatibility, with no migration or lost progress.
- Checklist progress is a user's self-report. Checklist resets exist; practice has no global erase control. Clearing site/app storage is the documented full-reset fallback and removes all local progress. Do not demonstrate reset on a learner's device without their intent.
- First value requires both round completion and a successful explanation of a transfer question during the pilot. A screenshot of 60 XP alone is not learning evidence.
- Another-day use is measured only by voluntary observation/confirmation; stored round count has no day timestamps and cannot prove retention.

## Claims and platform register

| Claim | Allowed wording and evidence | Boundary / recheck trigger |
| --- | --- | --- |
| Three-question practice | Current nine-question bank, explanations, and round state; unit + browser checks | Content changes require answer/explanation review |
| Progress | Saved locally; first correct response per concept earns XP | Browser eviction, data clear, origin changes, and OS backup affect persistence |
| Recall | Correct answers recorded for concepts | No audio-performance assessment or effectiveness claim |
| Offline | Bundled content; existing Chrome offline tests and loaded WebKit navigation | Safari cold offline/native installed behavior needs device verification |
| Android | Local debug APK/unsigned AAB from earlier candidate | Not signed for studio publication; earlier candidate predates this copy repair |
| iOS | Source/assets and sync prepared | No current signed archive/TestFlight/device proof |
| Pricing | No checkout or paid offer activated; potential content pack under research | Do not call app permanently free or show an invented price |
| Store images | Existing original artwork and labeled mobile-web drafts | No claim of native screenshot provenance |

Use [store packet](store-packet.md), [Android candidate](android-candidate.md), and [privacy facts](privacy-data-safety.md) as canonical evidence. No public production destination was verified during this slice. `/practice` is the intended relative route, not an approved public URL.

## Acquisition and measurement decision

Prepare three educator-led challenge clips for a possible YouTube Shorts test, based on the current conceptual question bank. This is a channel hypothesis, not audience validation. No simultaneous campaign is activated. Content review, a working public destination, permission for outreach/publication, and available campaign capacity precede launch.

Use the [pilot and measurement packet](learner-pilot.md) instead of installing analytics. Use the [content scripts](lesson-demo-scripts.md) for a reviewable next creative action. Research an optional, reviewed one-time practice-material pack using the [commercial boundary](paid-content-research.md); no payment/account implementation in this slice.

## Existing ticket handoff record

| Ticket | Result | Remaining gate |
| --- | --- | --- |
| DJ-01 | Local: name reconciled; public recall claims repaired; store copy/assets reused and refreshed | Review/merge and public destination verification |
| DJ-02 | Local: first-round/explanation/reload tests and repeat-reward regression; no added telemetry | Actual learner transfer and another-day behavior; signed native verification |
| DJ-03 | Prepared: three timed scripts, shot references, captions, rights and reviewer checklist | Qualified educator review, recording approval and publication authorization |
| DJ-04 | Prepared: ten-learner study, scoring rubric, voluntary measurement, interview script and cost/time cap | Consent, recruitment permission, real observations; no participants recruited |
| DJ-05 | Prepared: paid-material desk research, proposed contents, cost sensitivity and delivery/restore requirements | Value evidence, authored/reviewed material, price/provider/rights decisions |

No ticket's preparation status means pilot success, monetization validation, merged code, deployed site, or store release. The shared portfolio tracker remains owned by the coordinating task.

Repository reconciliation: AGENTS.md, SOUL.md and USER.md were absent at the repository root; supplied task guidance, CLAUDE.md and docs/INDEX.md were read. The working tree was clean before this slice. Fetched origin/main remains 9eec17d; the existing local preparation branch is preserved and nothing is pushed or merged. The post-commit hook can auto-push main, so local commits use a per-command disabled hooks path.

## Recovery verification — September 16

The prior task stopped at a usage limit with these edits uncommitted. The portfolio reconciliation reviewed and completed the existing bounded change. npm run check passes: 14 unit tests, app/tool typechecks, lint with zero errors and seven existing warnings, and production/PWA build. Mobile Chromium/WebKit: 11 browser tests passed, one existing WebKit cold-offline test deliberately skipped. Store asset validation passes; updated home/result screenshots were visually reviewed and document links checked. React review found copy/accessible-label changes only; scoring/storage contracts remain unchanged.

No native rebuild, signed-device verification, provider change, push, merge or deployment occurred in recovery. Existing native candidates predate this copy change. Local completion does not prove learning outcomes, live mixing performance or pilot retention.

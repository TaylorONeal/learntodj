# Learner pilot and manual measurement — DJ-04

Status: prepared, not recruited or run. Owner: product owner; moderator/educator must be assigned before invitations. Ten consenting beginner DJs, a 15–20 minute first session, and one voluntary follow-up on another day within seven days. No accounts, telemetry, device identifiers, cookies for marketing, or contact collection are added to the app.

## Experiment card

Hypothesis: conceptual questions plus explanations help beginners articulate a concept and identify a next practice task. Current flow is the control; do not change rewards, question order, and sales copy simultaneously. Use a tested build and a verified destination chosen before recruitment. Day 0 begins only after consent, facilitator availability, and outreach authorization, not today's document date.

Proposed cap: zero ad spend and zero paid recruitment; up to five moderator hours plus two review hours. This is a preparation cap, not authorization to buy expert time. Stop on data loss, misleading audio-analysis expectations, inaccessible core controls, or a materially wrong explanation. Correct and retest before further invitations.

Targets (decision rules, not effectiveness claims): 8/10 complete without help, 6/10 explain a transfer concept afterward, and 4/10 return on another day within seven days. Report all counts and uncertainty. If completion fails, fix the earliest friction before marketing. If completion succeeds but transfer fails, revise explanation/content with an educator. If first value succeeds but return is low, investigate real practice opportunities before developing a paid pack. Meeting targets permits discussing the next bounded study, not claiming statistical significance or automatic launch permission.

## Invitation draft — unsent

“I’m preparing a small feedback session for beginner DJs using LearnToDJ. It offers short conceptual questions and guides; it does not analyze your audio. Would you be interested in trying one round and explaining what you took from it? It takes about 15–20 minutes, with an optional follow-up within a week. This is product feedback, not a request for a public review or a sales commitment.”

No recipient/contact list is included. Verify the demo destination before adding a link. Recruitment and sending need authorization.

## Moderator run sheet

1. Explain voluntary participation, ability to stop/skip, and planned notes. Ask before observing the screen. Do not record audio/video by default; no music uploads or personal library details are needed. Keep contact/consent records in the owner's existing private research system, never in this repo.
2. Ask: “When did you last practice? Which concept caused difficulty? What did you use to work it out?” Record generalized friction, not identifiable quotes without permission.
3. Start from the existing home screen without coaching. Ask the learner to complete a round, read an explanation, and find something to try in a guide. Note any assistance. Incorrect quiz answers do not mean the task failed.
4. Ask one transfer prompt without showing the quiz wording: “You missed your planned entrance while the outgoing track is still stable. What would you consider doing next, and why?”
5. Educator rubric: pass if the learner independently explains waiting for a suitable musical boundary and preserving a stable outgoing mix; do not require exact phrasing or penalize a musically valid alternative. Partial/uncertain if they name an action without a reason; fail if they force an arbitrary entrance and cannot explain the tradeoff. A qualified educator must approve this rubric before use. This tests explanation, not live performance.
6. Ask: “Which idea would you try next on your equipment? What did you think the XP meant? Did you expect this app to listen to audio?” Record confusion and repeat mistakes rather than only scores.
7. Invite an optional return on a different calendar day within seven days. Do not add reminders or contact users without agreed follow-up permission. A learner report is labeled self-reported, not independently instrumented.
8. At follow-up ask what they practiced, whether they completed another round, and what remained unclear. Missing responses are unknown; do not invent returns from stored round counts.

## Manual measurement contract — no app events emitted

| Proposed name | Observable trigger | Manual counting rule |
| --- | --- | --- |
| `practice_started` | Learner selects Start practice and sees question one | Once per observed round; exclude facilitator QA |
| `round_completed` | Results appear after three answers | Once per round; reload of same results is not a new completion |
| `explanation_viewed` | Explanation is visible and learner says they reviewed it | Count distinct question explanations per round; rendering alone is not comprehension |
| `guide_opened` | A real related guide renders | Once per observed guide visit; distinguish from checking an item |
| `practice_returned` | Another completed round on a different day within seven days | Once per learner in the follow-up window, voluntary observation or labeled self-report |

The producer is the moderator, not app code. Persistence is private study notes and aggregate counts only; no transmission from the app. Participants can decline notes/follow-up. Do not invent analytics consent screens for nonexistent tracking. Full URLs, names, emails, recordings and free-form personal notes never enter this repository. Any operational retention/deletion promise for study records must be agreed by the owner before consent.

Report completion and transfer out of all ten starters, retaining abandonments in the denominator. Report return as confirmed returns / learners with an elapsed seven-day window, plus missing follow-ups separately. Before the window matures, say “not yet observable.” Show observed versus self-reported returns separately. Optional source (“instructor”, “demo”, “other”, “prefer not to say”) is voluntary; unknown remains unknown. No fingerprinting or inferred cross-device identity.

## Blank aggregate scorecard

Build/platform: pending selected pilot build
Cohort dates: not started
Eligible starters: not collected
Unassisted completions / starters: not collected
Transfer pass / starters: not collected
Elapsed-window learners: not yet observable
Observed returns / elapsed-window learners: not collected
Self-reported returns / elapsed-window learners: not collected
Missing follow-ups: not collected
Assisted sessions, failures, confusion themes, support minutes: not collected
Decision: pending actual observations

## Offer interview after the task

Ask what they already use or pay for, what they would stop using, and what they would need before paying. Then show the clearly hypothetical pack in [paid-content research](paid-content-research.md). Ask them to describe missing value and compare a one-time $9, $14, or $19 price against their alternative; rotate the starting price between sessions. Say “this pack does not exist for sale.” Do not take orders, cards, deposits, or create scarcity. Enthusiasm and stated willingness to pay are not purchases. Preserve the existing content while researching.

# Privacy and Data safety technical fact sheet

Evidence reviewed September 16, 2026. This is engineering input for the publisher, **not a published privacy policy or completed Google Play declaration**. It describes the current source and local verification; repeat the review for the signed release and any added SDKs. Publisher/legal owner, support contact, public policy URL, and effective date remain unset.

## What the code stores

All listed application values use JSON in browser/WebView `localStorage` through [storage helpers](../src/lib/storage.ts). They are not encrypted by application code. Retention is until replaced/reset or cleared by browser/OS storage controls; there is no timed deletion job.

| Key | Actual content | Purpose / code |
| --- | --- | --- |
| `learntodj-practice-v1` | Mastered question IDs, completed-round count, active question IDs and selected answer indexes | Resume practice and derive XP; [practice state](../src/data/practice.ts), [hook](../src/hooks/usePractice.ts) |
| `dj-flow-guide-checklists` | Genre and section IDs with checked/unchecked step arrays | Checklist progress; [hook](../src/hooks/useChecklist.ts) |
| `dj-flow-guide-favorites` | Favorite genre IDs | Saved guide preferences; [hook](../src/hooks/useFavorites.ts) |
| `dj-flow-guide-advanced-mode` | Boolean | Basic/advanced preference; [hook](../src/hooks/useAdvancedMode.ts) |
| `pwa-install-dismissed` | Dismissal timestamp | Avoid repeatedly showing the web installation banner; [component](../src/components/InstallPWA.tsx) hides this banner on native platforms |

Genre search text is transient React state, not a saved search history. The PWA service worker caches static application content; native mode disables it. Font files, lesson content, and artwork are bundled locally.

## Access, transmission, and SDK evidence

- No account creation, login, backend, ads, billing, analytics, or crash-reporting integration is configured in the reviewed app source/dependencies. No app `fetch`/Axios endpoint or remote font/image resource was found in the source audit. This is a bounded source review, not proof about all future builds.
- No names, email addresses, location, contacts, photos, recordings, or music files are requested by the current learning flows. The app does not capture microphone audio or access the user's music library.
- The source Android manifest declares `INTERNET`; it does not request camera, microphone, location, contacts, or storage permissions. The previously inspected merged APK also includes a package-scoped dynamic-receiver permission. Permission presence alone does not show data transmission. Recheck the merged manifest of the final signed build.
- Native dependencies are Capacitor Android/core and `@capacitor/app`; the app plugin handles the Android back button/minimization in [NativeNavigation](../src/components/NativeNavigation.tsx). No telemetry service is initialized by the reviewed app code. Transitive dependency behavior still needs final native runtime review.
- During the six local mobile-web capture flows, the capture script records HTTP requests and requires zero requests outside the local preview origin. This checks those web flows only; it is not an Android packet capture or a claim about OS traffic.
- If the web app is hosted, hosting/CDN operators may receive IP addresses and normal request metadata. No production-host retention or logging configuration was inspected here. Native app and separately hosted website disclosures should reflect their actual services.

## Backup, deletion, and persistence limits

[AndroidManifest.xml](../android/app/src/main/AndroidManifest.xml) sets `android:allowBackup="true"`. No custom backup exclusion or data-extraction rules are specified by this app. OS backup/device-transfer behavior and user settings therefore remain a review item; do not claim that progress can never leave the device or that uninstall erases every backup copy. No backup configuration was changed in this task.

The app supports checklist section/genre resets through [useChecklist](../src/hooks/useChecklist.ts), but has no global erase-all-data or account-deletion feature. Android's clear-storage controls or clearing web site data can remove current local app state. Backup restoration can affect later persistence. There is no app server-side user record or deletion endpoint in this code; account deletion is not an implemented flow because accounts are absent.

## Inputs for the publisher's form review

Google distinguishes off-device collection from exclusively on-device processing, and includes SDK/WebView behavior when determining disclosure. See [Google Play Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

Current evidence supports local functionality processing for the keys above, with no application-configured collection/sharing endpoint found. **Do not turn that into an unconditional completed “no collection/no sharing” attestation:** first verify the final native SDKs, backup behavior, any hosted pages, and network traffic of the signed app. No claim is made here about encryption in transit, independent security review, legal compliance, child-directed status, or a publisher's deletion commitments.

Before drafting the final public policy, fill in the real studio/legal controller and contact; settle backup/privacy wording; describe the actual released integrations; confirm retention/deletion statements; and publish a real accessible policy URL. No URL, legal entity, consent statement, or jurisdiction was invented for this packet.

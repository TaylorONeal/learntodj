# Android launch candidate

LearnToDJ joins JetSweep, Alpine Pack, and WakeState in the studio's Android launch set. This is a local technical candidate, not a store submission. Studio name, final package ownership, developer account, and signing identity are pending. The existing `com.learntodj.app` identifier remains provisional; do not reserve it in a store or treat it as approved studio branding.

## Reproduce locally

```sh
npm ci
npm run check
npm run android:sync
cd android
JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home \
ANDROID_HOME="$HOME/Library/Android/sdk" \
./gradlew --no-daemon --max-workers=2 assembleDebug bundleRelease lintDebug testDebugUnitTest
```

The explicit paths above match the current Mac. Other machines can use their installed JDK 21 and Android SDK 36 paths. No system Java or Xcode setting needs to change. Do not commit keys or signing credentials. Debug signing uses Android's development key and does not establish a studio identity.

Expected artifacts:

- `android/app/build/outputs/apk/debug/app-debug.apk`: installable debug candidate for local device tests.
- `android/app/build/outputs/bundle/release/app-release.aab`: unsigned bundle, not ready for Play upload.
- `android/app/build/reports/lint-results-debug.html`: native lint report.

All are generated and ignored by git. Rebuild after a source change. The existing native unit test is a scaffold arithmetic check; passing it is not gameplay or device validation. Web unit and Chrome/WebKit suites validate learning flows, but installed-device checks remain necessary.

## Draft listing copy

**App name:** LearnToDJ

**Short description:** Build your DJ mixing skills with quick challenges and practical genre guides.

**Full description:**

Learn one mixing concept, practice a decision, then try it on your decks. LearnToDJ combines short three-question challenges with genre-specific checklists for preparing tracks and building transitions.

Explore beatmatching, phrasing, harmonic mixing, effects, loops, track structure, and recovery techniques. Save your favorite genres, track completed checklist steps, and build concept mastery through practice.

Lessons and progress work locally on your device. No account is required. LearnToDJ is a learning companion; it does not play or mix music. Clearing app data removes saved progress.

The [store packet](store-packet.md) now contains owned feature artwork, listing copy, and six clearly labeled mobile-web screenshot drafts. Publisher, support email, privacy URL, and installed-device screenshot capture remain pending.

## Required before submission

1. Choose the studio identity and confirm control of the final application ID. If it changes, update Capacitor, Android namespace/application ID/Java package/string identifiers and the future iOS bundle ID consistently; rebuild and retest.
2. Choose release version/build number, create a studio-owned upload key outside git, configure publisher signing, and generate a signed AAB.
3. Complete privacy/support pages, store listing, content rating and Data safety using the shipped app's behavior. Android backup is enabled; review its treatment of local progress before making privacy claims.
4. Install on real Android devices and verify offline cold launch, progress persistence after restart/upgrade, back gestures, cutouts, keyboard, large text, screen reader, and rotation. Capture store screenshots from that build.
5. Run the appropriate Play testing track and pre-launch checks for the studio account. No account, store listing, release, or domain was changed by this preparation.

## Verified local artifacts — September 16, 2026

Android assembleDebug, bundleRelease, lintDebug, and testDebugUnitTest completed successfully. APK metadata confirms LearnToDJ, provisional `com.learntodj.app`, version `0.1.0` / code `1`, minimum SDK 24, target SDK 36. APK signature verifies as Android Debug; the AAB is unsigned. Packaged web icons/social artwork match the local source exports byte for byte, and neither native package contains a service worker.

- Debug APK: 4840309 bytes; SHA-256 `d92c139969911bcd0b1ff825f9a1b960018e33ae084b0a804e31c6559821041d`.
- Unsigned AAB: 3487930 bytes; SHA-256 `5b73f34feb3ee309553de25298992c95a6d453182fea40e23949b833dd1abeef`.

Native lint reports zero errors and 12 warnings: dependency update suggestions, scaffold resources reported unused, optional monochrome launcher artwork, and inherited splash density/layout conventions. Legacy launcher shape/duplicate warnings and manifest ordering were corrected. These remaining warnings do not establish device compatibility; installed-device testing is still pending. Web verification remains 13 unit tests and 11 browser tests passed (one existing WebKit cold-offline skip); web lint has seven existing warnings and zero errors.

Next necessary step: choose the studio name and approve its final application ID/signing ownership, while testing the debug APK on physical Android hardware. Do not upload this unsigned bundle or debug-signed APK as a release.

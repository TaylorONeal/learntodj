# Mobile release preparation

## Shared app

Capacitor 8 wraps the same React app in Android and iOS projects. `capacitor.config.ts` uses `com.learntodj.app` as a provisional identifier: confirm that it belongs to the publisher before the first store submission. If it changes, update the native application ID / namespace / Java package and Xcode bundle identifier too; changing only the Capacitor config does not rename existing native projects.

Native builds bundle all lesson content and fonts. Service worker generation is disabled in native mode to avoid stale assets across store updates. The web build remains an installable offline PWA. There is no authentication, ads, analytics, backend, or payment integration. Progress is local to the device; clearing app data removes it. Browser storage can be evicted; cross-device sync is not implemented.

## Android

Use Node 22+, Android Studio 2025.2.1+ and its bundled JDK, with Android SDK Platform 36 installed. See [Capacitor environment setup](https://capacitorjs.com/docs/getting-started/environment-setup).

```sh
npm ci
npm run android:sync
npm run android:open
# After Android Studio configures the SDK:
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

`bundleRelease` alone is not a signed release. In Android Studio, use Build → Generate Signed Bundle / APK → Android App Bundle. Create or select the publisher's upload key outside this repository, and enroll in Play App Signing. Never commit keystores or passwords. The repository ignores common signing files.

Target API 36 for current phone/tablet submissions; verify [Google Play's target API requirements](https://developer.android.com/google/play/requirements/target-sdk) again at submission time. Increment `versionCode` and `versionName` in `android/app/build.gradle` for updates.

Before submission:

- Confirm publisher-owned application ID and release version.
- Replace generated Capacitor launcher/splash artwork with approved brand artwork; supply Play screenshots, feature graphic, short and full descriptions.
- Publish a privacy policy and support contact URL. Complete Data safety and content rating based on the actual shipped build, including any future SDKs. Review Android backup behavior before claiming data never leaves a device.
- Build and sign the AAB; run Play pre-launch reports and any testing track requirements shown for this developer account.
- Test an installed release on real devices: cold launch in airplane mode, relaunch with saved answers, back gesture/button, display cutouts, keyboard, large fonts, screen reader, portrait/landscape, upgrade without losing progress.

## Future iOS

The iOS scaffold uses Swift Package Manager. Use macOS with Xcode 26+ and an Apple developer team. See [Capacitor iOS deployment](https://capacitorjs.com/docs/ios/deploying-to-app-store).

```sh
npm run ios:sync
npm run ios:open
```

Set the publisher's bundle identifier and signing team, version/build number, approved app icons, privacy declarations, support/privacy URLs, and App Store metadata. Verify required privacy manifests for the precise native dependencies at submission. Archive and upload through Xcode, then test using TestFlight. Test VoiceOver, safe areas, text zoom, offline launch and persistence on real iPhones. Browser WebKit tests are useful but do not validate the native wrapper or store acceptance.

## Current release boundary

This change prepares source projects and repeatable asset synchronization. It does not publish either app or provide a signed binary. The development machine has no configured Android SDK/JDK. Xcode 26.6 is installed; its first-launch setup was repaired successfully. The simulator build resolved its Swift packages but stopped because the iOS 26.5 platform is not installed (Xcode → Settings → Components). Native compilation and physical device testing remain release gates. Generated platform artwork remains placeholder artwork.


## Automated Android builds

The CI workflow uses Node 22, JDK 21, and SDK 36 to compile a debug APK and unsigned release AAB, and run Android lint. On successful pull requests and main-branch pushes, download the `android-builds` artifact from GitHub Actions. The APK is for device testing; the AAB still needs the publisher’s release signing before submission. No release keys are needed by CI. Web CI also runs TypeScript, lint, unit tests, production build, and the Chrome/WebKit browser suite.

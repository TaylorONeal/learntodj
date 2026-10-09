# Independent hosting and artwork

LearnToDJ is a static React application. All lesson content, fonts, icons, and social artwork ship in this repository. There is no hosted editor, proprietary runtime, external image service, authentication provider, or backend required to run it. Keep the existing browser storage keys to preserve progress during updates on the same origin. Moving to another domain creates separate browser storage; progress does not migrate automatically.

## Build and host

Use Node 22+ and the committed npm lockfile:

```sh
npm ci
npm run check
# Set this to the actual publisher-owned HTTPS origin when building for sharing:
PUBLIC_SITE_URL=https://your-owned-domain.example npm run build
```

`PUBLIC_SITE_URL` is optional and public, not a secret. It makes both social-image metadata URLs absolute for social crawlers. Without it, images resolve from `/social-card.png` on the current host. Native builds always use the local path. Set the real origin before production publication; the example is not an assigned domain.

Upload `dist/` to any static HTTPS host at the domain root. No server-side environment or vendor account is required by the app. Configure unknown application routes to serve `index.html`; serve existing files directly with their correct MIME types. For nginx, the routing rule is `try_files $uri $uri/ /index.html;`. Do not rewrite missing asset requests into HTML. Serve `index.html`, `sw.js`, and the web manifest with revalidation (`Cache-Control: no-cache`); hashed files under `assets/` can use long-lived immutable caching. HTTPS is required for production service workers. Test a deep link, a reload, and offline relaunch before changing traffic.

This work does not deploy, change DNS, transfer accounts, or change authentication. Domain ownership, TLS configuration, and publishing access remain with the publisher.

## Local artwork

Original vector sources live in `assets/brand/`. Run `npm run assets:generate` to export the SVG/ICO favicon, real PNG PWA icons (192 and 512 pixels), Apple touch icon, social card, Android launcher assets, and Android/iOS splash artwork. The exporter uses the development-only `sharp` dependency; the shipped app does not load it. Social-card text uses a system sans-serif font during export; review the committed raster after regenerating on another machine.

Inspect the icon and 1200×630 social card after changing their sources. Then run `npm run android:sync` and `npm run ios:sync` to copy the app bundle into native projects. Native source icons and splash images are exported directly by the asset script. Generated web/native public copies are ignored by git and rebuilt as needed.

Store submission still requires publisher identity, signing, metadata/screenshots, policy declarations, and installed-device validation. See [mobile release preparation](mobile-release.md). A static build or synchronized native assets alone do not prove store readiness.

## Verification — September 15, 2026

- Clean npm install and audit: successful, zero reported vulnerabilities.
- TypeScript and production PWA build: pass. ESLint: zero errors, seven pre-existing component-export warnings.
- Unit suite: 13 pass, including image format/dimension and ICO checks; iOS app icon has no alpha channel.
- Android Chrome / iPhone WebKit browser suite: 11 pass, one existing WebKit cold-offline skip. Practice, reload, progress, favorites, checklists, route layouts, storage failure, and loaded offline navigation are covered.
- Android and iOS native bundle synchronization: pass. Native copies contain local images and no service worker; web output has its PWA service worker. Custom-origin social metadata was verified in generated HTML.
- Hidden source and generated-output audit: no removed platform branding references. Original ICO and native splash artwork were inspected and replaced; final icon/social card/splash were visually reviewed.
- No hosted CI, native binary compilation, signing, deployment, DNS, or account changes were performed for this cleanup.

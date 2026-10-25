# LearnToDJ

Learn to beatmatch, mix in key, and read a phrase by drilling short questions and running
real checklists, instead of watching another two-hour tutorial.

Runs in the browser, installs as an offline app, no account and no backend.

## The problem

Learning to DJ is mostly tacit knowledge. Gear manuals explain buttons. YouTube explains
one transition at a time. Nobody hands you the small set of concepts that actually decide
whether a mix lands: where the phrase starts, which keys sit next to each other, how far
you can pull a tempo before it sounds wrong, and what to do when you have already dropped
the track and it clashes.

So most people learn by flailing in front of an audience. This is the drilling part, for
the hours you are not behind the decks.

## What it does

- Three-question practice rounds with an explanation after every answer, so a wrong guess
  teaches you something instead of just scoring you.
- Saved progress and concept recall XP, so the things you keep missing come back around.
- Genre guides covering BPM ranges, harmonic mixing, beatgrids, phrasing, transitions, and
  how to recover when a mix goes sideways.
- Checklists you can tick through while you practice, with basic and advanced guidance,
  plus favorites that persist between sessions.
- Installs as an offline PWA. Native Android and iOS projects are in the repo.

Everything stays on your device. There is nothing to sign up for.

## Run it

Node 22 or newer, and npm. Use the committed `package-lock.json`.

```sh
npm ci
npm run dev
```

Then open the printed local URL. To check the whole thing before you commit:

```sh
npm run check
npx playwright install chromium webkit
npm run test:e2e
```

`npm run check` runs TypeScript, ESLint, unit tests, and the production PWA build.
`npm run build:native` produces bundled assets without a service worker.

## Native builds

```sh
npm run android:sync
npm run android:open
npm run ios:sync
npm run ios:open
```

These need Android Studio with the SDK and JDK, or Xcode. Store signing, publisher
identity, screenshots, and real-device testing are still outstanding, so treat this as a
working app you can install yourself rather than a published store release.

## What's inside

Built with React, TypeScript, Vite, Tailwind, and Capacitor.

- [Documentation index](docs/INDEX.md) for everything below.
- [Mobile release checklist](docs/mobile-release.md) for what store submission still needs.
- [UX and testing notes](docs/ux-and-testing.md) for how the practice rounds are structured.
- [Independent hosting](docs/independent-hosting.md) for provider-neutral deployment and
  local artwork generation.

## More from me

I'm Taylor O'Neal. I DJ, I work in product and analytics, and I teach at Miami University.
This started as notes to myself.

- [tayloroneal.com](https://www.tayloroneal.com) for what I'm working on and how to reach me
- [@businesstaylor](https://x.com/businesstaylor) on X, where I post build notes
- [@grizzpm](https://www.youtube.com/@grizzpm) on YouTube

If this saved you time, a star helps other people find it. Issues and PRs are welcome.

## License

MIT, see [LICENSE](LICENSE).

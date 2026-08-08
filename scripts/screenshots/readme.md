# Tip screenshots

The images behind the tips on the welcome page (`src/data/tip-data.ts`) live in
`src/assets/screenshots`. They used to be captured by hand, which meant they slowly drifted
away from the actual UI. This regenerates them from the running app instead.

```bash
npm run screenshots
```

That starts a Vite dev server, seeds a browser with real hero data, drives the app to each
screen, and writes the PNGs back into `src/assets/screenshots`. Review the results with
`git diff` - if nothing about the UI changed, nothing changes on disk, because captures are
byte-for-byte reproducible.

Useful flags:

```bash
npm run screenshots -- --list            # show the shots without capturing
npm run screenshots -- --only library    # capture one shot while you iterate on it
npm run screenshots -- --out tmp/shots   # write somewhere else to compare before committing
npm run screenshots -- --headed          # watch the browser do it
```

## How it fits together

- **`manifest.mjs`** - one entry per screenshot: which route to open, what to click first,
  what to draw the red callout box around, what to crop to.
- **`seed.mjs`** - builds the app state screenshots run against. It imports the app's own
  data and logic from the dev server - `PregenData`, `SessionLogic`, `EncounterData` and the
  rest - and writes the result into localforage's IndexedDB store, so the fixtures are always
  current rather than a stale copy. It produces two heroes in a party, one of them roughed up
  with damage, a condition, inventory and a project; a session with an encounter, a montage, a
  negotiation and a counter already started; and a homebrew sourcebook, without which the
  Library's director sections and every homebrew editor would open on an empty list.
- **`capture.mjs`** - the runner. Renders at 2x and downsamples to 600px wide, which is the
  size the tip panel displays.

## Adding a shot

Copy a manifest entry, point it at a route, and iterate with `--only <name>`. The name is the
output filename, so it should match the import in `src/data/tip-data.ts`.

```js
{
    name: 'session-encounter',
    route: '/session/director',
    prepare: selectSessionItem('Goblin Ambush'),   // or async (page, settle) => { ... }
    highlight: '.some-selector',
    clip: '.some-container',
    clipAvoid: appChrome,
    clipPadding: 8
}
```

Selectors go through Playwright's engine, so `:has-text(...)` and friends work in `highlight`
and `clip`, not just plain CSS.

`clipAvoid` exists because the app header and footer draw over the top of drawers and modals -
cropping to a drawer would otherwise catch a slice of each. Anything listed there gets trimmed
out of the crop.

`prepare` is handed a `settle` helper as its second argument, for shots that click through
several steps and need to wait for a menu or drawer to finish opening in between.


## Notes

- Shots are captured in light mode at a fixed viewport, so they don't vary by machine.
- `Math.random` and `crypto.getRandomValues` are replaced with a fixed sequence, so screens that
  genuinely roll dice - the random hero generator, most obviously - don't produce a different
  image every run.
- Animations are made instant rather than disabled, and only *after* `prepare` has run. Two
  traps here: `animation: none` leaves antd's drawers and dropdowns stuck at the start of their
  fade, invisible and unclickable; and applying the instant-animation CSS before `prepare`
  makes antd realign its popovers forever, so Playwright never sees anything inside one as
  stable and every click into a popover times out.
- `cookieConsent` is seeded as accepted, otherwise the footer banner appears in every image.
- The PNGs aren't run through an optimiser, so they're somewhat larger than the originals.
- The party is seeded and the heroes' folder set to match it. Without that, `startEncounter`
  puts no heroes in the encounter and every session screen shows its empty state.
- `options.gridSize` is seeded well below its default. It's the map zoom - the same value the
  - and + buttons under Settings > Tactical Maps change - and there's no zoom-to-fit, so at the
  default 50 even a small dungeon runs off the edge of a shot.
- The hero is given a summon so the Retinue tab exists at all - it is hidden until a hero has
  companions, retainers, summons, followers or fixtures, and no pregen has any.

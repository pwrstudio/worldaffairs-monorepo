# collected-works

Exhibition site for _Jonatan Leandoer Håstad — Collected Works 2016–2026_, served at
works.worldaffairs.se. A SvelteKit app alongside the main site, sharing this monorepo's
Sanity studio and its generated types.

Run it with `pnpm dev:collected-works` from the repo root, or `pnpm dev` to bring it up
under mprocs together with the main site and the studio.

## How the content is wired

Every word on the page is currently hardcoded in `src/lib/content/index.ts`, but it is
shaped like the studio's `exhibition` singleton rather than sprinkled through the markup:

- The schema lives in `packages/sanity/schemaTypes/Exhibition.ts` — the same studio the main
  site uses, on project `fzoco9f8`. It is registered as a singleton in `sanity.config.ts` and
  appears at the foot of the desk structure.
- Its text fields are pulled into this package's `Exhibition` type from the generated
  `packages/sanity/sanity.types.ts` via the `@sanity-types` alias, so renaming a field in the
  studio breaks the build instead of quietly emptying the page. Run `pnpm typegen:sanity`
  from the repo root after editing the schema.
- `src/lib/groq/index.ts` already holds the matching projection.

Two things still stand between here and studio-driven content:

1. **No `exhibition` document exists in the dataset yet.** Create it in the studio first.
2. **`artwork` is a static file, not a Sanity image.** The `<picture>` in `Poster.svelte`
   points at five pre-rendered widths in `static/`; a Sanity image would come through
   `urlFor()` instead, and the AVIF `<source>` would drop away since `urlFor()` serves that
   negotiation from one URL with `auto=format`. This is the real work, not a loader swap.

Once both are done, `src/routes/+page.ts` switches to the `loadData(exhibitionQuery)` call
commented in that file, and `prerender` comes off if the content should be fetched per
request.

## The poster

`src/lib/components/Poster/Poster.svelte` is one centred column, taken from the printed sheet
rather than reproducing its geometry. Everything hangs off `--column-width`:

```css
width: min(100%, var(--column-width));
margin: auto;
```

Each block below it — billing, artwork, visiting details, links, logo — is a plain
block-level child, so they all take the column's width and share its centre line without a
width or a horizontal margin of their own. The only thing a block declares is the space under
it, via `.poster > *`, and adding a sixth is a matter of dropping it into the markup. The
column's own `padding-block` closes off the top and bottom, so the last block needs nothing.

Every value is a custom property at the top of the component:

| Property                                      | Is                                          |
| --------------------------------------------- | ------------------------------------------- |
| `--column-width`                              | the column, 360px                           |
| `--space-top` / `--space-bottom`              | the column's own padding, 48px / 32px       |
| `--space-section` / `--half-space-section`    | between blocks, 16px / 8px                  |
| `--type-size-large` / `--line-height-large`   | the billing, 26px / 0.9                     |
| `--type-size-medium` / `--line-height-medium` | everything else, 18px / 1.1                 |
| `--line-width`                                | the keyline around the artwork, 3px         |
| `--rule-width`                                | the hairlines above the links and logo, 1px |
| `--logo-width`                                | the mark inside the logo bar, 64px          |

`margin: auto` rather than `justify-content: center` on the page wrapper: auto margins take
the free space when there is some and collapse to nothing when there is not, so a window
shorter than the column scrolls from the top instead of pushing the title out of reach above
it.

Three details worth knowing before editing it:

- **The keyline around the artwork is drawn, not photographed.** `box-sizing: border-box`
  keeps the framed block at exactly `--column-width`, so the painting itself is
  `--line-width` narrower on each side. The source file is square, which is what keeps the
  framed block square.
- **The logo bar is the full column, the mark inside it is not.** The `<a>` spans the column
  so its hairline matches the one above the links; the mark is sized by `--logo-width` and
  centred inside it. 64px is 17.55% of the column — the proportion the mark had against the
  artwork on the printed sheet.
- **The logo prints as a tint of the ink, not solid black.** The reference samples at
  `#24590e`, exactly 60% of the background green, so the mark is drawn with `opacity` rather
  than a hardcoded colour — set a little above the printed 40% for the screen. It comes up to
  full strength on hover and keyboard focus, the only interactive state on the page. The tint
  is on the mark alone, so the hairline above it keeps the same weight as the other one.

The background is `#3c9518` and the type is Times New Roman with metric-compatible
fallbacks, both sampled from the reference sheet.

The artwork is served from `static/` at five widths (640, 900, 1250, 1600 and 2000px) as both
AVIF and JPEG, offered through a `<picture>`. Its `sizes` is `ARTWORK_SIZES` at the top of the
component and repeats `--column-width` as a literal, since an HTML attribute cannot read a
custom property — keep the two in step.

`src/lib/components/WorldAffairsLogo/WorldAffairsLogo.svelte` holds the mark inline so its
colours are addressable. It fills whatever box it is given and takes `color`, `background`
and `detail` props — each also settable as a `--wa-logo-*` custom property, and each falling
back to `currentColor` so the mark tracks the surrounding text by default.

`static/favicon.png` is the same mark, copied from `worldaffairs.se` so the two sites share a
tab icon. Its background is transparent, which reads as black artwork on whatever the browser
puts behind it.

## Deploying

A separate Netlify site from the same repo, with its base directory set to
`packages/collected-works` — which is how `netlify.toml` in this directory gets picked up
without touching the main site, whose build is configured from the Netlify dashboard.

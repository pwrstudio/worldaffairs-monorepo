# collected-works

Exhibition site for _Jonatan Leandoer Håstad — Collected Works 2016–2026_, served at
works.worldaffairs.se. A SvelteKit app alongside the main site, sharing this monorepo's
Sanity studio and its generated types.

Run it with `pnpm dev:collected-works` from the repo root, or `pnpm dev` to bring it up
under mprocs together with the main site and the studio.

## The two pages

| Route              | Document         | Renders                                |
| ------------------ | ---------------- | -------------------------------------- |
| `/`                | `posterInfo`     | the poster — `Poster.svelte`           |
| `/exhibition-text` | `exhibitionText` | the essay behind the poster's one link |

## How the content is wired

Both pages are still hardcoded in `src/lib/content/index.ts`, but each is shaped like its
studio singleton rather than sprinkled through the markup:

- The schemas live in `packages/sanity/schemaTypes/PosterInfo.ts` and `ExhibitionText.ts` —
  the same studio the main site uses, on project `fzoco9f8`. Both are registered as
  singletons in `sanity.config.ts` and sit together under **Collected Works** at the foot of
  the desk structure.
- Their fields are pulled into this package's `PosterInfo` and `ExhibitionText` types from the
  generated `packages/sanity/sanity.types.ts` via the `@sanity-types` alias, so renaming a
  field in the studio breaks the build instead of quietly emptying a page. Run
  `pnpm typegen:sanity` from the repo root after editing either schema.
- `src/lib/groq/index.ts` holds the matching projection for each.

Neither document exists in the dataset yet — create them in the studio first. After that the
two pages differ in how much work is left:

- **`/exhibition-text` is a true loader swap.** Replace the body of
  `src/routes/exhibition-text/+page.ts` with the `loadData(exhibitionTextQuery)` call
  commented in that file. Its copy is a placeholder today, marked as such in `content/index.ts`.
- **`/` is not**, because `artwork` is a static file rather than a Sanity image. The
  `<picture>` in `Poster.svelte` points at five pre-rendered widths in `static/`; a Sanity
  image would come through `urlFor()` instead, and the AVIF `<source>` would drop away since
  `urlFor()` serves that negotiation from one URL with `auto=format`.

Drop `prerender` from a page if its content should be fetched per request rather than baked in.

## The column

`src/routes/+layout.svelte` owns the column both pages sit in, and `:root` in
`src/lib/styles/global.css` owns its width, rhythm, type and hairline colour. A page renders
straight into the column, so its blocks are block-level children of one fixed measure and line
up on its centre without a width or a horizontal margin of their own — each only declares the
space under it. A component keeps only what belongs to it alone: `Poster.svelte` holds the
artwork keyline and the logo size, and nothing else.

The tokens, in `global.css` unless marked otherwise:

| Property                                      | Is                                               |
| --------------------------------------------- | ------------------------------------------------ |
| `--column-width`                              | the column, 360px                                |
| `--space-top` / `--space-bottom`              | the column's own padding, 48px / 32px            |
| `--space-section` / `--half-space-section`    | between blocks, 16px / 8px                       |
| `--type-size-large` / `--line-height-large`   | the billing and the text title, 24px / 0.9       |
| `--type-size-medium` / `--line-height-medium` | stacked lines, 18px / 1.1                        |
| `--line-height-body`                          | running prose on the text page, 1.4              |
| `--rule-width` / `--color-fg-semi`            | the hairlines between sections, 1px              |
| `--line-width`                                | the artwork keyline, 3px — `Poster.svelte`       |
| `--logo-width`                                | the mark in the logo bar, 64px — `Poster.svelte` |

`margin: auto` on the column rather than `justify-content: center` on the page wrapper: auto
margins take the free space when there is some and collapse to nothing when there is not, so
a window shorter than the column scrolls from the top instead of pushing the title out of
reach above it.

## The poster

`src/lib/components/Poster/Poster.svelte` is taken from the printed sheet rather than
reproducing its geometry. Its five blocks — billing, artwork, visiting details, links, logo —
are plain block-level children of the column, each declaring only the space under it via
`.poster > *`. Adding a sixth is a matter of dropping it into the markup.

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

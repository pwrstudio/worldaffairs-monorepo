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

Nothing prerenders: each page fetches on every request, so a published studio edit is live on
the next page load without a rebuild. Both loaders are `+page.server.ts` rather than
`+page.ts` — a universal load would also run in the browser on client-side navigation, and a
browser calling the Sanity API needs the site's origin added to the project's CORS allowlist.
Keeping the fetch server-side avoids that, and `useCdn` is on so the reads are cached.

A loader that finds no document, or one missing a required field, calls `error()` with a
specific message rather than rendering a page full of `undefined`.

The artwork comes through `urlFor()`, at widths matched to the column: `--column-width` caps
it at 360 CSS px, so the five offered are 1x, 1.5x, 2x, 3x and a little headroom. Anything
larger could never be picked at that measure. There is no AVIF `<source>` and no `<picture>`,
because `auto('format')` serves AVIF or WebP from the same `src`. Revisit the widths in
`+page.server.ts` if `--column-width` changes, along with `ARTWORK_SIZES` in `Poster.svelte`.

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

The artwork's `sizes` is `ARTWORK_SIZES` at the top of the component, and repeats
`--column-width` as a literal since an HTML attribute cannot read a custom property — keep
the two in step. Its `srcset` is built in `+page.server.ts`; see above.

The `artwork-*.avif` and `artwork-*.jpg` files still in `static/` are left over from before
the artwork came from Sanity, and nothing references them any more. They are 5.5 MB of the
deploy.

`src/lib/components/WorldAffairsLogo/WorldAffairsLogo.svelte` holds the mark inline so its
colours are addressable. It fills whatever box it is given and takes `color`, `background`
and `detail` props — each also settable as a `--wa-logo-*` custom property, and each falling
back to `currentColor` so the mark tracks the surrounding text by default.

`static/favicon.png` is the same mark, copied from `worldaffairs.se` so the two sites share a
tab icon. Its background is transparent, which reads as black artwork on whatever the browser
puts behind it.

## Deploying

A separate Netlify site from the same repo. **The base directory has to be
`packages/collected-works`** — leave the dashboard's build command and publish directory
empty, since `netlify.toml` supplies both:

| Setting           | Value                      |
| ----------------- | -------------------------- |
| Base directory    | `packages/collected-works` |
| Build command     | _(from netlify.toml)_      |
| Publish directory | _(from netlify.toml)_      |

That base directory is not a preference. Nothing here prerenders, so `build/` contains no HTML
at all — every route is served by `.netlify/functions-internal/sveltekit-render.mjs`, which
declares its own routing with `path: ["/*"]` and `preferStatic: true`. The adapter writes that
function relative to this package, because that is the working directory pnpm runs a package's
script from, and Netlify has to look for it in the same place. With the base directory at the
repo root it looks there instead, finds nothing, and every page 404s.

It is also what makes `netlify.toml` coherent: Netlify and the adapter then share a working
directory, so `publish = "build"` means the same thing to both. Set base to the repo root and
that stops being true, which is why the command and publish directory cannot simply live in
the dashboard any more.

The adapter is `@sveltejs/adapter-netlify` by name rather than `adapter-auto`. Auto detects
the platform at build time and then fetches the real adapter with a live `pnpm add`, which is
a step worth not depending on in CI; naming the adapter removes it.

Every request invokes the function, which is the cost of live content. If that gets
expensive, a short `cache-control` via `setHeaders` in the loaders would let Netlify's CDN
absorb most of it, at the price of that much staleness after an edit.

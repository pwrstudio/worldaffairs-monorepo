# collected-works

Exhibition site for _Jonatan Leandoer Håstad — Collected Works 2016–2026_, served at
works.worldaffairs.se. A SvelteKit app alongside the main site, sharing this monorepo's
Sanity studio and its generated types.

Run it with `pnpm dev:collected-works` from the repo root, or `pnpm dev` to bring it up
under mprocs together with the main site and the studio.

## The two pages

| Route    | Document                       | Renders                                |
| -------- | ------------------------------ | -------------------------------------- |
| `/`      | `posterInfo`                   | the poster — `Poster.svelte`           |
| `/about` | `exhibitionText`, titled About | the essay behind the poster's one link |

**The About page's studio type is still called `exhibitionText`.** `about` was already taken
by the main site's own singleton, and the two sites share one studio, so the id could not
follow the rename. Only the id is legacy: the route, the page, the types in this package and
the studio's own label all read "About". Renaming the type properly would orphan the existing
document and need a migration; there was nothing in it worth that at the time.

## How the content is wired

Each page's shape is derived from its studio singleton rather than written out by hand:

- The schemas live in `packages/sanity/schemaTypes/PosterInfo.ts` and `ExhibitionText.ts` —
  the same studio the main site uses, on project `fzoco9f8`. Both are registered as
  singletons in `sanity.config.ts` and sit together under **Collected Works** at the foot of
  the desk structure.
- Their fields are pulled into this package's `PosterInfo` and `About` types from the
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

## Sharing and the head

`src/lib/components/Meta/Meta.svelte` writes every tag in the head that `app.html` does not,
and both pages render it. What is shared is the exhibition rather than the page it was copied
from, so `og:title`, `og:description` and the image are identical on `/` and `/about`. The
only thing a page passes is its own `<title>`, which is a different job — it names the tab and
the search result, so it does say which page you are on. The copy itself is in
`src/lib/constants/index.ts`.

`og:url` and the canonical link are built from the route and `SITE_URL` rather than from the
URL the visitor arrived on, so a link pasted with campaign parameters still names the page
itself and not a copy of it.

The card's image is built by `buildShareImage()` in `src/lib/modules/share/`, from the same
`posterInfo` artwork the poster prints — a new painting in the studio is a new card on the
next scrape, with no second copy in `static/` to remember to replace. Both loaders call it,
and the About query already reads `posterInfo` for its billing, so the two extra fields cost
no round trip. Three things about it are load-bearing:

- **1200 x 630, filled rather than cropped.** The painting is square and the card is not, so
  `fit=fill` prints the work whole on the sheet's green rather than cutting a letterbox out of
  it. That green is `SITE_BG`, the third place the hex is written down — keep it in step with
  `--color-bg` in `global.css` and `theme-color` in `app.html`.
- **`ignoreImageParams()` is not optional.** Handed both a width and a height, `urlFor()`
  resolves the image's crop and hotspot into a `rect` and cuts a 1200:630 band out of the
  source before the fit is ever applied — it does this even with neither set in the studio,
  defaulting to a centre hotspot against the dimensions the asset id carries. The flag is what
  leaves the fill anything to do. Drop it and the card becomes the middle of a painting.
- **JPEG, pinned.** The poster's own `<img>` uses `auto('format')`, which negotiates on the
  `Accept` header. A crawler's is unreliable or absent, and one handed AVIF or WebP may render
  no card at all.

## The column

`src/routes/+layout.svelte` owns the column both pages sit in, and `:root` in
`src/lib/styles/global.css` owns its width, rhythm, type and hairline colour. A page renders
straight into the column, so its blocks are block-level children of one fixed measure and line
up on its centre without a width or a horizontal margin of their own — each only declares the
space under it. A component keeps only what belongs to it alone: `Poster.svelte` holds the
artwork keyline and the logo size, and nothing else.

The tokens, in `global.css` unless marked otherwise:

| Property                                      | Is                                                        |
| --------------------------------------------- | --------------------------------------------------------- |
| `--page-padding` / `--page-padding-inline`    | the margin round the column, 2rem at the sides on a phone |
| `--column-width`                              | the column, 360px                                         |
| `--space-top` / `--space-bottom`              | the column's own padding, 48px / 32px                     |
| `--space-section` / `--half-space-section`    | between blocks, 16px / 8px                                |
| `--type-size-large` / `--line-height-large`   | the billing and the text title, 24px / 0.9                |
| `--type-size-medium` / `--line-height-medium` | stacked lines, 18px / 1.1                                 |
| `--line-height-body`                          | running prose on the text page, 1.2                       |
| `--rule-width` / `--color-fg-semi`            | the hairlines between sections, 1px                       |
| `--line-width`                                | the artwork keyline, 3px — `Poster.svelte`                |
| `--logo-width`                                | the mark in the logo bar, 64px — `Poster.svelte`          |

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

A separate Netlify site from the same repo, with these dashboard settings:

| Setting           | Value                      |
| ----------------- | -------------------------- |
| Base directory    | `packages/collected-works` |
| Package directory | _(empty)_                  |
| Build command     | `pnpm build`               |
| Publish directory | `build`                    |

**Every path in those fields is relative to the base directory**, which is the one thing that
makes this easy to get wrong. Setting base to the package while the other fields still read
`packages/collected-works/...` from when base was the repo root re-interprets them one level
deeper, and the publish directory becomes
`packages/collected-works/packages/collected-works/build`. A package directory left doubled
the same way also stops Netlify finding this `netlify.toml` at all, at which point it falls
back to the dashboard values silently.

The build command and publish directory repeat what `netlify.toml` already says. That is
deliberate: which of the two wins has not been consistent across builds, so it is simpler to
have them agree than to reason about precedence.

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

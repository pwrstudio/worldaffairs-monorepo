---
phase: 08-meta-tag-fix
plan: 01
subsystem: sveltekit-meta
tags: [seo, meta-tags, og-tags, bug-fix]
dependency-graph:
  requires: []
  provides: [per-page-og-tags]
  affects: [app-html, home-page, archive-pages]
tech-stack:
  added: []
  patterns: [per-page-meta-via-svelte-head]
key-files:
  created: []
  modified:
    - packages/sveltekit/src/app.html
    - packages/sveltekit/src/routes/+page.svelte
decisions:
  - Move all OG/twitter/description meta from app.html to per-page svelte:head blocks
metrics:
  duration: ~1min
  completed: 2026-02-24
---

# Phase 8 Plan 1: Meta Tag Fix Summary

Moved hardcoded OG/twitter/description meta tags from app.html shell to per-page svelte:head blocks so archive pages render only their own collection-specific metadata for crawlers and social media previews.

## What Was Done

### Task 1: Move OG meta tags from app.html to home page svelte:head (048d1ae)

**Problem:** `app.html` had hardcoded OG meta tags (og:title, og:description, og:type, og:url, og:image, twitter:card, twitter:title, twitter:description, twitter:image:src) plus a `name="description"` tag and a `<title>` tag. These appeared BEFORE `%sveltekit.head%`, so crawlers always saw the main page values first, ignoring archive-specific `<svelte:head>` values.

**Fix:**
- Removed all OG, twitter, description, and title tags from `packages/sveltekit/src/app.html`
- app.html now contains only universal non-content tags: charset, favicon, preload, viewport, stylesheet, theme-color
- Added all removed meta tags to `packages/sveltekit/src/routes/+page.svelte` inside `<svelte:head>`
- Archive page `packages/sveltekit/src/routes/archive/[slug]/+page.svelte` was left unchanged -- its existing `<svelte:head>` OG tags are now the only OG tags in the rendered HTML for archive pages

**Files modified:**
- `packages/sveltekit/src/app.html` -- stripped of all content-specific meta tags (20 lines removed, net -10 lines)
- `packages/sveltekit/src/routes/+page.svelte` -- expanded svelte:head from 1 tag (title) to 11 tags (title + description + 5 OG + 4 twitter)

### Task 2: Verify meta tags render correctly for crawlers (checkpoint:human-verify)

**Status:** Pending human verification. User should:
1. Start dev server (`pnpm dev:sveltekit`)
2. View source on home page -- confirm OG tags present with "World Affairs AB" values, appearing once
3. View source on an archive page -- confirm only collection-specific OG tags, no "World Affairs AB" og:title

## Verification Results

- svelte-check: 0 errors, 1 pre-existing warning (unrelated to changes)
- Automated checks: all 3 PASS (no og in app.html, og:title in home page, archive og:title intact)
- No title/twitter/description tags remain in app.html

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Task | Commit  | Description                                         |
| ---- | ------- | --------------------------------------------------- |
| 1    | 048d1ae | fix(08-01): move OG meta tags from app.html to per-page svelte:head |

## Self-Check: PASSED

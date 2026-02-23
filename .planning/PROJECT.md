# World Affairs — Archive Refactor

## What This Is

A personal website for World Affairs built with SvelteKit and Sanity CMS. The site displays music releases, videos, tour dates, news, a store, and a portfolio of works (being renamed to "Archive" / "Collections"). This milestone renames the Works section to Archive/Collection and adds new fields to the collection document type.

## Core Value

The Archive section clearly presents collections of media (images, audio, video) with flexible default views and proper credits/year metadata per media item.

## Requirements

### Validated

<!-- Existing capabilities inferred from codebase -->

- ✓ Home page with sections: about, releases, videos, tour dates, news, store, works — existing
- ✓ Works list displayed as table on home page — existing
- ✓ Work detail page with multi-view display (slideshow, text, grid) — existing
- ✓ Media slideshow with Swiper carousel, keyboard navigation, touch gestures — existing
- ✓ Server-side rendering with SvelteKit and Sanity CMS data loading — existing
- ✓ Sanity studio for content management — existing
- ✓ Tour date import scripts — existing

### Active

- [ ] Rename "Works" to "Archive" (section/plural) and "Work" to "Collection" (document/singular) across Sanity schema, desk structure, and SvelteKit client
- [ ] Add `credits` field (text) to each media item in collection document
- [ ] Add `year` field to each media item in collection document
- [ ] Add radio-style input for default view on collection document: image, text, or grid (default: image)

### Out of Scope

- URL path changes (`/works/[slug]` stays as-is) — avoid breaking existing links
- Any changes to other sections (music, video, tour dates, store, etc.) — not part of this work
- New functionality beyond renaming and field additions — keep scope tight

## Context

- Monorepo with `packages/sveltekit/` (frontend) and `packages/sanity/` (CMS)
- Sanity schema types in `packages/sanity/schemaTypes/`
- Desk structure configured in Sanity studio
- GROQ queries in `packages/sveltekit/src/lib/groq/`
- Work components in `packages/sveltekit/src/lib/components/Works/`
- WorkDetail already supports three view modes (slideshow, text, grid) — the new radio field sets which is shown by default
- Types generated from Sanity schema via `@sanity-types` alias

## Constraints

- **Tech stack**: SvelteKit + Sanity CMS monorepo — no changes to stack
- **URLs**: Keep `/works/[slug]` route path unchanged to avoid breaking links
- **Compatibility**: Must regenerate Sanity types after schema changes (`typegen:sanity`)

## Key Decisions

| Decision                              | Rationale                                              | Outcome   |
| ------------------------------------- | ------------------------------------------------------ | --------- |
| Keep `/works/[slug]` URL path         | Avoid breaking existing links and bookmarks            | — Pending |
| Three view options: image, text, grid | User specified; maps to existing WorkDetail view modes | — Pending |
| Default view: image                   | User specified                                         | — Pending |

---

_Last updated: 2026-02-23 after initialization_

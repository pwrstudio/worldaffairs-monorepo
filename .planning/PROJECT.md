# World Affairs

## What This Is

A personal website for World Affairs built with SvelteKit and Sanity CMS. The site displays music releases, videos, tour dates, news, a store, and an Archive of collections — each collection containing media items (images, audio, video) with credits, year metadata, and configurable default views.

## Core Value

The Archive section clearly presents collections of media with flexible default views and proper credits/year metadata per media item.

## Requirements

### Validated

- ✓ Home page with sections: about, releases, videos, tour dates, news, store, archive — existing
- ✓ Archive list displayed as table on home page — existing
- ✓ Collection detail page with multi-view display (slideshow, text, grid) — existing
- ✓ Media slideshow with Swiper carousel, keyboard navigation, touch gestures — existing
- ✓ Server-side rendering with SvelteKit and Sanity CMS data loading — existing
- ✓ Sanity studio for content management with Archive desk structure — existing
- ✓ Tour date import scripts — existing
- ✓ Renamed Works → Archive / Collection across Sanity and client — v1.0
- ✓ Credits and year fields on each media item in collections — v1.0
- ✓ Default view radio (image/text/grid) on collection documents — v1.0
- ✓ WorkDetail initializes view mode from Sanity defaultView field — v1.0

### Active

(None — milestone complete)

### Out of Scope

- URL path changes (`/works/[slug]` stays as-is) — avoid breaking existing links
- Exhaustive internal variable renaming — only user-facing labels changed

## Context

- Monorepo with `packages/sveltekit/` (frontend) and `packages/sanity/` (CMS)
- Sanity schema internal name remains `work` (preserves existing documents and GROQ queries)
- Sanity types regenerated and TypeScript compilation verified clean
- `defaultView` maps to WorkDetail view modes: image→slideshow, text→text, grid→grid

## Constraints

- **Tech stack**: SvelteKit + Sanity CMS monorepo — no changes to stack
- **URLs**: `/works/[slug]` route path unchanged
- **Compatibility**: Sanity types must be regenerated after schema changes

## Key Decisions

| Decision                               | Rationale                                                      | Outcome |
| -------------------------------------- | -------------------------------------------------------------- | ------- |
| Keep `/works/[slug]` URL path          | Avoid breaking existing links and bookmarks                    | ✓ Good  |
| Three view options: image, text, grid  | Maps to existing WorkDetail view modes                         | ✓ Good  |
| Default view: image                    | User specified, maps to slideshow mode                         | ✓ Good  |
| Keep internal `name: 'work'` in schema | Preserves existing Sanity documents and GROQ queries           | ✓ Good  |
| Map 'image' → 'slideshow' in client    | Sanity uses 'image' but WorkDetail uses 'slideshow' internally | ✓ Good  |

---

_Last updated: 2026-02-23 after v1.0 milestone_

# World Affairs

## What This Is

A personal website for World Affairs built with SvelteKit and Sanity CMS. The site displays music releases, videos, tour dates, news, a store, and an Archive of collections — each collection containing media items (images, audio, video) with credits, year metadata, configurable default views, OG metadata for social sharing, and mobile-friendly view toggling.

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
- ✓ Archive page OG meta tags (title, description, image, canonical URL) — v1.1
- ✓ Page title resets to default when navigating from archive to home — v1.1
- ✓ "Page last updated" footer with locale-formatted date on archive pages — v1.1
- ✓ Mobile view selector hidden; tap top bar to toggle views — v1.1

### Active

(None — planning next milestone)

### Out of Scope

- URL path changes (`/works/[slug]` stays as-is) — avoid breaking existing links
- Exhaustive internal variable renaming — only user-facing labels changed
- Custom excerpt field in Sanity — truncated intro is sufficient
- Twitter/X specific card customization — standard OG tags cover Twitter cards
- Mobile view indicator (dot/label) — content change is sufficient visual feedback
- Desktop top bar changes — only mobile behavior changes

## Context

Shipped v1.0 (Archive Refactor) and v1.1 (Archive Polish).
Monorepo with `packages/sveltekit/` (frontend) and `packages/sanity/` (CMS).
Sanity schema internal name remains `work` (preserves existing documents and GROQ queries).
Archive detail pages have full OG metadata, last-updated footers, and mobile-friendly view toggling.

## Constraints

- **Tech stack**: SvelteKit + Sanity CMS monorepo — no changes to stack
- **URLs**: `/works/[slug]` route path unchanged
- **Compatibility**: Sanity types must be regenerated after schema changes

## Key Decisions

| Decision                               | Rationale                                                      | Outcome   |
| -------------------------------------- | -------------------------------------------------------------- | --------- |
| Keep `/works/[slug]` URL path          | Avoid breaking existing links and bookmarks                    | ✓ Good    |
| Three view options: image, text, grid  | Maps to existing WorkDetail view modes                         | ✓ Good    |
| Default view: image                    | User specified, maps to slideshow mode                         | ✓ Good    |
| Keep internal `name: 'work'` in schema | Preserves existing Sanity documents and GROQ queries           | ✓ Good    |
| Map 'image' → 'slideshow' in client    | Sanity uses 'image' but WorkDetail uses 'slideshow' internally | ✓ Good    |
| OG description from truncated intro    | intro is plain string, no PortableText conversion needed       | ✓ Good    |
| Conditional OG image rendering         | Only emit og:image when an imageMedia item exists              | ✓ Good    |
| Footer as flex column sibling          | Appears at page bottom in both slideshow and table view        | ✓ Good    |
| onclick + stopPropagation pattern      | Clean mobile tap-toggle without interfering with desktop radio | ✓ Good    |
| Binary slideshow/table toggle          | Simplest mobile UX; grid mode accessible via desktop           | ✓ Good    |

---

*Last updated: 2026-02-24 after v1.1 milestone*

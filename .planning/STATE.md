# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-24)

**Core value:** The Archive section clearly presents collections of media with flexible default views and proper credits/year metadata per media item.
**Current focus:** v1.1 Archive Polish — Phase 5 (next)

## Current Position

Phase: 5 of 5 (Mobile Top Bar) — IN PROGRESS
Plan: 1 of 1 in current phase — COMPLETE
Status: Phase 5 plan 1 complete
Last activity: 2026-02-24 — Completed 05-01 (mobile top bar tap-to-toggle)

Progress: [█████████░] 90% (v1.0 complete, v1.1 phases 1-5 plan 1 complete)

## Performance Metrics

**Velocity:**

- Total plans completed: 4
- Average duration: unknown
- Total execution time: unknown

**By Phase:**

| Phase                       | Plans | Total | Avg/Plan |
| --------------------------- | ----- | ----- | -------- |
| 1. Sanity Renames           | 1/1   | -     | -        |
| 2. Schema Fields            | 1/1   | -     | -        |
| 3. Client Updates           | 1/1   | -     | -        |
| 4. Page Metadata and Footer | 2/2   | ~2min | ~1min    |
| 5. Mobile Top Bar           | 1/1   | ~1min | ~1min    |

_Updated after each plan completion_

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Keep `/works/[slug]` URL path unchanged to avoid breaking existing links
- Sanity 'image' defaultView maps to component 'slideshow' mode — naming mismatch bridged via defaultViewToMode()
- viewMode stays $state (not $derived) so user can interactively switch views after initial load from defaultView
- OG description uses work.intro.slice(0, 155) — intro is plain string, not PortableText
- OG image rendered conditionally; only emits og:image tag when an imageMedia item exists
- lastUpdated prop passed to WorkLayout now, silently ignored until 04-02 consumes it
- Footer placed as direct child of .work-layout flex column so it appears at page bottom in both view modes
- flex-shrink: 0 prevents footer collapsing under height pressure from .content (flex: 1)
- onclick on header + stopPropagation on .view-selection-outer: clean mobile tap-toggle without interfering with desktop radio buttons
- toggleViewMode() cycles slideshow -> table -> slideshow; cursor:pointer only in mobile media query

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-24
Stopped at: Completed 05-01-PLAN.md (mobile top bar tap-to-toggle, hidden view selector on mobile)
Resume file: None

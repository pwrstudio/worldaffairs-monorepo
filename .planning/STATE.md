# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-24)

**Core value:** The Archive section clearly presents collections of media with flexible default views and proper credits/year metadata per media item.
**Current focus:** Milestone v1.1 Archive Polish

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-02-24 — Milestone v1.1 started

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Keep `/works/[slug]` URL path unchanged to avoid breaking existing links
- Three view options: image, text, grid — maps to existing WorkDetail view modes
- Default view is image
- Keep `name: 'work'` unchanged in Work.ts — internal identifier used in GROQ queries and existing documents
- No ordering on Archive desk structure list — work documents lack a sortable date field
- MdWork icon reused for Archive navigation item (already imported, semantically appropriate)
- Per-media credits/year fields are separate from existing root-level credits field — intentional dual-scope design
- defaultView uses string type with options.list for radio rendering — generates 'image' | 'text' | 'grid' union type
- year field uses optional validation (no Rule.required()) so existing media items do not fail validation
- TableType.Works enum value changed to 'archive' — no CSS rules target .works class so safe to change
- Sanity 'image' defaultView maps to component 'slideshow' mode — naming mismatch bridged via defaultViewToMode()
- viewMode stays $state (not $derived) so user can interactively switch views after initial load from defaultView

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-24
Stopped at: Starting milestone v1.1 Archive Polish
Resume file: None

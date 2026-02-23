---
phase: 01-sanity-renames
plan: 01
subsystem: ui
tags: [sanity, cms, schema, desk-structure, typescript]

# Dependency graph
requires: []
provides:
    - 'Collection display title in Sanity Studio document type picker'
    - 'Archive navigation item in Sanity Studio desk structure filtering on work documents'
affects:
    - 'content editors using Sanity Studio'
    - 'future phases referencing Sanity schema or desk structure'

# Tech tracking
tech-stack:
    added: []
    patterns:
        - "Sanity desk structure: document list items with .filter('_type == $type').params({ type: 'work' }) pattern"

key-files:
    created: []
    modified:
        - packages/sanity/schemaTypes/Work.ts
        - packages/sanity/deskStructure.ts

key-decisions:
    - "Keep name: 'work' unchanged — internal identifier used in GROQ queries and existing documents"
    - 'No ordering on Archive list — work documents lack a sortable date field'
    - 'MdWork icon reused for Archive — already imported, appropriate for archive/work content'

patterns-established:
    - 'Sanity display title vs internal name: title is UI-facing, name is the stable type identifier'

requirements-completed: [RENAME-01, RENAME-02]

# Metrics
duration: 1min
completed: 2026-02-23
---

# Phase 1 Plan 1: Sanity Renames Summary

**Sanity Studio renamed to display 'Collection' as document type and added 'Archive' navigation item to desk structure**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-23T16:55:48Z
- **Completed:** 2026-02-23T16:56:31Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Renamed `title: 'Work'` to `title: 'Collection'` in Work.ts schema — Studio UI now shows "Collection" in document picker
- Added Archive navigation list item in deskStructure.ts after Products with divider — editors can browse all work/collection documents via sidebar
- Both changes preserve backward compatibility: `name: 'work'` identifier untouched, no GROQ queries or existing documents affected

## Task Commits

Each task was committed atomically:

1. **Task 1: Rename document type display title from Work to Collection** - `12b752e` (feat)
2. **Task 2: Add Archive navigation item to Sanity desk structure** - `398a4bb` (feat)

**Plan metadata:** `2f3b98f` (docs: complete plan)

## Files Created/Modified

- `packages/sanity/schemaTypes/Work.ts` - Changed title from 'Work' to 'Collection'; name: 'work' unchanged
- `packages/sanity/deskStructure.ts` - Added S.divider() + Archive list item after Products entry

## Decisions Made

- Kept `name: 'work'` unchanged — this is the internal document type identifier. Renaming it would break all GROQ queries and invalidate existing stored documents in Sanity dataset.
- No `defaultOrdering` added to Archive list item — work/collection documents do not have a date field like releases/videos do, so there is no appropriate field to sort by.
- Used the existing `MdWork` icon for the Archive item — already imported at the top of deskStructure.ts, semantically appropriate for archive/collection content.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Sanity Studio UI labels are aligned with Archive/Collection naming convention
- No blockers — both changes are isolated to Sanity package, SvelteKit frontend unaffected
- Ready for subsequent phases that build the frontend Archive section

## Self-Check: PASSED

- packages/sanity/schemaTypes/Work.ts — FOUND
- packages/sanity/deskStructure.ts — FOUND
- .planning/phases/01-sanity-renames/01-01-SUMMARY.md — FOUND
- Commit 12b752e — FOUND
- Commit 398a4bb — FOUND

---

_Phase: 01-sanity-renames_
_Completed: 2026-02-23_

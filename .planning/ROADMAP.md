# Roadmap: World Affairs — Archive Refactor

## Overview

A focused refactor to rename the Works section to Archive/Collection and add new fields (credits, year, defaultView) to the collection document type. Sanity CMS changes land first, then client integration follows once types are regenerated.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Sanity Renames** - Rename document type and desk structure in Sanity CMS
- [ ] **Phase 2: Schema Fields** - Add credits, year, and defaultView fields to collection document
- [ ] **Phase 3: Client Updates** - Rename client-side references and wire defaultView to WorkDetail

## Phase Details

### Phase 1: Sanity Renames
**Goal**: The Sanity CMS reflects the new Archive/Collection naming throughout schema and desk structure
**Depends on**: Nothing (first phase)
**Requirements**: RENAME-01, RENAME-02
**Success Criteria** (what must be TRUE):
  1. Sanity Studio displays "Collection" as the document type title (not "Work")
  2. Sanity Studio desk structure shows "Archive" as the list item label (not "Works")
  3. Creating and editing collection documents works normally after rename
**Plans**: TBD

### Phase 2: Schema Fields
**Goal**: Each media item in a collection document exposes credits and year fields, and the collection document has a defaultView radio field
**Depends on**: Phase 1
**Requirements**: FIELD-01, FIELD-02, FIELD-03
**Success Criteria** (what must be TRUE):
  1. Each media item in Sanity Studio shows a credits text input
  2. Each media item in Sanity Studio shows a year input
  3. The collection document shows a defaultView radio with options image, text, grid (defaulting to image)
  4. Sanity types are regenerated and TypeScript compilation passes
**Plans**: TBD

### Phase 3: Client Updates
**Goal**: The SvelteKit frontend reflects Archive/Collection naming and the WorkDetail component uses the defaultView field to set its initial view mode
**Depends on**: Phase 2
**Requirements**: RENAME-03, RENAME-04, CLIENT-01
**Success Criteria** (what must be TRUE):
  1. The home page section heading and table heading read "Archive" (not "Works")
  2. WorkDetail opens in the view mode set on the collection document in Sanity (image, text, or grid)
  3. All three default view options (image, text, grid) correctly control the initial view when visiting a collection page
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Sanity Renames | 0/TBD | Not started | - |
| 2. Schema Fields | 0/TBD | Not started | - |
| 3. Client Updates | 0/TBD | Not started | - |

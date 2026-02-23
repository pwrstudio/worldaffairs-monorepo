# Requirements: World Affairs — Archive Refactor

**Defined:** 2026-02-23
**Core Value:** The Archive section clearly presents collections of media with flexible default views and proper credits/year metadata per media item.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### Renaming

- [ ] **RENAME-01**: Sanity document type title renamed from "Work" to "Collection" in schema
- [ ] **RENAME-02**: Sanity desk structure list item renamed from "Works" to "Archive"
- [ ] **RENAME-03**: "Works" table heading and section references renamed to "Archive" in SvelteKit client
- [ ] **RENAME-04**: Component references and variable names renamed from "work(s)" to "collection(s)" where user-facing

### Schema Fields

- [ ] **FIELD-01**: Each media item in collection document has a `credits` text field
- [ ] **FIELD-02**: Each media item in collection document has a `year` field
- [ ] **FIELD-03**: Collection document has a `defaultView` radio field with options: image, text, grid (default: image)

### Client Integration

- [ ] **CLIENT-01**: WorkDetail component uses `defaultView` field value to set initial view mode

## v2 Requirements

None — this is a focused refactor milestone.

## Out of Scope

| Feature | Reason |
|---------|--------|
| URL path changes (`/works/[slug]`) | Avoid breaking existing links and bookmarks |
| Renaming internal code variables exhaustively | Only rename where user-facing; internal plumbing can stay |
| Changes to other sections (music, video, etc.) | Not part of this milestone |
| New views or display modes | Only wiring existing views to the new defaultView field |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| RENAME-01 | Phase 1 | Pending |
| RENAME-02 | Phase 1 | Pending |
| RENAME-03 | Phase 3 | Pending |
| RENAME-04 | Phase 3 | Pending |
| FIELD-01 | Phase 2 | Pending |
| FIELD-02 | Phase 2 | Pending |
| FIELD-03 | Phase 2 | Pending |
| CLIENT-01 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 after roadmap creation*

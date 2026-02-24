# Requirements: World Affairs

**Defined:** 2026-02-24
**Core Value:** The Archive section clearly presents collections of media with flexible default views and proper credits/year metadata per media item.

## v1.2 Requirements

Requirements for milestone v1.2 UI Refinements. Each maps to roadmap phases.

### Radio Component

- [x] **RADIO-01**: Archive top bar view selector uses custom-styled radio buttons instead of browser defaults
- [x] **RADIO-02**: Custom radio component accepts styling props for visual customization (colors, sizes, shapes)

### Navigation

- [x] **NAV-01**: Mobile archive top bar shows "X" back element on the left side linking to /#archive
- [x] **NAV-02**: Back element has same width as arrow sections in bottom bar, with a right border
- [x] **NAV-03**: Archive title text remains perfectly horizontally centered with back element present

### Meta Tags

- [x] **META-06**: Archive page meta/OG tags are correctly rendered for crawlers (no main page metadata leaking)

## Future Requirements

None — all features scoped to v1.2.

## Out of Scope

| Feature                           | Reason                                          |
| --------------------------------- | ----------------------------------------------- |
| Radio component animations        | Visual styling only for v1.2, no transitions    |
| Desktop top bar layout changes    | Only mobile gets the back button                |
| Twitter/X specific card tags      | Standard OG tags cover Twitter cards adequately |
| Full meta tag audit (non-archive) | Only archive page meta tags are in scope        |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
| ----------- | ----- | ------ |
| RADIO-01    | 6     | Done   |
| RADIO-02    | 6     | Done   |
| NAV-01      | 7     | Done   |
| NAV-02      | 7     | Done   |
| NAV-03      | 7     | Done   |
| META-06     | 8     | Done   |

**Coverage:**

- v1.2 requirements: 6 total
- Mapped to phases: 6
- Unmapped: 0

---

_Requirements defined: 2026-02-24_
_Last updated: 2026-02-24 after Phase 8 completion_

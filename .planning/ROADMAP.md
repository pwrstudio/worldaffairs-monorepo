# Roadmap: World Affairs

## Milestones

- ✅ **v1.0 Archive Refactor** — Phases 1-3 (shipped 2026-02-23)
- ✅ **v1.1 Archive Polish** — Phases 4-5 (shipped 2026-02-24)
- 🔄 **v1.2 UI Refinements** — Phases 6-8 (in progress)

## Phases

<details>
<summary>✅ v1.0 Archive Refactor (Phases 1-3) — SHIPPED 2026-02-23</summary>

- [x] Phase 1: Sanity Renames (1/1 plans) — completed 2026-02-23
- [x] Phase 2: Schema Fields (1/1 plans) — completed 2026-02-23
- [x] Phase 3: Client Updates (1/1 plans) — completed 2026-02-23

</details>

<details>
<summary>✅ v1.1 Archive Polish (Phases 4-5) — SHIPPED 2026-02-24</summary>

- [x] Phase 4: Page Metadata and Footer (2/2 plans) — completed 2026-02-24
- [x] Phase 5: Mobile Top Bar (1/1 plan) — completed 2026-02-24

</details>

**v1.2 UI Refinements**

- [x] **Phase 6: Custom Radio Component** - Build and integrate a styled radio component replacing browser defaults in the archive top bar
- [ ] **Phase 7: Mobile Back Button** - Add "X" back element to mobile archive top bar with centered title layout
- [ ] **Phase 8: Meta Tag Fix** - Investigate and fix archive page OG/meta tags leaking main page metadata to crawlers

## Phase Details

### Phase 6: Custom Radio Component
**Goal**: Archive top bar view selector uses a visually styled custom radio component instead of browser-default inputs
**Depends on**: Nothing (self-contained UI component work)
**Requirements**: RADIO-01, RADIO-02
**Success Criteria** (what must be TRUE):
  1. Archive top bar view buttons no longer render as browser-default radio inputs
  2. The custom radio component accepts color, size, and shape props for visual customization
  3. Selecting a view (image/text/grid) still changes the archive display correctly
**Plans:** 1 plan
Plans:
- [x] 06-01-PLAN.md — Create RadioGroup component with styling props and integrate into WorkTopBar

### Phase 7: Mobile Back Button
**Goal**: Mobile users can navigate back to the archive list from a collection page using a clearly visible "X" element in the top bar, without the title shifting off-center
**Depends on**: Phase 6 (top bar already modified)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. On mobile, the archive top bar shows an "X" back element on the left side
  2. Tapping the "X" navigates to /#archive
  3. The "X" element has the same width as the bottom bar arrow sections and a right border
  4. The archive collection title remains perfectly horizontally centered with the back element present
**Plans:** 1 plan
Plans:
- [ ] 07-01-PLAN.md — Add mobile X back element with centered title layout

### Phase 8: Meta Tag Fix
**Goal**: Archive collection pages render correct OG/meta tags that crawlers pick up, with no main page metadata leaking through
**Depends on**: Nothing (isolated bug fix)
**Requirements**: META-06
**Success Criteria** (what must be TRUE):
  1. Sharing an archive collection URL on social media shows the collection's own title and description, not the main page metadata
  2. The og:title, og:description, and og:image tags on archive collection pages contain collection-specific values when inspected
**Plans**: TBD

## Progress

| Phase                       | Milestone | Plans Complete | Status      | Completed  |
| --------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. Sanity Renames           | v1.0      | 1/1            | Complete    | 2026-02-23 |
| 2. Schema Fields            | v1.0      | 1/1            | Complete    | 2026-02-23 |
| 3. Client Updates           | v1.0      | 1/1            | Complete    | 2026-02-23 |
| 4. Page Metadata and Footer | v1.1      | 2/2            | Complete    | 2026-02-24 |
| 5. Mobile Top Bar           | v1.1      | 1/1            | Complete    | 2026-02-24 |
| 6. Custom Radio Component   | v1.2      | 1/1            | Complete    | 2026-02-24 |
| 7. Mobile Back Button       | v1.2      | 0/1            | Not started | -          |
| 8. Meta Tag Fix             | v1.2      | 0/1            | Not started | -          |

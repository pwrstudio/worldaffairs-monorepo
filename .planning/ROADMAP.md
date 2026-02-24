# Roadmap: World Affairs

## Milestones

- completed **v1.0 Archive Refactor** - Phases 1-3 (shipped 2026-02-23)
- in-progress **v1.1 Archive Polish** - Phases 4-5 (in progress)

## Phases

<details>
<summary>v1.0 Archive Refactor (Phases 1-3) - SHIPPED 2026-02-23</summary>

### Phase 1: Sanity Renames
**Goal**: User-facing labels in Sanity Studio read "Archive" and "Collection"
**Plans**: 1 plan

Plans:
- [x] 01-01: Rename Works → Archive / Collection in Sanity desk and schemas

### Phase 2: Schema Fields
**Goal**: Each media item in a collection can carry credits, year, and a default view is set per collection
**Plans**: 1 plan

Plans:
- [x] 02-01: Add credits, year, and defaultView fields to Sanity schema

### Phase 3: Client Updates
**Goal**: The archive detail page initializes its view mode from the Sanity defaultView field
**Plans**: 1 plan

Plans:
- [x] 03-01: Wire defaultView from Sanity data into WorkDetail view state

</details>

### v1.1 Archive Polish (In Progress)

**Milestone Goal:** Improve archive detail pages with OG metadata, last-updated timestamps, and mobile-friendly view toggling.

#### Phase 4: Page Metadata and Footer
**Goal**: Archive detail pages surface their content through standard page metadata and show when they were last updated
**Depends on**: Phase 3
**Requirements**: META-01, META-02, META-03, META-04, META-05, FOOT-01
**Success Criteria** (what must be TRUE):
  1. Sharing an archive page URL produces a card with the work title, truncated intro, and first image
  2. The browser tab and search snippet show "{work title} | World Affairs AB" while on an archive page
  3. Navigating from an archive page back to the home page resets the browser tab title to "World Affairs AB"
  4. The archive page footer displays the work document's last-updated date
  5. The canonical URL in page head points to the archive page URL
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md — OG tags, canonical URL, page title, and home title reset
- [ ] 04-02-PLAN.md — Last-updated footer strip in archive page layout

#### Phase 5: Mobile Top Bar
**Goal**: Mobile users can switch archive views by tapping the top bar without a visible view selector cluttering the UI
**Depends on**: Phase 4
**Requirements**: MOBI-01, MOBI-02
**Success Criteria** (what must be TRUE):
  1. On mobile, the view selector (radio/dropdown) is not visible in the archive top bar
  2. Tapping the archive top bar on mobile cycles between slideshow and information views
  3. On desktop, the view selector and top bar behavior are unchanged
**Plans**: TBD

Plans:
- [ ] 05-01: Hide view selector on mobile and add tap-to-toggle to archive top bar

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Sanity Renames | v1.0 | 1/1 | Complete | 2026-02-23 |
| 2. Schema Fields | v1.0 | 1/1 | Complete | 2026-02-23 |
| 3. Client Updates | v1.0 | 1/1 | Complete | 2026-02-23 |
| 4. Page Metadata and Footer | 2/2 | Complete    | 2026-02-24 | - |
| 5. Mobile Top Bar | v1.1 | 0/1 | Not started | - |

# Architecture

**Analysis Date:** 2026-02-23

## Pattern Overview

**Overall:** Component-driven web application with CMS-backed content management

**Key Characteristics:**
- SvelteKit-based frontend with server-side data loading
- Sanity CMS as headless content backend
- Server-side rendering for SEO and performance
- Component hierarchy with shared UI patterns
- GROQ query language for content fetching
- Full TypeScript across the stack

## Layers

**Presentation Layer:**
- Purpose: Renders user-facing UI components
- Location: `src/lib/components/`
- Contains: Svelte components (.svelte files) organized by feature
- Depends on: Types, stores, utilities, Sanity data
- Used by: Page routes, other components

**Data Access Layer:**
- Purpose: Manages all communication with Sanity CMS
- Location: `src/lib/modules/sanity/`
- Contains: Sanity client initialization, data fetching functions (`loadData`), rendering utilities (`renderBlockText`, `toPlainText`, `urlFor`)
- Depends on: @sanity/client, @portabletext packages
- Used by: Page loaders (+page.ts files)

**Query Layer:**
- Purpose: Defines GROQ queries for content retrieval
- Location: `src/lib/groq/`
- Contains: Query definitions (`allData`, `workBySlug`)
- Depends on: None
- Used by: Sanity data access module

**State Management:**
- Purpose: Manages component-level reactivity
- Location: `src/lib/modules/stores/` (currently minimal/empty)
- Contains: Svelte stores (if needed)
- Depends on: Svelte
- Used by: Components requiring shared state

**Routing Layer:**
- Purpose: Maps URLs to content and loads server-side data
- Location: `src/routes/`
- Contains: Page components (+page.svelte) and loaders (+page.ts)
- Depends on: Data access layer, page components
- Used by: SvelteKit framework

**Infrastructure:**
- Purpose: Utilities, types, constants, and configuration
- Location: `src/lib/types/`, `src/lib/constants/`, `src/lib/modules/utils/`
- Contains: Type definitions, configuration values, helper functions
- Depends on: None (or only standard library)
- Used by: All other layers

## Data Flow

**Home Page Load:**

1. User requests `/`
2. SvelteKit calls `src/routes/+page.ts` loader
3. Loader calls `loadData(queries.allData, {})` from Sanity module
4. Sanity client executes combined GROQ query to fetch: about, releases, videos, tourDates, newPosts, storeList, worksList
5. Loader processes raw data: filters tour dates by current date, extracts nested arrays, determines siteLastUpdated
6. Loader returns data object to `+page.svelte`
7. Page component receives data via export `data` prop
8. Page component renders multiple table/section components, passing relevant subsets of data
9. Components conditionally render sections (e.g., only show works if `hasWorks` is true)

**Work Detail View:**

1. User clicks link to `/works/[slug]`
2. SvelteKit calls `src/routes/works/[slug]/+page.ts` with slug param
3. Loader calls `loadData(queries.workBySlug, { slug })`
4. Query fetches work document with nested media array (images, audio, video)
5. If not found, loader throws 404 error
6. Loader returns work object to `+page.svelte`
7. Page component passes work to WorkDetail component
8. WorkDetail manages view mode state (slideshow, text, grid)
9. MediaSlideshow component uses Swiper library for carousel functionality

**State Management:**

- Reactive state is component-local using Svelte 5 `$state` rune
- No global stores currently in use
- Server-side data passed down via props using SvelteKit's data loading pattern
- Components manage their own UI state (view modes, slide indices, position)

## Key Abstractions

**DataTable:**
- Purpose: Generic table component for displaying lists of content
- Examples: `src/lib/components/Tables/DataTable.svelte`, `src/lib/components/Tables/WorksTable.svelte`, `src/lib/components/Tables/MusicTable.svelte`
- Pattern: Accepts `Column[]` definition and data rows; renders based on column type (icon, index, text, linkList, internalLink)
- Key feature: Responsive design with mobile-specific hiding of columns

**Work Media Display:**
- Purpose: Multi-view interface for displaying work content (images, audio, video)
- Examples: `src/lib/components/Works/WorkDetail.svelte`, `src/lib/components/Works/MediaSlideshow.svelte`, `src/lib/components/Works/slides/`
- Pattern: WorkDetail manages three view modes (slideshow, text, grid); MediaSlideshow integrates Swiper library for carousel
- Key feature: Keyboard navigation, touch gestures, grid thumbnail selection

**Section Components:**
- Purpose: Self-contained sections of the home page
- Examples: `src/lib/components/Header/`, `src/lib/components/Store/`, `src/lib/components/Clock/`, `src/lib/components/Ticker/`, `src/lib/components/NewsLetter/`, `src/lib/components/Contact/`, `src/lib/components/Footer/`
- Pattern: Each receives specific props from page loader, renders independently with no cross-section communication

## Entry Points

**Home Page:**
- Location: `src/routes/+page.svelte` and `src/routes/+page.ts`
- Triggers: User visits `/`
- Responsibilities: Orchestrates all home page sections, loads all content via single GROQ query, filters tour dates, determines visibility flags

**Work Detail Page:**
- Location: `src/routes/works/[slug]/+page.svelte` and `src/routes/works/[slug]/+page.ts`
- Triggers: User visits `/works/[slug]`
- Responsibilities: Loads specific work with media, renders WorkDetail component with full-screen interface

**Layout Shell:**
- Location: `src/routes/+layout.svelte`
- Triggers: Applied to all routes
- Responsibilities: Imports Swiper CSS, provides basic structure

## Error Handling

**Strategy:** Silent fallback with console warnings for missing data

**Patterns:**
- `loadData()` catches errors and returns `null` instead of throwing (see `src/lib/modules/sanity/index.ts`)
- Loaders handle null returns with fallback values (empty arrays, null values)
- Page components use optional chaining and conditional rendering to display only available data
- 404 errors thrown explicitly for missing work detail pages (see `src/routes/works/[slug]/+page.ts`)
- Console warnings logged for missing critical documents (about, storeList, newPosts)

## Cross-Cutting Concerns

**Logging:**
- Console warnings in `loadData()` for query failures
- Warnings in home page loader for missing critical Sanity documents

**Validation:**
- Tour date filtering based on ISO date strings and timezone-aware comparison
- Type safety via TypeScript with Sanity-generated types (`@sanity-types`)
- Column type validation in DataTable (icon, index, text, linkList, internalLink)

**Authentication:**
- Sanity client uses empty token string (anonymous read-only access to production dataset)
- No user authentication required for public content

---

*Architecture analysis: 2026-02-23*

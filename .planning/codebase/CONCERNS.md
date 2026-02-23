# Codebase Concerns

**Analysis Date:** 2026-02-23

## Tech Debt

**Type-casting with `any` in Sanity integration:**
- Issue: Multiple image and data properties use `any` type to bypass strict TypeScript checks, reducing type safety
- Files: `packages/sveltekit/src/lib/modules/sanity/index.ts` (line 44), `packages/sveltekit/src/lib/components/Works/slides/ImageSlide.svelte` (lines 5), `packages/sveltekit/src/lib/components/Works/MediaSlideshow.svelte` (line 6), `packages/sveltekit/src/routes/+page.ts` (lines 39-40)
- Impact: Potential runtime errors when Sanity schema changes; IDE autocomplete doesn't work for image properties; harder to refactor
- Fix approach: Generate strict TypeScript types from Sanity schema (`sanity typegen generate`) and remove `any` casts; use discriminated unions for different media types

**Unsafe type casting without validation:**
- Issue: `storeListDocument?.posts` and `worksListDocument?.works` are cast `as unknown as Product[]` and `as unknown as Work[]` without validation
- Files: `packages/sveltekit/src/routes/+page.ts` (lines 39-40)
- Impact: If Sanity data structure changes, arrays will silently contain wrong data type; no runtime validation catches mismatches
- Fix approach: Create validation functions using `zod` or similar; validate data before type assertion; ensure GROQ query projections match expected types

**GROQ query filtering logic in application instead of query:**
- Issue: Tour date filtering ("keep dates visible too long rather than too short") is done in JavaScript, but comment acknowledges this should be in GROQ
- Files: `packages/sveltekit/src/routes/+page.ts` (lines 42-66)
- Impact: All tour dates fetched, then filtered in app; doesn't scale if list grows large; business logic split between CMS and app makes maintenance harder
- Fix approach: Move filtering to GROQ query with timezone-aware date comparison; reduce fetched data size

## Known Bugs

**Date comparison logic may fail with timezone edge cases:**
- Symptoms: Tour dates near midnight UTC+14/UTC-12 boundary could display incorrectly depending on server timezone
- Files: `packages/sveltekit/src/routes/+page.ts` (lines 51-65)
- Trigger: Tour scheduled on specific date in UTC+14 timezone while server runs in UTC-12
- Workaround: Current code uses 24-hour buffer to mitigate, but this is a workaround not a fix; dates may show up to 1 day earlier than actual performance date

**Silent data loading failures:**
- Symptoms: If Sanity fetch fails, user sees sections with empty arrays and missing UI. No error notification.
- Files: `packages/sveltekit/src/lib/modules/sanity/index.ts` (lines 46-54) returns `null` on error; `packages/sveltekit/src/routes/+page.ts` (lines 91-99) only logs to console
- Trigger: Network error, Sanity API down, or invalid GROQ query
- Workaround: Browser console shows warnings; check Sanity dashboard. No user-facing feedback.

**Hardcoded Sanity project ID visible in client code:**
- Symptoms: `SANITY_ID = 'fzoco9f8'` is public but could be misused if combined with API keys
- Files: `packages/sveltekit/src/lib/constants/index.ts` (line 1)
- Trigger: Any user can discover project ID by reading source; if token is leaked, attacker has full access
- Workaround: Currently using public anonymous read, but token is left as empty string placeholder; if filled, it's exposed

## Security Considerations

**Empty Sanity token placeholder in production:**
- Risk: Code contains `token: ''` comment suggesting tokens might be added; if a token is committed by mistake, it's in version control forever
- Files: `packages/sveltekit/src/lib/modules/sanity/index.ts` (line 10)
- Current mitigation: Using anonymous read mode; no auth required
- Recommendations: (1) If auth needed in future, use environment variables only; (2) Add `.env.local` to `.gitignore` with explicit warning; (3) Set up git hooks to prevent token commits; (4) Document Sanity security model

**No CORS or request validation on CDN assets:**
- Risk: Image URLs from Sanity CDN are served without CORS headers verification; could be exploited in cross-origin scenarios
- Files: `packages/sveltekit/src/lib/components/Works/slides/ImageSlide.svelte` (line 11) uses `urlFor(image).width(1200).url()` directly
- Current mitigation: Using Sanity's official image URL builder; URLs are signed
- Recommendations: Add Content Security Policy header; validate image URLs match expected domain; monitor for URL injection

**Open external links without security attributes:**
- Risk: External links in DataTable open without `noreferrer` in some cases
- Files: `packages/sveltekit/src/lib/components/Tables/DataTable.svelte` (lines 45-56)
- Current mitigation: Links starting with `/` are internal (safe); external links have `rel="noopener noreferrer"`
- Recommendations: Consistent throughout; audit all `<a>` tags for external links; consider link validation

## Performance Bottlenecks

**Large components with embedded styles:**
- Problem: `WorkDetail.svelte` is 409 lines including styles; `Clock.svelte` is 186 lines; `DataTable.svelte` is 164 lines - these are monolithic
- Files: `packages/sveltekit/src/lib/components/Works/WorkDetail.svelte`, `packages/sveltekit/src/lib/components/Clock/Clock.svelte`, `packages/sveltekit/src/lib/components/Tables/DataTable.svelte`
- Cause: All CSS, HTML, and logic in single file; no component splitting
- Improvement path: Break into smaller sub-components (e.g., `WorkDetailHeader.svelte`, `WorkDetailViewMode.svelte`); extract shared styles to CSS module; use Svelte's `<svelte:component>` if needed

**Commodity prices hardcoded and static:**
- Problem: Ticker component has 22 hardcoded commodity entries with fake static prices
- Files: `packages/sveltekit/src/lib/components/Ticker/commodities.svelte.ts` (lines 1-22)
- Cause: No API integration for real price data; manually maintained list
- Improvement path: Connect to commodity data API (e.g., Alpha Vantage, IEX Cloud); cache prices with TTL; update on interval

**All page data fetched in single query:**
- Problem: Homepage fetches all sections (releases, videos, tours, products, works, about) in one GROQ query even if some sections aren't visible
- Files: `packages/sveltekit/src/routes/+page.ts` (line 18), `packages/sveltekit/src/lib/groq/index.ts` (line 7)
- Cause: Monolithic `allData` query loads everything unconditionally
- Improvement path: Lazy-load sections below the fold; split query into smaller per-section queries; implement progressive enhancement

**No image optimization for different screen sizes:**
- Problem: `ImageSlide.svelte` uses fixed width (1200px) for all devices; no srcset or picture element
- Files: `packages/sveltekit/src/lib/components/Works/slides/ImageSlide.svelte` (line 11)
- Cause: Using Sanity image URL builder but not responsive sizes
- Improvement path: Use `.width(400)` for mobile, `.width(800)` for tablet, `.width(1200)` for desktop via srcset; implement image lazy-loading

## Fragile Areas

**Date filtering logic with side effects:**
- Files: `packages/sveltekit/src/routes/+page.ts` (lines 45-66)
- Why fragile: Creates UTC date from individual date components which can fail silently if timezone handling changes; compares string dates without ensuring same format; 24-hour buffer is magic number
- Safe modification: Add unit tests for edge dates; use `date-fns` or `day.js` library for date math; document exact timezone assumptions
- Test coverage: No tests for this critical logic

**Table component with complex conditional rendering:**
- Files: `packages/sveltekit/src/lib/components/Tables/DataTable.svelte` (lines 30-75)
- Why fragile: 5-way conditional branch on `column.type` with different data structure assumptions for each branch; `linkList` expects `row.links` array, `internalLink` expects `row.slug`, text expects `row[column.key]` - if schema changes, wrong branch silently selected
- Safe modification: Add explicit type guards; validate `row` structure matches expected type; use TypeScript discriminated union for Column type
- Test coverage: No unit tests for different column types

**MediaSlideshow with manual lifecycle management:**
- Files: `packages/sveltekit/src/lib/components/Works/MediaSlideshow.svelte` (lines 25-55)
- Why fragile: Direct Swiper instance management in lifecycle; cleanup assumes destroy is called; loop state recalculated on every render
- Safe modification: Move Swiper config to separate module; add error handler for Swiper init failures; memoize `loopEnabled`
- Test coverage: No tests for slide navigation or media type switching

## Scaling Limits

**No pagination for content sections:**
- Current capacity: Currently small dataset (test data); no limits enforced
- Limit: If any section (releases, videos, tour dates) grows beyond ~50 items, table rendering becomes slow
- Scaling path: Implement pagination in DataTable; add limit/offset to GROQ queries; cache sorted/filtered results

**Single GROQ query with no caching:**
- Current capacity: Homepage loads ~200KB data from Sanity on each request
- Limit: If Sanity API rate limits hit (default 10K requests/day), site goes down during traffic spikes
- Scaling path: Implement ISR (Incremental Static Regeneration); cache responses for 1-5 minutes; subscribe to Sanity webhooks for invalidation

**Unoptimized image delivery:**
- Current capacity: WorkDetail with 10+ high-res images loads fine on desktop
- Limit: Mobile users on slow networks see unoptimized 1200px images; Swiper loads all media into memory
- Scaling path: Image CDN with automatic format conversion (WebP); lazy-load slides in Swiper; implement blur-up placeholder

**No database - all data in Sanity CMS:**
- Current capacity: Document limit is effectively unlimited in Sanity
- Limit: Cannot do complex queries (full-text search, cross-document analytics, complex filters) efficiently; must load data to app
- Scaling path: Consider migrating core data to database if complex querying needed; keep Sanity for content authoring

## Dependencies at Risk

**Swiper library recently added:**
- Risk: Swiper 12.1.2 is very new; churning API; heavy JavaScript (~60KB) for simple slideshow
- Impact: If Swiper major version released, migration required; bundle size impacts mobile performance
- Migration plan: Monitor Swiper releases; test major versions before upgrading; consider replacing with vanilla JS solution if not performance-critical

**TypeScript 5.9.3 with strict mode enabled:**
- Risk: Strict mode enforces type safety but conflicts with existing `any` types; upgrades may introduce breaking changes
- Impact: Unused `any` types cause false type safety feeling; hard to upgrade TypeScript without major refactor
- Migration plan: Remove all `any` in next iteration; enable `noImplicitAny: true` in tsconfig; TypeScript upgrades then safer

**@sanity/client 7.15.0 - no API version pinning:**
- Risk: API version pinned to `2025-06-01` but client library may change breaking changes without warning
- Impact: If Sanity releases breaking API version, need to update client code
- Migration plan: Subscribe to Sanity release notes; test new API versions in staging; maintain API version in code comments

## Missing Critical Features

**No error boundary for component failures:**
- Problem: Single component error crashes entire page; no fallback UI
- Blocks: Cannot gracefully degrade if Ticker, Clock, or tables fail
- Recommendation: Implement Svelte error boundary component; show toast notifications on data load failure; hide sections instead of showing errors

**No offline support or stale cache:**
- Problem: If Sanity unreachable, entire site fails; no cached fallback
- Blocks: Cannot serve site during Sanity downtime or network issues
- Recommendation: Implement service worker with stale-while-revalidate caching; store last successful response in IndexedDB

**No analytics or monitoring:**
- Problem: Cannot track user behavior, page performance, or error rates
- Blocks: No data on which sections are used; cannot optimize based on real usage
- Recommendation: Add Sentry for error tracking; implement Core Web Vitals tracking; add basic page view analytics

**No search functionality:**
- Problem: Users cannot search works, releases, videos, tours by keyword
- Blocks: Site only browsable by scrolling; hard to find specific content
- Recommendation: Implement full-text search client-side or Sanity-side; add search box to header

## Test Coverage Gaps

**No unit tests for utility functions:**
- What's not tested: `isUrl()`, `getUniqueKeys()`, `getCurrentYear()`, `getRandomNumberInRange()` all lack tests
- Files: `packages/sveltekit/src/lib/modules/utils/index.ts`
- Risk: Utility used widely; refactoring could introduce bugs silently
- Priority: Medium - these are simple but critical

**No tests for data loading:**
- What's not tested: `loadData()` function behavior on error vs success; GROQ query execution
- Files: `packages/sveltekit/src/lib/modules/sanity/index.ts`
- Risk: Failures silently return null; no validation that data shape matches expectations
- Priority: High - this is the data backbone

**No tests for page load:**
- What's not tested: Homepage data fetch, tour date filtering, last updated calculation
- Files: `packages/sveltekit/src/routes/+page.ts`
- Risk: Edge cases in date comparison, missing documents, type casting all untested
- Priority: High - core business logic

**No component integration tests:**
- What's not tested: DataTable with different column types; WorkDetail view mode switching; MediaSlideshow navigation
- Files: Multiple component files
- Risk: Visual regressions and logic errors discovered by users, not tests
- Priority: Medium - would catch UI bugs early

**No E2E tests:**
- What's not tested: Full user flows (browsing works, navigating tours, store interaction)
- Risk: Entire site could be broken in production before discovered
- Priority: Medium - requires test infrastructure setup

---

*Concerns audit: 2026-02-23*

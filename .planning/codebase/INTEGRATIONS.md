# External Integrations

**Analysis Date:** 2026-02-23

## APIs & External Services

**Sanity CMS API:**
- Sanity Cloud - Headless CMS and content delivery
  - SDK/Client: `@sanity/client` 7.15.0
  - Implementation: `packages/sveltekit/src/lib/modules/sanity/index.ts`
  - API Version: `2025-06-01`
  - CDN enabled: `useCdn: true` (production data delivery)
  - Auth: No token required (public/anonymous read access to production dataset)

**Image CDN:**
- Sanity Image URL Builder - Optimized image delivery
  - SDK: `@sanity/image-url` 2.0.3
  - Purpose: Generate optimized image URLs from Sanity image assets
  - Used in: `packages/sveltekit/src/lib/modules/sanity/index.ts`
  - Function: `urlFor()` helper for image rendering

## Data Storage

**Primary Database:**
- Sanity Cloud (Managed Service)
  - Type: Document-based JSON store
  - Project ID: `fzoco9f8`
  - Dataset: `production`
  - Connection: Via @sanity/client using project ID
  - Access: Query via GROQ (Sanity's query language)
  - Stored content types:
    - `about` - Site about/contact information
    - `release` - Music releases/albums
    - `video` - Video content (YouTube links, etc.)
    - `tour` - Tour information
    - `tourDate` - Individual tour dates with venue/date info
    - `newPosts` - Blog posts/updates
    - `storeList` - Product listings
    - `product` - Store products
    - `worksList` - Portfolio/works
    - `work` - Individual portfolio items

**File Storage:**
- Sanity Asset Storage - Integrated with Sanity Cloud
  - Images and media files stored in Sanity
  - Accessed via `@sanity/image-url` builder

**Caching:**
- Sanity CDN - Edge caching for queries and images
  - Enabled: `useCdn: true`
  - Benefits: Fast content delivery globally

## Content Query Language

**GROQ (Graph-Relational Object Queries):**
- Query language: `packages/sveltekit/src/lib/groq/index.ts`
- Used for: Fetching data from Sanity API
- Comprehensive query example in: `packages/sveltekit/src/routes/+page.ts`
  - Fetches all site data in single optimized query via `loadData()`

## Authentication & Identity

**Sanity Studio Auth:**
- Provider: Sanity Cloud native authentication
- Type: OAuth/Email (managed by Sanity)
- Studio access: Located in `packages/sanity/`
- No custom auth implementation required (handled by Sanity)

**Frontend Data Access:**
- Authentication: Public/anonymous (no token)
- Access model: Read-only queries to production dataset
- Security: Sanity's security rules enforce permissions

## Rich Text & Content Rendering

**Portable Text (Block Content):**
- Dependency: `@portabletext/to-html` 5.0.1
- Purpose: Convert Sanity block content to HTML
- Implementation: `packages/sveltekit/src/lib/modules/sanity/index.ts`
  - `renderBlockText()` function with custom components
  - Supports: Links (with `target="_blank" rel="noreferrer"`), blockquotes, paragraphs
- Type definitions: `@portabletext/types` 4.0.1

## UI Components & Libraries

**Carousel/Slider:**
- Library: Swiper 12.1.2
- Purpose: Touch-enabled carousel for galleries and content sliders
- Recently installed: February 2026
- Typical use: Gallery views, featured content rotators

## Monitoring & Observability

**Error Tracking:**
- Provider: Not detected
- Console logging: Basic console.warn for missing documents in `packages/sveltekit/src/routes/+page.ts`
  - Warnings for: Missing About, StoreList, NewPosts documents
  - No structured error reporting service

**Logs:**
- Approach: Browser console logs (client-side)
- Server logs: Standard Node.js console output

## CI/CD & Deployment

**Hosting:**
- Platform: Vercel, Netlify, or other (via @sveltejs/adapter-auto)
- Adapter: `@sveltejs/adapter-auto` 7.0.1 auto-detects deployment target
- No dedicated deployment configuration files detected

**Sanity Deployment:**
- Sanity Studio: Hosted automatically at sanity.io subdomain
- Deploy command: `pnpm deploy:sanity` (in root scripts)
- GraphQL endpoint available: Deploy via `sanity graphql deploy`

**CI Pipeline:**
- No `.github` workflows detected
- No CI/CD configuration files present

**Build Output:**
- Static/hybrid rendering via SvelteKit
- Sanity studio builds: `pnpm build` in sanity package
- SvelteKit builds: `pnpm build` in sveltekit package

## Utility Scripts

**Data Import Tools:**
- Location: `packages/scripts/import-to-sanity/`
- Purpose: Bulk data import from JSON/CSV to Sanity
- Tools included:
  - `import-products.js` - Product data import
  - `tour-dates-2026.json` - Tour date data
- Environment: Uses `.env` file for Sanity credentials

## Environment Configuration

**Required Environment Variables:**

For Sanity Studio (`packages/sanity/`):
- `SANITY_STUDIO_PROJECT_ID` (optional - may be hardcoded)
- `SANITY_STUDIO_DATASET` (optional - may be hardcoded)
- `SANITY_STUDIO_URL_ENDPOINT` (optional)

For SvelteKit Frontend:
- No public API keys required (using Sanity's public dataset)
- Optional: Custom analytics/tracking variables

For Scripts (`packages/scripts/`):
- `.env` file present with Sanity write token for imports
- Note: Never committed to version control

**Secrets Location:**
- `.env` file in `packages/scripts/` - Contains Sanity write token for data imports
- `.gitignore` prevents leakage
- Sanity studio credentials managed by Sanity Cloud authentication

## Webhooks & Callbacks

**Incoming Webhooks:**
- Not detected in codebase
- Sanity supports webhooks for content updates (not implemented)

**Outgoing Webhooks:**
- Not detected
- No external API callbacks configured

## Type Generation

**Sanity TypeScript Types:**
- Command: `pnpm typegen:sanity`
- Output: `packages/sanity/sanity.types.ts` (auto-generated)
- Regenerated from schema via: `sanity schema extract && sanity typegen generate`
- Usage: Imported as `@sanity-types` in SvelteKit app
- Ensures type safety across CMS and frontend

---

*Integration audit: 2026-02-23*

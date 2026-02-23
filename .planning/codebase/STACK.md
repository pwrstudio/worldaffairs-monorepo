# Technology Stack

**Analysis Date:** 2026-02-23

## Languages

**Primary:**

- TypeScript 5.9.3 - Used across all packages (SvelteKit, Sanity, and scripts)
- JavaScript (ES Modules) - Supporting language for Node.js runtime

**Secondary:**

- Svelte 5.53.3 - UI component language for SvelteKit frontend
- SCSS/Sass (sass-embedded 1.97.3) - Stylesheet preprocessing

## Runtime

**Environment:**

- Node.js v20.19.0 - Development and build environment
- Browser runtime (client-side) - SvelteKit SSR + client hydration via Vite

**Package Manager:**

- pnpm 10.18.1 - Monorepo package manager
- Lockfile: `pnpm-lock.yaml` (present, version 9.0)

## Frameworks

**Core:**

- SvelteKit 2.53.0 - Full-stack web framework with SSR and static generation
    - Purpose: Main frontend application framework
    - Located in: `packages/sveltekit/`
- Sanity 5.11.0 - Headless CMS and content management studio
    - Purpose: Backend content management and API
    - Located in: `packages/sanity/`

**UI & Components:**

- Svelte 5.53.3 - Reactive component framework
- React 19.2.4 - Used in Sanity studio only (not in SvelteKit frontend)
    - react-dom 19.2.4 - React rendering library
    - react-icons 5.5.0 - Icon library for Sanity studio

**Styling:**

- styled-components 6.3.11 - CSS-in-JS for Sanity studio
- SASS 1.97.3 (sass-embedded) - CSS preprocessing

## Key Dependencies

**Critical:**

- @sanity/client 7.15.0 - Official Sanity SDK for data fetching
    - Used in: `packages/sveltekit/src/lib/modules/sanity/index.ts`
    - Provides: Content queries via GROQ, real-time updates via CDN
- @portabletext/to-html 5.0.1 - Portable Text (rich text) rendering to HTML
- @sanity/image-url 2.0.3 - Image URL builder for optimized Sanity images
- swiper 12.1.2 - Touch slider library (recently installed) for carousels/galleries

**Infrastructure:**

- Vite 7.3.1 - Build tool and dev server for SvelteKit
- @sveltejs/kit - SvelteKit framework and routing
- @sveltejs/adapter-auto 7.0.1 - Auto-detection of deployment platform (Vercel, Netlify, etc.)
- svelte-check 4.4.3 - TypeScript/Svelte type checking

**Development Tools:**

- prettier 3.8.1 - Code formatter (monorepo-wide)
- prettier-plugin-svelte 3.5.0 - Svelte-specific prettier plugin
- mprocs 0.8.3 - Multi-process runner for parallel dev servers
- @sveltejs/vite-plugin-svelte 6.2.4 - Vite integration for Svelte
- eslint 10.0.1 - Linting in Sanity studio
- @sanity/eslint-config-studio 6.0.0 - Sanity-specific ESLint rules
- @types/react 19.2.14 - TypeScript definitions for React

## Configuration

**Build Configuration:**

- `packages/sveltekit/vite.config.ts` - Vite configuration with path alias support
- `packages/sveltekit/svelte.config.js` - SvelteKit-specific configuration
- `packages/sanity/sanity.config.ts` - Sanity studio configuration
- `packages/sveltekit/tsconfig.json` - TypeScript compiler options with strict mode
- `packages/sanity/tsconfig.json` - TypeScript configuration for Sanity studio

**TypeScript Configuration:**

- Strict mode enabled
- ES2017 target (in Sanity)
- Bundler module resolution
- Path aliases configured for Sanity types: `@sanity-types` → `../sanity/sanity.types.ts`

**Environment:**

- Supports `.env` files via Vite (loaded automatically)
- No `.nvmrc` or `.tool-versions` present (uses Node v20 system default)
- Sanity project configuration hardcoded:
    - Project ID: `fzoco9f8`
    - Dataset: `production`
    - API version: `2025-06-01`

## Monorepo Structure

**Workspaces:**

- `packages/sveltekit/` - Frontend application
- `packages/sanity/` - Content management studio
- `packages/scripts/` - Utility scripts (data import tools)
- Root `package.json` with workspace configuration

**Root Scripts:**

- `dev` - Runs all services in parallel via mprocs
- `dev:sveltekit` - Frontend development server
- `dev:sanity` - Sanity studio development server
- `deploy:sanity` - Deploy Sanity schema to cloud
- `typegen:sanity` - Generate TypeScript types from Sanity schema
- `check` - Run type checking on SvelteKit
- `format` - Format all code with Prettier

## Platform Requirements

**Development:**

- Node.js v20+
- pnpm 10.18.1
- Modern browser with ES2025 support

**Production:**

- Node.js v20+ (if using node adapter)
- Or: Vercel, Netlify, or other platform supported by adapter-auto
- Sanity deployment: Hosted by Sanity (no deployment needed from this repo)

---

_Stack analysis: 2026-02-23_

# Coding Conventions

**Analysis Date:** 2026-02-23

## Naming Patterns

**Files:**
- TypeScript files: camelCase (e.g., `commodities.svelte.ts`, `+page.ts`)
- Svelte components: PascalCase (e.g., `DataTable.svelte`, `WorkDetail.svelte`)
- Schema type files: PascalCase (e.g., `Work.ts`, `Release.ts`)
- Index files: always named `index.ts` as barrel exports
- Route files: SvelteKit convention with `+` prefix (e.g., `+page.ts`, `+layout.ts`)

**Functions:**
- camelCase for all function names
- Functions use explicit parameter typing
- Example patterns:
  - `export function isUrl(str: string): boolean`
  - `export function getUniqueKeys(data: Record<string, any>[]): string[]`
  - `export const loadData = async (query: string, params: any) => { ... }`
  - Local component functions: `setViewMode()`, `handleSlideChange()`, `goToPrev()`

**Variables:**
- camelCase for all variables and state
- Svelte rune variables use clear state semantics:
  - `let viewMode = $state<ViewMode>('slideshow')`
  - `let currentIndex = $state(0)`
  - `const { media, onSlideChange } = $props<{ ... }>()`
- Constants use UPPER_SNAKE_CASE (e.g., `SANITY_ID`)

**Types:**
- PascalCase for type names (e.g., `type ClockLocation`, `type Commodity`, `type Column`)
- Enums: PascalCase with uppercase values (e.g., `enum TableType { New = 'new', Music = 'music' }`)
- Union types use descriptive names (e.g., `type ViewMode = 'slideshow' | 'text' | 'grid'`)

## Code Style

**Formatting:**
- Tool: Prettier
- Configuration: `.prettierrc` (tab width: 4, semi: true, singleQuote: true, printWidth: 100)
- Svelte-specific: `prettier-plugin-svelte` for Svelte component formatting
- Trailing commas: es5 style

**Linting:**
- Sanity package: `@sanity/eslint-config-studio`
- Configuration: `packages/sanity/.eslintrc` extends Sanity's base config
- No custom ESLint config for SvelteKit package (relies on Prettier)

## Import Organization

**Order:**
1. External imports from npm packages (e.g., `import { createClient } from '@sanity/client'`)
2. Internal absolute imports using path aliases (e.g., `import { isUrl } from '$lib/modules/utils'`)
3. Relative imports from local files (rarely used; path aliases preferred)
4. Type imports: `import type { Work } from '@sanity-types'`

**Path Aliases:**
- `$lib/` → Points to `/packages/sveltekit/src/lib/` - Primary alias for shared utilities, types, components, modules
- `$routes/` → SvelteKit convention for route components
- `@sanity-types` → Points to `../sanity/sanity.types.ts` (auto-generated Sanity TypeScript types)
- Common import patterns:
  - `import type { Release, Video } from '@sanity-types'`
  - `import { TableType } from '$lib/enums'`
  - `import type { Column } from '$lib/types'`
  - `import { queries } from '$lib/groq'`
  - `import { loadData } from '$lib/modules/sanity'`
  - `import { getCurrentYear } from '$lib/modules/utils'`

## Error Handling

**Patterns:**
- Try-catch with fallback values: `loadData()` returns `null` on fetch failure instead of throwing
- Console warnings for non-critical missing data: `console.warn('About document is missing...')`
- SvelteKit error handling: `throw error(404, 'Work not found')` for route errors
- Type assertions with `as unknown as Type` when type system can't infer correctly
- Optional chaining and nullish coalescing: `about?.credits ?? []`
- Nullable return values: Functions that may not find data return `null` rather than throwing

**Example:**
```typescript
export const loadData = async (query: string, params: any) => {
    try {
        const res = await client.fetch(query, params);
        return res || null;
    } catch (err) {
        console.warn(`Failed to load data for query: ${query}`, err);
        return null;
    }
};
```

## Logging

**Framework:** Console API (no dedicated logging library)

**Patterns:**
- `console.warn()` for non-critical issues that should be visible in development
- Used in route loaders to indicate missing Sanity documents
- No debug logging infrastructure; warnings are the primary logging mechanism
- Example: `console.warn('NewPosts document is missing - new posts section will be hidden')`

## Comments

**When to Comment:**
- Module-level documentation for query files (e.g., GROQ queries include JSDoc header)
- Explain non-obvious business logic (e.g., timezone handling in tour date filtering)
- Flag implementation concerns or workarounds
- Example: `// This is a bit of a hack. It would be better to do this in the GROQ query.`

**JSDoc/TSDoc:**
- Used sparingly in utility functions
- Pattern: Function description, parameter types, return type
- Example:
  ```typescript
  /**
   * Check if a string is a valid URL
   * @param str - String to check
   * @returns True if the string is a valid URL, false otherwise
   */
  export function isUrl(str: string): boolean { ... }
  ```
- Module-level comments for files (e.g., `/** GROQ queries for Sanity CMS */`)

## Function Design

**Size:** Functions kept to single responsibility; utility functions are typically 5-15 lines

**Parameters:**
- Explicit typing required for all parameters
- Use type destructuring for component props: `const { media, onSlideChange } = $props<{ ... }>()`
- Avoid rest parameters in favor of explicit object properties
- Examples:
  - `async (query: string, params: any) => { ... }`
  - `(index: number) => { ... }`
  - `(mode: ViewMode) => { ... }`

**Return Values:**
- Always explicitly typed (TypeScript strict mode enabled)
- Functions return null on missing/failed data rather than undefined
- Component callbacks use void return
- Route loaders use `satisfies PageLoad` pattern

**Example:**
```typescript
export const load = (async ({ params }) => {
    const { slug } = params;
    const work = (await loadData(queries.workBySlug, { slug })) as Work | null;

    if (!work) {
        throw error(404, 'Work not found');
    }

    return { work };
}) satisfies PageLoad;
```

## Module Design

**Exports:**
- Named exports for functions and types (e.g., `export function isUrl()`, `export type Work`)
- Default exports used only for SvelteKit routes and Sanity schema definitions
- Barrel exports: `index.ts` files re-export from module subdirectories

**Barrel Files:**
- Pattern: `src/lib/[category]/index.ts` contains module's public API
- Examples:
  - `src/lib/types/index.ts` - Re-exports all type definitions
  - `src/lib/constants/index.ts` - Re-exports constants
  - `src/lib/enums/index.ts` - Re-exports enums
  - `src/lib/groq/index.ts` - Re-exports GROQ query objects
  - `src/lib/modules/utils/index.ts` - Re-exports utility functions

**Module Organization:**
- `src/lib/modules/` - Functional modules (sanity client, stores, utilities)
- `src/lib/types/` - Shared TypeScript type definitions
- `src/lib/constants/` - Application constants
- `src/lib/enums/` - TypeScript enums
- `src/lib/groq/` - GROQ query definitions
- `src/lib/components/` - Svelte components organized by feature

## Svelte Component Conventions

**Script Setup:**
- Use `lang="ts"` on all `<script>` tags for TypeScript support
- Component props use `$props` rune: `const { prop } = $props<{ prop: Type }>()`
- State uses `$state` rune: `let variable = $state(initialValue)`
- Type inline in rune syntax: `$state<ViewMode>('slideshow')`

**Props Interface:**
- Props destructured directly in props rune with inline type
- Pattern: `const { media, onSlideChange } = $props<{ media: Type; onSlideChange?: Callback }>()`

**Style:**
- Scoped styles using `<style lang="scss">` - SCSS enabled
- CSS variables for theming (e.g., `var(--font-size-small)`, `var(--foreground)`)
- BEM-like naming for CSS classes (e.g., `.table-title`, `.grid-item`, `.nav-numbers`)
- Media queries for responsive design included inline

**Example Component Structure:**
```svelte
<script lang="ts">
    import type { Work } from '@sanity-types';
    import { loadData } from '$lib/modules/sanity';

    const { work } = $props<{ work: Work }>();
    let viewMode = $state<'text' | 'grid'>('text');

    function setViewMode(mode: 'text' | 'grid') {
        viewMode = mode;
    }
</script>

<div class="component">
    <!-- Template -->
</div>

<style lang="scss">
    .component {
        /* Styles */
    }
</style>
```

---

*Convention analysis: 2026-02-23*

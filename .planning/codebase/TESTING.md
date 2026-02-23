# Testing Patterns

**Analysis Date:** 2026-02-23

## Test Framework

**Status:** No testing framework configured

**Current State:**
- No test files present in codebase (no `.test.ts`, `.spec.ts` files)
- No test runner installed (Jest, Vitest, etc.)
- No test configuration files (jest.config.js, vitest.config.ts, etc.)
- No testing libraries in dependencies (no @testing-library, @vitest/ui, etc.)

**Recommendation:** If testing is needed, choose between:
- **Vitest** - Native TypeScript/ESM support, fast, Vite integrated (would fit SvelteKit project)
- **Jest** - Industry standard, comprehensive, may require additional SvelteKit configuration

## Test Organization

**Current Structure:** Not applicable - no tests present

**Proposed Structure (if testing is implemented):**
- Co-located pattern: Tests should live alongside source files
- Example: `src/lib/modules/utils/__tests__/index.test.ts` or `src/lib/modules/utils/index.test.ts`
- Component tests: `src/lib/components/DataTable/__tests__/DataTable.test.ts`

## Type Coverage

**Status:** TypeScript strict mode enabled

**Configuration:**
- File: `packages/sveltekit/tsconfig.json`
- Settings:
  - `"strict": true` - Strict null checks, strict function types
  - `"checkJs": true` - Check JavaScript files for type errors
  - `"allowJs": true` - Allow JavaScript files
  - `"forceConsistentCasingInFileNames": true`
  - `"moduleResolution": "bundler"`

**Type Definition Sources:**
- Auto-generated Sanity types: `@sanity-types` alias pointing to `../sanity/sanity.types.ts`
- Manual type definitions: `packages/sveltekit/src/lib/types/index.ts`
- Comprehensive typing used throughout:
  ```typescript
  export type ClockLocation = {
      timezone: string;
      label: string;
  };

  export type Column = {
      type: 'index' | 'icon' | 'text' | 'linkList' | 'link' | 'internalLink';
      label?: string;
      key?: string;
      hide: boolean;
      linkPath?: string;
  };
  ```

## Runtime Verification

**SvelteKit Type Checking:**
- Command: `pnpm check` (root workspace)
- Runs: `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`
- Validates: TypeScript types, Svelte components, type safety

**Watch Mode:**
- Command: `pnpm check:watch` (in sveltekit package)
- Provides continuous type checking during development

## Code Quality Practices

**Build Verification:**
- Command: `pnpm build` (in sveltekit package)
- Validates: All TypeScript compiles, Svelte components valid, no build errors

**Formatter Compliance:**
- Command: `pnpm format` (root workspace)
- Runs: `prettier --write .`
- Enforces: Code style consistency across TypeScript, Svelte, JSON, YAML

**Development:**
- `pnpm dev:sveltekit` - Starts SvelteKit dev server with hot reload
- `pnpm dev:sanity` - Starts Sanity Studio dev server
- `pnpm dev` - Runs both via mprocs (multi-process runner)

## Manual Testing Areas

**Critical Paths (should have manual test checklists):**
1. Work detail page with media (image, audio, video)
   - Files: `src/lib/components/Works/WorkDetail.svelte`, `src/lib/components/Works/MediaSlideshow.svelte`
   - Verify: All view modes work (slideshow, text, grid), navigation works, media displays

2. Data loading from Sanity
   - Files: `src/routes/+page.ts`, `src/lib/modules/sanity/index.ts`
   - Verify: Null-safe fallbacks work when documents missing, tour date filtering correct

3. Tour date filtering logic
   - File: `src/routes/+page.ts` (lines 42-66)
   - Verify: Shows dates correctly across all time zones, edge case at midnight UTC+14/-12

**Data Fallbacks Tested:**
- Missing About document → contact section hidden
- Missing NewPosts document → new posts section hidden
- Missing StoreList document → store section empty
- All fallbacks documented in code with `console.warn()`

## Integration Testing Considerations

**External Dependencies to Test:**
- Sanity CMS client integration
  - File: `src/lib/modules/sanity/index.ts`
  - Test: Query execution, error handling, null-safe returns
  - Mock point: `client.fetch()` from `@sanity/client`

- Portable Text rendering
  - File: `src/lib/modules/sanity/index.ts` (renderBlockText, toPlainText)
  - Test: Block rendering, link creation, edge cases

- Image URL generation
  - File: `src/lib/modules/sanity/index.ts` (urlFor)
  - Test: Various image sources, responsive sizes

**Example Test Approach (if implemented):**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { loadData, renderBlockText, toPlainText } from '$lib/modules/sanity';

describe('Sanity Module', () => {
    describe('loadData', () => {
        it('returns null on fetch error', async () => {
            const result = await loadData('invalid query', {});
            expect(result).toBeNull();
        });

        it('returns fetched data on success', async () => {
            const result = await loadData(queries.allData, {});
            expect(result).toHaveProperty('releases');
            expect(result).toHaveProperty('videos');
        });
    });

    describe('renderBlockText', () => {
        it('converts block arrays to HTML', () => {
            const blocks = [{ _type: 'block', children: [{ text: 'test' }] }];
            const html = renderBlockText(blocks as PortableTextBlock[]);
            expect(html).toContain('<p>test</p>');
        });
    });
});
```

## Component Testing Considerations

**Components Needing Tests (if testing is implemented):**

1. `DataTable.svelte` - Generic table rendering
   - Props: tableType, title, anchor, columns, data
   - Test: Column rendering, link generation, responsive hiding
   - Mock: No external dependencies

2. `WorkDetail.svelte` - Complex view switching
   - Props: work
   - Test: View mode switching, slide navigation, state management
   - Integration: MediaSlideshow component

3. `MediaSlideshow.svelte` - Swiper initialization
   - Props: media, onSlideChange callback
   - Test: Swiper instantiation, keyboard navigation, slide events
   - Mock: Swiper library

**Example Component Test:**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import DataTable from '$lib/components/Tables/DataTable.svelte';
import { TableType } from '$lib/enums';

describe('DataTable', () => {
    it('renders table headers from columns', () => {
        const columns = [
            { type: 'text' as const, label: 'Title', key: 'title', hide: false }
        ];
        const data = [{ title: 'Test' }];

        render(DataTable, {
            props: { tableType: TableType.New, columns, data, anchor: 'test' }
        });

        expect(screen.getByText('Title')).toBeInTheDocument();
    });
});
```

## Utilities Testing Considerations

**Utilities in `src/lib/modules/utils/index.ts`:**

```typescript
export function isUrl(str: string): boolean
export function getUniqueKeys(data: Record<string, any>[]): string[]
export function getCurrentYear(): number
export function getRandomNumberInRange(min: number, max: number): number
```

**Test Examples:**
```typescript
describe('Utility Functions', () => {
    describe('isUrl', () => {
        it('returns true for valid URLs', () => {
            expect(isUrl('https://example.com')).toBe(true);
            expect(isUrl('http://localhost:3000')).toBe(true);
        });

        it('returns false for invalid strings', () => {
            expect(isUrl('not a url')).toBe(false);
            expect(isUrl('')).toBe(false);
        });
    });

    describe('getUniqueKeys', () => {
        it('extracts unique keys from array of objects', () => {
            const data = [
                { a: 1, b: 2 },
                { b: 3, c: 4 }
            ];
            expect(getUniqueKeys(data)).toEqual(expect.arrayContaining(['a', 'b', 'c']));
        });
    });
});
```

## E2E Testing Considerations

**Not Currently Implemented**

**Recommended Framework:** Playwright or Cypress

**Critical User Journeys to Cover:**
1. View work detail page and interact with media slideshow
2. Navigate between different table sections (releases, videos, tour dates)
3. Verify tour dates filtering shows correct upcoming dates
4. Test responsive design across breakpoints (768px is key breakpoint)

## Coverage Targets

**Current:** No coverage measurement in place

**Recommendation (if testing added):**
- Minimum 70% for utilities and modules
- Minimum 50% for components (UI testing is lower priority in current state)
- Focus on critical paths: Sanity data loading, tour date filtering, error handling

---

*Testing analysis: 2026-02-23*

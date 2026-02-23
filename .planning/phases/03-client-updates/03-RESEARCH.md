# Phase 3: Client Updates - Research

**Researched:** 2026-02-23
**Domain:** SvelteKit frontend — UI text renaming and Sanity field wiring
**Confidence:** HIGH

## Summary

Phase 3 is a focused SvelteKit frontend task with three tightly scoped changes: rename two user-facing "Works" labels to "Archive", update the `TableType` enum value for works, and wire the `defaultView` field from Sanity into `WorkDetail.svelte`'s initial view mode state.

The codebase has already been surveyed. All target locations are identified and the changes are mechanical. The only non-trivial design decision is the ViewMode mismatch: the Sanity `defaultView` field stores `'image' | 'text' | 'grid'`, but the `WorkDetail` component uses `'slideshow' | 'text' | 'grid'` internally. The value `'image'` from Sanity must map to `'slideshow'` in the component. The GROQ query for work detail also does not yet include `defaultView` and must be updated.

No new libraries are needed. No new files should be created. All changes touch existing files only.

**Primary recommendation:** Make all changes in a single wave — GROQ query update, WorkDetail initial state wiring, enum value change, and label text changes — then run `pnpm check` to verify TypeScript compilation.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RENAME-03 | "Works" table heading and section references renamed to "Archive" in SvelteKit client | Two user-facing label sites identified: `Header.svelte` TOC link text and `WorksTable.svelte` `title` prop. The `anchor` attribute on the table stays `"works"` to preserve the `#works` fragment used by `WorkDetail`'s back link. |
| RENAME-04 | Component references and variable names renamed from "work(s)" to "collection(s)" where user-facing | Only `TableType.Works = 'works'` is a user-facing enum value (it becomes a CSS class name on `<table>`). No global CSS targets this class, so it can be changed to `'archive'` safely. Internal code variables (`works`, `work`, file paths, import paths) stay unchanged per requirements. |
| CLIENT-01 | WorkDetail component uses `defaultView` field value to set initial view mode | The GROQ `workBySlug` query must include `defaultView`. The `Work` type from `@sanity-types` already defines `defaultView?: 'image' \| 'text' \| 'grid'`. WorkDetail must map that to its internal `ViewMode` type (`'slideshow' \| 'text' \| 'grid'`) when initialising `$state`. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Svelte 5 | 5.53.3 | Reactive component state via `$state` rune | Project's UI framework; already in use |
| SvelteKit | 2.53.0 | Routing and server-side data loading | Project's application framework |
| TypeScript | 5.9.3 | Type safety across all changes | Project enforces strict mode |
| @sanity-types | (generated) | Type definitions for Sanity documents | Already generated; includes `defaultView` field |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@sveltejs/kit` `error` helper | — | 404 throwing in loaders | Already used in works page loader |

### Alternatives Considered

None — all changes are edits to existing files using the project's current conventions.

**Installation:** No new packages required.

## Architecture Patterns

### Recommended Project Structure

No new files. All changes are edits within:

```
packages/sveltekit/src/
├── lib/enums/index.ts              # TableType.Works value change
├── lib/groq/index.ts               # Add defaultView to workBySlug query
├── lib/components/
│   ├── Header/Header.svelte        # "Works" → "Archive" in TOC link text
│   ├── Tables/WorksTable.svelte    # title="Works" → title="Archive"
│   └── Works/WorkDetail.svelte     # Wire defaultView to initial viewMode
```

### Pattern 1: Svelte 5 Reactive State Initialisation

**What:** `$state` in Svelte 5 is initialised once when the component mounts. To use a prop value as the initial state, read the prop synchronously at declaration time.

**When to use:** Setting initial view mode from a server-supplied prop value.

**Example:**

```typescript
// Current (hardcoded):
let viewMode = $state<ViewMode>('slideshow');

// After change (prop-driven initial value):
type ViewMode = 'slideshow' | 'text' | 'grid';

function defaultViewToMode(dv: Work['defaultView']): ViewMode {
    if (dv === 'text') return 'text';
    if (dv === 'grid') return 'grid';
    return 'slideshow'; // 'image' and undefined both map to slideshow
}

let viewMode = $state<ViewMode>(defaultViewToMode(work.defaultView));
```

The `svelte-ignore state_referenced_locally` comment is already used elsewhere in `WorkDetail.svelte` for prop-derived local values (see `media` and `yearDisplay`). The same pattern applies here.

**Source:** Existing `WorkDetail.svelte` lines 18–23 (project convention confirmed by direct code read).

### Pattern 2: GROQ Field Projection

**What:** The `workBySlug` query currently uses `...` (spread) at document root, which fetches all scalar fields. However, `defaultView` is a scalar field on the document root — it should already be included by the `...` spread.

**Verification:** The GROQ query is:

```groq
*[_type == "work" && slug.current == $slug][0] {
    ...,
    media[] {
        _type, _key, caption,
        image { ..., asset-> },
        file { ..., asset-> }
    }
}
```

The `...` at document root projects all scalar fields including `defaultView`. No explicit addition is strictly required at the GROQ level — the field is already fetched. However, making it explicit in the projection is cleaner and more readable, consistent with how `media` subfields are projected. The recommendation is to leave the query as-is (the spread already covers it) and confirm with a TypeScript check that `work.defaultView` is accessible in the component.

**Confidence:** HIGH — confirmed by reading both the GROQ query and the generated `Work` type.

### Pattern 3: Enum Value Change With CSS Class Impact

**What:** `TableType.Works = 'works'` is used as a CSS class on `<table class={tableType}>` in `DataTable.svelte`. Changing the value to `'archive'` changes the rendered HTML class from `class="works"` to `class="archive"`.

**Risk assessment:** Searched the entire SvelteKit `src/` directory for CSS rules targeting `.works` — none found. The `index.scss` does not reference `.works`. The change is safe.

**When to use:** Whenever an enum value is user-facing or used as an HTML attribute that should reflect the new naming.

### Anti-Patterns to Avoid

- **Renaming `anchor="works"` in WorksTable or the `href="#works"` back-link in WorkDetail:** The anchor `#works` is the fragment ID used by the back-link in `WorkDetail.svelte` (`href="/#works"`). Renaming it would break the back-link navigation. RENAME-03 only requires the heading *text* to change, not the anchor ID.
- **Renaming internal code variables (`works`, `work`, `worksData`, file paths):** Out of scope per REQUIREMENTS.md and the project's out-of-scope table.
- **Changing the `/works/[slug]` URL route:** Explicitly out of scope.
- **Using `$derived` instead of `$state` for initial view mode:** The view mode must be mutable (user clicks change it), so it must be `$state`, not `$derived`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| ViewMode mapping | Custom string union transformer | A simple helper function (3 lines) | No library needed; the mapping is trivial |
| Type narrowing for `defaultView` | Manual `as` casts | Let TypeScript infer from the conditional | Safer and cleaner |

**Key insight:** This phase requires no new abstractions. All changes are one-line or small edits to existing files.

## Common Pitfalls

### Pitfall 1: Anchor/Fragment ID vs. Label Text Confusion

**What goes wrong:** Renaming the `anchor` prop on `WorksTable` or the `href="#works"` in `WorkDetail`'s back link, breaking in-page navigation.

**Why it happens:** The heading text ("Works" → "Archive") and the HTML `id` attribute (`anchor="works"`) look related but serve different purposes.

**How to avoid:** Change only the `title` prop text in `WorksTable.svelte` and the TOC link text in `Header.svelte`. Leave `anchor="works"` and `href="#works"` unchanged.

**Warning signs:** If back-navigation from a work detail page scrolls to the wrong place or produces a console 404.

### Pitfall 2: ViewMode / defaultView Type Mismatch

**What goes wrong:** Passing `work.defaultView` directly to `$state<ViewMode>()` causes a TypeScript error — `'image'` is not assignable to `'slideshow' | 'text' | 'grid'`.

**Why it happens:** Sanity uses `'image'` as the field value (matching the radio list option title), but `WorkDetail` uses `'slideshow'` internally (matching the Swiper-based component name).

**How to avoid:** Use a mapping function (see Code Examples below) that converts `'image'` → `'slideshow'` and treats `undefined` as `'slideshow'` (the fallback default).

**Warning signs:** TypeScript compilation error on `viewMode` initialisation line; `svelte-check` will catch this.

### Pitfall 3: Forgetting `svelte-ignore state_referenced_locally`

**What goes wrong:** Svelte 5 emits a warning when a `$state` variable is initialised from a non-reactive value read inside the component script block.

**Why it happens:** Svelte 5's compiler tracks reactive context; reading a prop outside of a reactive context triggers the warning.

**How to avoid:** Add `// svelte-ignore state_referenced_locally` on the line before the `$state` initialisation that reads `work.defaultView`. The existing code already does this for `media` and `yearDisplay` — follow the same pattern.

**Warning signs:** Svelte compiler warning in dev console: "state_referenced_locally".

### Pitfall 4: grid/text defaultView with no media

**What goes wrong:** If `defaultView` is `'grid'` or `'image'`/`'slideshow'` but the work has no media, the component falls through to the `else` branch showing "No media available."

**Why it happens:** The `WorkDetail` template already guards `viewMode === 'slideshow'` and `viewMode === 'grid'` with `&& hasMedia`. This existing behaviour is correct and requires no change — but it's worth verifying the fallback is already handled.

**How to avoid:** No action needed — the existing `{:else}` branch covers the no-media case. Just confirm it still renders correctly.

## Code Examples

Verified patterns from the existing codebase:

### RENAME-03: Header TOC link text change

File: `packages/sveltekit/src/lib/components/Header/Header.svelte`, line 32

```svelte
<!-- Before -->
<a href="#works">Works</a>

<!-- After -->
<a href="#works">Archive</a>
```

The `href="#works"` stays unchanged — only the visible text changes.

### RENAME-03: WorksTable title change

File: `packages/sveltekit/src/lib/components/Tables/WorksTable.svelte`, line 27

```svelte
<!-- Before -->
<DataTable tableType={TableType.Works} title="Works" anchor="works" {columns} data={worksData} />

<!-- After -->
<DataTable tableType={TableType.Works} title="Archive" anchor="works" {columns} data={worksData} />
```

Note: `tableType` and `anchor` are unchanged.

### RENAME-04: TableType enum value

File: `packages/sveltekit/src/lib/enums/index.ts`

```typescript
// Before
export enum TableType {
    New = 'new',
    Music = 'music',
    Video = 'video',
    TourDates = 'tour-dates',
    Products = 'products',
    Works = 'works',
}

// After
export enum TableType {
    New = 'new',
    Music = 'music',
    Video = 'video',
    TourDates = 'tour-dates',
    Products = 'products',
    Works = 'archive',
}
```

The enum key `Works` stays the same (internal code references `TableType.Works` everywhere — no search-replace needed). Only the string value changes.

### CLIENT-01: WorkDetail initial viewMode from defaultView

File: `packages/sveltekit/src/lib/components/Works/WorkDetail.svelte`

```typescript
// Add mapping function (place before $state declarations):
function defaultViewToMode(dv: Work['defaultView']): ViewMode {
    if (dv === 'text') return 'text';
    if (dv === 'grid') return 'grid';
    return 'slideshow'; // 'image' and undefined both default to slideshow
}

// Replace hardcoded initial state:
// Before:
let viewMode = $state<ViewMode>('slideshow');

// After:
// svelte-ignore state_referenced_locally
let viewMode = $state<ViewMode>(defaultViewToMode(work.defaultView));
```

No GROQ query change is required — the `...` spread at document root already projects `defaultView`. The `Work` type from `@sanity-types` already exposes `defaultView?: 'image' | 'text' | 'grid'`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Svelte 4 `let` + reactive stores | Svelte 5 `$state` rune | Svelte 5 (already in use) | Prop-derived initial state is set at declaration time, not in `onMount` |

**Deprecated/outdated:**

- Svelte 4 `export let` for props: The works detail page (`+page.svelte`) still uses `export let data` (Svelte 4 pattern), while `WorkDetail.svelte` uses `$props()` (Svelte 5). Both work. Do not change the page-level pattern in this phase.

## Open Questions

1. **GROQ query explicit projection**
   - What we know: The `...` spread in `workBySlug` already fetches `defaultView` as a scalar field.
   - What's unclear: Whether the project prefers explicit projection (listing each field) over spread for clarity.
   - Recommendation: Leave the query unchanged. The spread is correct and already tested. Adding an explicit `defaultView` field to the projection is optional cosmetic work and out of scope for this phase.

## Sources

### Primary (HIGH confidence)

- Direct code read — `packages/sveltekit/src/lib/components/Works/WorkDetail.svelte` — ViewMode type, $state usage, existing svelte-ignore pattern
- Direct code read — `packages/sveltekit/src/lib/enums/index.ts` — TableType enum and current values
- Direct code read — `packages/sveltekit/src/lib/components/Tables/WorksTable.svelte` — title prop and anchor usage
- Direct code read — `packages/sveltekit/src/lib/components/Header/Header.svelte` — TOC link text "Works"
- Direct code read — `packages/sveltekit/src/lib/components/Tables/DataTable.svelte` — confirmed TableType value becomes CSS class, no global CSS targets `.works`
- Direct code read — `packages/sanity/sanity.types.ts` — confirmed `Work.defaultView?: 'image' | 'text' | 'grid'`
- Direct code read — `packages/sveltekit/src/lib/groq/index.ts` — confirmed `workBySlug` uses `...` spread (covers defaultView), `defaultView` not explicitly listed
- Direct code read — `.planning/REQUIREMENTS.md` — out of scope: URL paths, exhaustive internal variable renaming

### Secondary (MEDIUM confidence)

- `.planning/codebase/ARCHITECTURE.md` — data flow description (verified against actual code)
- `.planning/STATE.md` — project decisions (e.g., three view options map to existing WorkDetail modes)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — no new libraries; all existing tech confirmed by direct code read
- Architecture: HIGH — all target files identified, change sites located precisely
- Pitfalls: HIGH — anchor/ID confusion and ViewMode mismatch verified against actual code

**Research date:** 2026-02-23
**Valid until:** Until WorkDetail.svelte or the Sanity schema changes (stable for 60+ days otherwise)

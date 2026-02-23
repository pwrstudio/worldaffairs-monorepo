# Phase 2: Schema Fields - Research

**Researched:** 2026-02-23
**Domain:** Sanity v5 schema authoring — inline object fields, string radio input, typegen
**Confidence:** HIGH

## Summary

Phase 2 adds three fields to the existing `Work.ts` schema: a `credits` text field and a `year` number field inside each media array item object, plus a `defaultView` string field with radio layout at the document root. All three changes are pure schema edits to `packages/sanity/schemaTypes/Work.ts`; no new files are needed. After editing the schema, Sanity TypeGen is run to regenerate `packages/sanity/sanity.types.ts`, and then `pnpm check` confirms TypeScript compilation passes in the SvelteKit package.

The Sanity v5 pattern for radio inputs is a `string` field with `options.list` (array of `{title, value}` objects) and `options.layout: 'radio'`. A default value is set via the `initialValue` property at field level. This is documented and stable in v5 — no custom input components are required.

The media array items are defined as inline anonymous objects (`type: 'object'`) inside the `media` array in `Work.ts`. The `credits` and `year` fields must be added to the `fields` array of each of the three media object types: `imageMedia`, `audioMedia`, and `videoMedia`.

**Primary recommendation:** Edit `Work.ts` directly — add two fields to each media object's `fields` array, add one field to the document root `fields` array, then run `pnpm typegen:sanity` and `pnpm check`.

<phase_requirements>

## Phase Requirements

| ID       | Description                                                                                         | Research Support                                                                                                                                                          |
| -------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FIELD-01 | Each media item in collection document has a `credits` text field                                   | Add `{title: 'Credits', name: 'credits', type: 'text'}` to each media object's `fields` array in `Work.ts`                                                                |
| FIELD-02 | Each media item in collection document has a `year` field                                           | Add `{title: 'Year', name: 'year', type: 'number'}` with integer validation to each media object's `fields` array in `Work.ts`                                            |
| FIELD-03 | Collection document has a `defaultView` radio field with options image, text, grid (default: image) | Add `{title: 'Default View', name: 'defaultView', type: 'string', options: {list: [...], layout: 'radio'}, initialValue: 'image'}` to root document `fields` in `Work.ts` |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose                           | Why Standard                              |
| ------- | ------- | --------------------------------- | ----------------------------------------- |
| sanity  | ^5.11.0 | Schema authoring, Studio, TypeGen | Already installed; built-in schema system |

### Supporting

| Library        | Version                 | Purpose                                    | When to Use                                       |
| -------------- | ----------------------- | ------------------------------------------ | ------------------------------------------------- |
| sanity typegen | bundled with sanity CLI | Generates TypeScript types from schema     | After any schema change                           |
| svelte-check   | ^4.4.3                  | TypeScript compilation check for SvelteKit | After typegen to confirm no type errors in client |

### Alternatives Considered

| Instead of            | Could Use              | Tradeoff                                                                                           |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| string + radio layout | custom input component | Custom input is unnecessary for simple radio; `options.layout: 'radio'` is built-in and documented |
| number type for year  | string type for year   | `number` is correct and consistent with existing `yearStart`/`yearEnd` fields at document level    |

**Installation:** No new packages required — all tools already present.

## Architecture Patterns

### Recommended Project Structure

No new files needed. All changes are within:

```
packages/sanity/
├── schemaTypes/
│   └── Work.ts          ← Edit: add fields to media objects + root
└── sanity.types.ts      ← Regenerated automatically by typegen
```

### Pattern 1: Inline Object Field (adding fields to media items)

**What:** The three media types (`imageMedia`, `audioMedia`, `videoMedia`) are anonymous inline objects inside the `media` array. Fields are added directly to their `fields` array.

**When to use:** Always — this is the only way to add fields to inline object array items in Sanity v5.

**Example:**

```typescript
// packages/sanity/schemaTypes/Work.ts
// Source: existing Work.ts pattern + Sanity v5 docs
{
    title: 'Image',
    name: 'imageMedia',
    type: 'object',
    fields: [
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Caption',
            name: 'caption',
            type: 'string',
        },
        // NEW: add these two
        {
            title: 'Credits',
            name: 'credits',
            type: 'text',
            rows: 3,
        },
        {
            title: 'Year',
            name: 'year',
            type: 'number',
            validation: (Rule: any) => Rule.integer().min(1900).max(2100),
        },
    ],
    // ... preview unchanged
}
```

Same two fields are added to `audioMedia` and `videoMedia` objects.

### Pattern 2: String Field with Radio Layout (defaultView)

**What:** A `string` field at the document root with `options.list` and `options.layout: 'radio'`. `initialValue` sets which option is pre-selected on new documents.

**When to use:** Whenever the user must pick exactly one value from a short list — radio is visually clear for 2–5 options.

**Example:**

```typescript
// Source: https://www.sanity.io/docs/studio/string-type (verified 2026-02-23)
{
    title: 'Default View',
    name: 'defaultView',
    type: 'string',
    options: {
        list: [
            { title: 'Image', value: 'image' },
            { title: 'Text', value: 'text' },
            { title: 'Grid', value: 'grid' },
        ],
        layout: 'radio',
        direction: 'horizontal',   // renders options side-by-side
    },
    initialValue: 'image',
},
```

`initialValue` only applies to newly created documents. Existing documents will have `defaultView: undefined` until an editor saves the field.

### Pattern 3: Regenerating Types

**What:** Two-step process — extract schema JSON then generate TypeScript types.

**When to use:** After any schema change before running `pnpm check`.

**Commands (from `package.json` scripts — verified):**

```bash
# From repo root (preferred):
pnpm typegen:sanity
# Runs: sanity schema extract --enforce-required-fields && sanity typegen generate

# Or from packages/sanity/:
pnpm typegen
# Runs: sanity schema extract && sanity typegen generate
```

After typegen, run:

```bash
pnpm check
# Runs svelte-kit sync && svelte-check --tsconfig ./tsconfig.json inside packages/sveltekit
```

### Anti-Patterns to Avoid

- **Adding `defaultView` inside the media object:** The requirement is at the collection (document) level, not per media item. It belongs in the root `fields` array of `Work.ts`, not inside any media object.
- **Defining separate named schema types for media items:** The media items are already inline anonymous objects. Do not extract them into separate schema type files — this would require registering them and change the existing structure unnecessarily.
- **Using `type: 'text'` with no `rows`:** Omitting `rows` renders a single-line text area. Set `rows: 3` (or similar) for a usable multi-line credits input.
- **Setting `initialValue` on `year`:** Year is per-media-item and varies; no useful default exists. Leave it optional.
- **Skipping typegen before `pnpm check`:** The SvelteKit package imports from `@sanity-types` alias which points to `packages/sanity/sanity.types.ts`. Running check before typegen will type-check against stale types and may miss type errors or report false positives.

## Don't Hand-Roll

| Problem                          | Don't Build                  | Use Instead                                   | Why                                                        |
| -------------------------------- | ---------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Radio button UI for string field | Custom React input component | `options.layout: 'radio'` on `type: 'string'` | Built into Sanity Studio v5; requires zero additional code |
| TypeScript types for schema      | Manually written types       | `pnpm typegen:sanity`                         | Schema and generated types stay in sync automatically      |

**Key insight:** Sanity Studio v5 has first-class support for radio, dropdown, checkbox, and tag layouts directly on primitive field types. Custom input components are only needed for non-standard UI.

## Common Pitfalls

### Pitfall 1: `initialValue` Does Not Backfill Existing Documents

**What goes wrong:** After adding `defaultView` with `initialValue: 'image'`, existing collection documents will show `undefined` for `defaultView` until an editor opens and saves them. The SvelteKit CLIENT-01 implementation (Phase 3) must handle `undefined` gracefully.
**Why it happens:** `initialValue` is a Studio-side default applied only at document creation time, not a database default.
**How to avoid:** Phase 3 must treat `undefined`/missing `defaultView` as `'image'` (the intended default). This is Phase 3 concern but must be known now.
**Warning signs:** Phase 3 tests fail because existing documents have no `defaultView` value.

### Pitfall 2: TypeGen Not Run After Schema Edit

**What goes wrong:** The `Work` TypeScript type in `sanity.types.ts` does not include the new fields, causing type errors or missing fields when accessed in SvelteKit.
**Why it happens:** `sanity.types.ts` is a generated file and not edited manually.
**How to avoid:** Run `pnpm typegen:sanity` immediately after editing `Work.ts`. Success criterion 4 ("Sanity types are regenerated") makes this explicit.
**Warning signs:** `pnpm check` passes but `sanity.types.ts` does not contain `credits`, `year`, or `defaultView` on the `Work` type.

### Pitfall 3: `credits` Field Name Collision

**What goes wrong:** There is already a top-level `credits` field on the `Work` document (type `text`, optional). Adding `credits` to media items creates a second field with the same name in a different scope — this is valid and expected, but could be confusing.
**Why it happens:** The requirement intentionally adds per-media credits in addition to the existing document-level credits.
**How to avoid:** When adding `credits` to media objects, confirm the field is placed inside each media object's `fields` array, not at the document root. The document root already has credits; do not add it there again.
**Warning signs:** Accidentally editing the existing root `credits` field instead of adding to media objects.

### Pitfall 4: `direction` Is Layout-Only

**What goes wrong:** Setting `direction: 'horizontal'` on `defaultView` without also setting `layout: 'radio'` has no effect — `direction` is ignored for dropdown layout.
**Why it happens:** `direction` is a supplementary option that only applies when `layout: 'radio'` is set.
**How to avoid:** Always set both `layout: 'radio'` and `direction` together.

## Code Examples

Verified patterns from official sources:

### Complete `defaultView` Field Definition

```typescript
// Source: https://www.sanity.io/docs/studio/string-type (verified 2026-02-23)
{
    title: 'Default View',
    name: 'defaultView',
    type: 'string',
    options: {
        list: [
            { title: 'Image', value: 'image' },
            { title: 'Text', value: 'text' },
            { title: 'Grid', value: 'grid' },
        ],
        layout: 'radio',
        direction: 'horizontal',
    },
    initialValue: 'image',
},
```

### Media Item `credits` and `year` Fields

```typescript
// Pattern consistent with existing yearStart/yearEnd at document level
{
    title: 'Credits',
    name: 'credits',
    type: 'text',
    rows: 3,
},
{
    title: 'Year',
    name: 'year',
    type: 'number',
    validation: (Rule: any) => Rule.integer().min(1900).max(2100),
},
```

### Typegen Commands (from package.json — verified)

```bash
# Root-level (preferred):
pnpm typegen:sanity
# Equivalent to: sanity schema extract --enforce-required-fields && sanity typegen generate

# Type-check after regeneration:
pnpm check
```

### Expected Generated Type After Phase 2

After running typegen, `packages/sanity/sanity.types.ts` `Work` type will include:

```typescript
export type Work = {
    // ... existing fields ...
    defaultView?: string;   // new root field
    media?: Array<
        | {
              image: { ... };
              caption?: string;
              credits?: string;   // new
              year?: number;      // new
              _type: 'imageMedia';
              _key: string;
          }
        | {
              file: { ... };
              caption?: string;
              credits?: string;   // new
              year?: number;      // new
              _type: 'audioMedia';
              _key: string;
          }
        | {
              file: { ... };
              caption?: string;
              credits?: string;   // new
              year?: number;      // new
              _type: 'videoMedia';
              _key: string;
          }
    >;
};
```

## State of the Art

| Old Approach                                 | Current Approach                                     | When Changed               | Impact                                                            |
| -------------------------------------------- | ---------------------------------------------------- | -------------------------- | ----------------------------------------------------------------- |
| Manual TypeScript type files for Sanity data | `sanity typegen generate` produces `sanity.types.ts` | Sanity v3.14+ (TypeGen GA) | No hand-maintaining types — edit schema, run command, types match |
| Custom input React components for radio      | `options.layout: 'radio'` on string field            | Sanity v2+ (stable in v5)  | Zero custom code needed for standard radio layouts                |

**Deprecated/outdated:**

- Custom input components for radio buttons: Not needed in Sanity v5 for standard use cases; built-in via `options.layout`.

## Open Questions

1. **Should `year` on media items be required?**
    - What we know: The requirements say "has a year field" without specifying required vs. optional. The existing document-level `yearStart` is required, `yearEnd` is optional.
    - What's unclear: Whether every media item must have a year or it is supplementary metadata.
    - Recommendation: Make it optional (no `validation: Rule.required()`). This is safer — existing media items in Sanity would otherwise fail validation immediately.

2. **Should `credits` on media items be `text` or `string`?**
    - What we know: The requirement says "credits text field". The existing document-level credits field is `type: 'text'` with `rows: 6`. Individual media credits are likely shorter.
    - What's unclear: Expected length of per-media credits.
    - Recommendation: Use `type: 'text'` with `rows: 3` for consistency with the existing credits field convention.

## Sources

### Primary (HIGH confidence)

- [Sanity String Type Docs](https://www.sanity.io/docs/studio/string-type) — radio layout, list options, initialValue, direction — fetched 2026-02-23
- `/packages/sanity/schemaTypes/Work.ts` — actual media object structure confirmed by direct read
- `/packages/sanity/package.json` — typegen script: `sanity schema extract && sanity typegen generate`
- `/package.json` (root) — `typegen:sanity` script: `sanity schema extract --enforce-required-fields && sanity typegen generate`

### Secondary (MEDIUM confidence)

- [Sanity radio button answer](https://www.sanity.io/answers/how-to-show-a-list-as-radio-button) — confirmed radio layout syntax (cross-verified with official string type docs)
- [Sanity TypeGen docs](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) — typegen workflow confirmed

### Tertiary (LOW confidence)

- None

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Sanity v5 is already installed; string radio is documented official API
- Architecture: HIGH — existing Work.ts structure read directly from codebase; all changes are additive edits to one file
- Pitfalls: HIGH — credits name collision confirmed by reading actual schema; initialValue behavior is documented

**Research date:** 2026-02-23
**Valid until:** 2026-03-25 (Sanity v5 schema API is stable)

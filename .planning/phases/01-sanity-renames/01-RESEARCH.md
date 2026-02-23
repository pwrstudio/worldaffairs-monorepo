# Phase 1: Sanity Renames - Research

**Researched:** 2026-02-23
**Domain:** Sanity CMS schema and desk structure configuration
**Confidence:** HIGH

## Summary

This phase makes two targeted label changes inside the Sanity Studio: the `work` document type gets its display title changed from "Work" to "Collection", and a new desk structure entry is added labelled "Archive" that lists all `work` documents. No internal identifiers (`name: 'work'`, `_type: 'work'`) change — only the human-readable `title` strings visible in the Studio UI.

The codebase inspection revealed an important discovery: `deskStructure.ts` currently has NO entry for works at all. The requirement "rename Works to Archive in desk structure" therefore means adding a new list item rather than renaming an existing one. This is a simple `S.listItem().title('Archive')` addition using the same document list pattern already used for Releases, Videos, Tours, and Products.

The only files that need editing are `packages/sanity/schemaTypes/Work.ts` (change `title: 'Work'` to `title: 'Collection'`) and `packages/sanity/deskStructure.ts` (add the Archive list item). After these edits the Sanity Studio must be restarted locally to reflect the changes; there is no schema migration needed since the internal `name: 'work'` identifier is preserved.

**Primary recommendation:** Edit `Work.ts` title and add a desk structure entry for Archive in `deskStructure.ts`. Do not touch `name: 'work'`, GROQ queries, or generated types — those are out of scope for this phase.

<phase_requirements>

## Phase Requirements

| ID        | Description                                                              | Research Support                                                                                                                                       |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RENAME-01 | Sanity document type title renamed from "Work" to "Collection" in schema | Change `title: 'Work'` → `title: 'Collection'` in `Work.ts` line 4. The `name: 'work'` key stays unchanged.                                            |
| RENAME-02 | Sanity desk structure list item renamed from "Works" to "Archive"        | No existing Works entry exists in `deskStructure.ts` — add a new `S.listItem().title('Archive')` item following the established document list pattern. |

</phase_requirements>

## Standard Stack

### Core

| Library        | Version                 | Purpose                                 | Why Standard                                                 |
| -------------- | ----------------------- | --------------------------------------- | ------------------------------------------------------------ |
| sanity         | 5.11.0                  | Schema definition + Studio hosting      | Already in project; provides `defineConfig`, `structureTool` |
| react-icons/md | (via react-icons 5.5.0) | Icons for document types and desk items | Already used in `Work.ts` and `deskStructure.ts`             |

### Supporting

| Library          | Version            | Purpose                                                                     | When to Use                            |
| ---------------- | ------------------ | --------------------------------------------------------------------------- | -------------------------------------- |
| sanity/structure | (part of sanity 5) | Desk structure builder API (`S.list()`, `S.listItem()`, `S.documentList()`) | Building custom desk structure layouts |

### Alternatives Considered

| Instead of           | Could Use               | Tradeoff                                                                                              |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Editing `title` only | Renaming `name: 'work'` | Renaming `name` would break all existing documents, GROQ queries, and generated types — never do this |

**Installation:** No new packages required for this phase.

## Architecture Patterns

### Recommended Project Structure

No structural changes to directories needed. Both target files already exist:

```
packages/sanity/
├── schemaTypes/
│   └── Work.ts          # Change title: 'Work' → title: 'Collection'
└── deskStructure.ts     # Add Archive list item
```

### Pattern 1: Sanity Schema `title` vs `name`

**What:** In Sanity schema objects, `title` is the human-readable label shown in the Studio UI; `name` is the internal identifier used in documents, GROQ queries, and generated TypeScript types.
**When to use:** Change `title` freely for UI label renames. Never change `name` without a full data migration.
**Example:**

```typescript
// Source: packages/sanity/schemaTypes/Work.ts (current)
export default {
    title: 'Work', // ← UI label: change this to 'Collection'
    name: 'work', // ← internal ID: DO NOT change
    type: 'document',
    // ...
};
```

After change:

```typescript
export default {
    title: 'Collection', // ← new display label in Studio
    name: 'work', // ← unchanged internal identifier
    type: 'document',
    // ...
};
```

### Pattern 2: Desk Structure Document List Item

**What:** A desk structure list item that opens a filtered document list is created with `S.listItem().title(label).icon(Icon).child(S.documentList().title(label).filter(...))`.
**When to use:** Any time a category of documents needs to appear in the left-hand Studio navigation pane.
**Example** (modelled on the existing Videos entry in `deskStructure.ts`):

```typescript
// Source: packages/sanity/deskStructure.ts (existing Videos pattern)
S.listItem()
    .title('Videos')
    .icon(MdVideocam)
    .child(
        S.documentList()
            .title('Videos')
            .showIcons(true)
            .filter('_type == $type')
            .params({ type: 'video' })
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
    ),
```

The Archive entry follows the same pattern, filtering on `_type == 'work'`:

```typescript
import { MdCollectionsBookmark } from 'react-icons/md'; // or keep MdWork

S.listItem()
    .title('Archive')
    .icon(MdWork)        // keep existing MdWork import; already imported
    .child(
        S.documentList()
            .title('Archive')
            .showIcons(true)
            .filter('_type == $type')
            .params({ type: 'work' })
    ),
```

### Anti-Patterns to Avoid

- **Renaming `name: 'work'`:** Changes the internal `_type` stored in Sanity documents. All existing documents would become orphaned and GROQ queries using `_type == 'work'` would return zero results.
- **Renaming the file `Work.ts`:** The filename is a module reference used in `schemaTypes/index.ts`. Renaming without updating the import breaks compilation. Since this phase only changes the display title, there is no reason to rename the file.
- **Regenerating types in this phase:** `sanity.types.ts` is auto-generated. Since no `name` identifiers change, the types remain valid. Regeneration is a Phase 2 concern.

## Don't Hand-Roll

| Problem                   | Don't Build                           | Use Instead                                     | Why                                                                                        |
| ------------------------- | ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Desk structure navigation | Custom React component for Studio nav | `S.listItem()` + `S.documentList()` builder API | Sanity's structure builder handles routing, document creation, and filtering automatically |

**Key insight:** The structure builder API (`S.*`) is already used for every other section in `deskStructure.ts`. Adding Archive is a copy-paste-and-adapt operation, not new infrastructure.

## Common Pitfalls

### Pitfall 1: Changing `name` Instead of `title`

**What goes wrong:** Developer edits `name: 'work'` thinking it's the label, not realising it's the internal document type identifier. All existing `work` documents in Sanity become unreadable; GROQ queries return empty results; generated TypeScript types break.
**Why it happens:** Both `title` and `name` look like string labels at a glance.
**How to avoid:** Only edit the `title` property. Verify `name: 'work'` is unchanged after editing.
**Warning signs:** Sanity Studio shows document count as 0 after the change.

### Pitfall 2: Forgetting to Add Archive Entry to Desk Structure

**What goes wrong:** Phase 1 only renames the schema title and the Studio "New document" dropdown says "Collection", but there is still no "Archive" navigation item in the left pane. RENAME-02 is unmet.
**Why it happens:** `deskStructure.ts` currently has no works entry — it's easy to miss that an addition (not a rename) is required.
**How to avoid:** The desk structure change is a separate, required edit. Both files must be touched.
**Warning signs:** Studio left nav shows no "Archive" item even after schema title rename.

### Pitfall 3: Forgetting Divider Placement

**What goes wrong:** Archive list item is added to the desk structure without a divider, resulting in it running directly against adjacent items (Products, Store list) with no visual separation.
**Why it happens:** Dividers are manual `S.divider()` calls and easy to omit when appending a new item.
**How to avoid:** Place an `S.divider()` before the new Archive list item, matching the pattern used for other section groups in `deskStructure.ts`.

### Pitfall 4: Studio Not Restarted After Schema Change

**What goes wrong:** Developer edits the files but the Studio still shows the old "Work" title.
**Why it happens:** The Sanity dev server uses HMR but schema changes sometimes require a full restart.
**How to avoid:** Stop and restart `pnpm dev:sanity` after edits. Verify in a fresh browser tab.

## Code Examples

Verified patterns from the actual project source:

### RENAME-01: Change document type title in Work.ts

```typescript
// File: packages/sanity/schemaTypes/Work.ts
// Before:
export default {
    title: 'Work',
    name: 'work',
    type: 'document',
    // ...
};

// After:
export default {
    title: 'Collection',
    name: 'work', // unchanged — critical
    type: 'document',
    // ...
};
```

### RENAME-02: Add Archive entry to deskStructure.ts

```typescript
// File: packages/sanity/deskStructure.ts
// MdWork is already imported at the top of the file

// Add this block inside the S.list().items([...]) array.
// Suggested placement: after Products, before the end of the array.
// Add an S.divider() before it if desired.

S.divider(),
S.listItem()
    .title('Archive')
    .icon(MdWork)
    .child(
        S.documentList()
            .title('Archive')
            .showIcons(true)
            .filter('_type == $type')
            .params({ type: 'work' })
    ),
```

## State of the Art

| Old Approach                                   | Current Approach                                     | When Changed     | Impact                                                             |
| ---------------------------------------------- | ---------------------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| Sanity v2 schema (string-based, no TypeScript) | Sanity v3/v5 schema with TypeScript and defineConfig | Sanity v3 (2022) | Schema is plain TS objects; `defineConfig` provides type inference |

**Deprecated/outdated:**

- `part:@sanity/base/schema`: Old v2 schema registration system. This project uses v5's `schema: { types: schemaTypes }` in `defineConfig` — already correct.

## Open Questions

1. **Where in the desk structure should Archive appear?**
    - What we know: Currently the structure ends with Store list → Products. There is no existing works section.
    - What's unclear: User preference for placement (before Store? after Products? in a separate group?).
    - Recommendation: Place it after a divider following the Products item, or before Tours as it's content rather than commerce. Since this is a UI-only preference with no functional impact, the planner can decide based on logical grouping. A reasonable default: add a divider and Archive entry between Products and the end of the list, keeping commerce items (Store, Products) together.

2. **Should the `MdWork` icon be changed to something else?**
    - What we know: `MdWork` is already imported and used in `Work.ts` for the document icon. It renders a briefcase/work icon.
    - What's unclear: Whether a different icon (e.g., `MdArchive`, `MdCollections`) would better represent "Archive".
    - Recommendation: Keep `MdWork` for now since it's already imported and the icon change is cosmetic. Out of scope unless explicitly requested.

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection of `packages/sanity/schemaTypes/Work.ts` — confirmed `title: 'Work'`, `name: 'work'`
- Direct codebase inspection of `packages/sanity/deskStructure.ts` — confirmed no existing works/archive entry
- Direct codebase inspection of `packages/sanity/sanity.config.ts` — confirmed structure tool integration pattern
- Direct codebase inspection of `packages/sanity/schemaTypes/index.ts` — confirmed schema registration

### Secondary (MEDIUM confidence)

- Sanity v5 documentation pattern: `title` vs `name` distinction is a fundamental Sanity concept documented in official Sanity schema docs (verified by consistent project usage)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — confirmed by direct inspection of project files
- Architecture patterns: HIGH — patterns derived from existing code in the same file being edited
- Pitfalls: HIGH (title/name confusion, missing desk entry) — derived from codebase evidence; MEDIUM (HMR restart) — common dev experience

**Research date:** 2026-02-23
**Valid until:** 2026-04-23 (stable — Sanity schema API changes rarely)

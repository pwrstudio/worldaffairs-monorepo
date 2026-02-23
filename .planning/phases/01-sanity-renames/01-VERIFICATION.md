---
phase: 01-sanity-renames
verified: 2026-02-23T17:00:00Z
status: human_needed
score: 2/3 must-haves verified
human_verification:
    - test: "Open Sanity Studio in a browser and open the 'New document' dropdown"
      expected: "The list shows 'Collection' (not 'Work') as a document type option"
      why_human: 'UI label rendering in Studio cannot be verified by static file analysis'
    - test: "Click the 'Archive' item in the Studio left sidebar"
      expected: "A document list opens showing all collection/work documents filtered by _type == 'work'"
      why_human: 'Desk structure navigation rendering requires a running Studio instance'
    - test: 'Open an existing work document and attempt to edit and save it'
      expected: "Document saves successfully with no errors — internal name: 'work' is intact"
      why_human: 'CRUD round-trip requires a live Sanity dataset connection'
---

# Phase 1: Sanity Renames Verification Report

**Phase Goal:** The Sanity CMS reflects the new Archive/Collection naming throughout schema and desk structure
**Verified:** 2026-02-23T17:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                       | Status         | Evidence                                                                                                                                                                        |
| --- | --------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Sanity Studio displays 'Collection' as the document type title (not 'Work') | ? HUMAN NEEDED | `packages/sanity/schemaTypes/Work.ts` line 4: `title: 'Collection'` — correct value confirmed in source; Studio rendering requires human check                                  |
| 2   | Sanity Studio desk structure shows 'Archive' as a navigation list item      | ? HUMAN NEEDED | `packages/sanity/deskStructure.ts` lines 90–99: `S.listItem().title('Archive')` with `.params({ type: 'work' })` confirmed in source; navigation rendering requires human check |
| 3   | Creating and editing collection documents works normally after rename       | ? HUMAN NEEDED | `name: 'work'` unchanged at line 5 of Work.ts — internal identifier preserved; requires live Studio test to confirm CRUD integrity                                              |

**Score:** 0/3 truths machine-verified — all pass static code checks; all require human confirmation for Studio rendering behavior

**Automated pre-conditions (all pass):**

- `packages/sanity/schemaTypes/Work.ts` line 4: `title: 'Collection'` — CONFIRMED
- `packages/sanity/schemaTypes/Work.ts` line 5: `name: 'work'` — CONFIRMED unchanged
- `packages/sanity/deskStructure.ts` line 91: `.title('Archive')` — CONFIRMED
- `packages/sanity/deskStructure.ts` line 98: `.params({ type: 'work' })` — CONFIRMED
- Divider at line 89 precedes Archive entry — CONFIRMED
- Both commits (12b752e, 398a4bb) exist in git history — CONFIRMED
- Only the two expected files were modified — CONFIRMED

### Required Artifacts

| Artifact                              | Expected                                    | Status   | Details                                                                       |
| ------------------------------------- | ------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `packages/sanity/schemaTypes/Work.ts` | Collection document type with renamed title | VERIFIED | Exists, substantive (183 lines, full schema), `title: 'Collection'` at line 4 |
| `packages/sanity/deskStructure.ts`    | Archive navigation item in desk structure   | VERIFIED | Exists, substantive (100 lines), Archive list item at lines 90–99             |

### Key Link Verification

| From                               | To                                    | Via                                                                           | Status | Details                                                                                                                         |
| ---------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `packages/sanity/deskStructure.ts` | `packages/sanity/schemaTypes/Work.ts` | Archive list item filters on `_type == $type` with `params({ type: 'work' })` | WIRED  | Line 97–98 in deskStructure.ts: `.filter('_type == $type').params({ type: 'work' })` — matches `name: 'work'` in Work.ts line 5 |

### Requirements Coverage

| Requirement | Source Plan   | Description                                                              | Status    | Evidence                                                                                                |
| ----------- | ------------- | ------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------- |
| RENAME-01   | 01-01-PLAN.md | Sanity document type title renamed from "Work" to "Collection" in schema | SATISFIED | `title: 'Collection'` confirmed at Work.ts line 4; `name: 'work'` unchanged                             |
| RENAME-02   | 01-01-PLAN.md | Sanity desk structure list item renamed from "Works" to "Archive"        | SATISFIED | `S.listItem().title('Archive')` confirmed at deskStructure.ts lines 90–91; filters on `_type == 'work'` |

No orphaned requirements: REQUIREMENTS.md maps exactly RENAME-01 and RENAME-02 to Phase 1. Both are covered by 01-01-PLAN.md. No additional Phase 1 requirements exist in REQUIREMENTS.md.

### Anti-Patterns Found

None. Both files are clean — no TODOs, FIXMEs, placeholders, or empty implementations found.

### Human Verification Required

#### 1. Document type label in Studio UI

**Test:** Open Sanity Studio locally (`pnpm dev:sanity`) and click the pencil / "New document" button.
**Expected:** The document type picker shows "Collection" as an option (not "Work").
**Why human:** The `title` property controls the Studio UI label. Static analysis confirms the value is correct in source, but the Studio must be running to confirm rendering.

#### 2. Archive navigation item in desk sidebar

**Test:** In the running Studio, look at the left-hand navigation list.
**Expected:** An "Archive" item appears at the bottom of the list, after a divider following Products. Clicking it opens a document list of all collection/work documents.
**Why human:** Desk structure rendering depends on the Sanity runtime. Static analysis confirms the list item is declared and the filter is correct.

#### 3. Edit an existing work document

**Test:** Open any existing document via the Archive item and edit a field, then save.
**Expected:** The document saves successfully. No "document type not found" errors appear.
**Why human:** Confirms that `name: 'work'` remaining unchanged means existing stored documents remain valid. Requires a live Sanity dataset connection.

### Gaps Summary

No gaps detected in the static codebase. Both target files contain exactly the required changes, the key link between the two files is correctly wired, and both RENAME-01 and RENAME-02 requirements are satisfied by the implementation. The three outstanding human checks are verification of Studio runtime behavior — the source code pre-conditions for all three checks pass.

---

_Verified: 2026-02-23T17:00:00Z_
_Verifier: Claude (gsd-verifier)_

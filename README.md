# worldaffairs.se

A pnpm monorepo holding both World Affairs sites and the Sanity studio they share.

```
packages/
  sveltekit/        worldaffairs.se
  collected-works/  works.worldaffairs.se
  sanity/           the studio both sites read from (project fzoco9f8)
  scripts/          one-off import scripts
```

Both sites read the same Sanity project, so the schema lives in one studio and
`packages/sanity/sanity.types.ts` is the single generated type source. Each site aliases it
as `@sanity-types`. Run `pnpm typegen:sanity` after changing anything in
`packages/sanity/schemaTypes/`.

| Command                    | Does                                           |
| -------------------------- | ---------------------------------------------- |
| `pnpm dev`                 | all three under mprocs                         |
| `pnpm dev:sveltekit`       | the main site only                             |
| `pnpm dev:collected-works` | the exhibition site only                       |
| `pnpm dev:sanity`          | the studio only                                |
| `pnpm check`               | `svelte-check` across both sites               |
| `pnpm lint`                | ESLint where a package defines it              |
| `pnpm format`              | Prettier across the repo                       |
| `pnpm typegen:sanity`      | regenerate `sanity.types.ts` and `schema.json` |
| `pnpm deploy:sanity`       | deploy the studio                              |

`pnpm typegen:sanity` rewrites `packages/sanity/schema.json`, which is committed and kept
Prettier-formatted — run `pnpm format` after it.

The two sites deploy as two Netlify sites from this one repo. The main site is configured
entirely from the Netlify dashboard and carries no `netlify.toml`; the exhibition site has one
in `packages/collected-works/` and needs its base directory set to that package.

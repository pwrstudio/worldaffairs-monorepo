import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/*
	No `@sanity-types` alias here on purpose, unlike packages/sveltekit: `kit.alias` in
	svelte.config.js already applies it to Vite as well as to the generated tsconfig, so a
	second copy is redundant — and resolving it meant `__dirname`, which Vite 8 warns about,
	or `import.meta.dirname`, which is undefined below Node 20.11 and would take the config
	load down with it. A plain relative alias in one place avoids needing either.
*/

export default defineConfig({
    plugins: [sveltekit()],
});

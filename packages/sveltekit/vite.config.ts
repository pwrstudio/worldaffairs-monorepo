import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/*
	The `@sanity-types` alias lives in svelte.config.js alone. `kit.alias` applies it to Vite
	as well as to the generated tsconfig, so repeating it here was redundant — and doing so
	needed `__dirname`, which Vite 8 warns about under its native config loader.
*/

export default defineConfig({
    plugins: [sveltekit()],
});

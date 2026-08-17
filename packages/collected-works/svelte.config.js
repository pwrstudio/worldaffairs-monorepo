import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/*
	The Netlify adapter by name rather than `adapter-auto`. Auto detects the platform at build
	time and then installs the real adapter with a live `pnpm add`, which cannot work on
	Netlify: CI installs run against a frozen lockfile, so that step fails and takes the build
	down with it before anything is written to `build/`.
*/

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            '@sanity-types': '../sanity/sanity.types.ts',
        },
    },
};

export default config;

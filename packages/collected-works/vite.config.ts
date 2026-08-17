import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            // Matches the alias in svelte.config.js, which TypeScript reads instead
            '@sanity-types': path.resolve(import.meta.dirname, '../sanity/sanity.types.ts'),
        },
    },
});

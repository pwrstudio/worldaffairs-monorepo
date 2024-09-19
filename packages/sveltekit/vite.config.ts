import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		'@sanity-types': path.resolve(__dirname, '../sanity/sanity.types.ts') // Adjust the path as needed
		}
	  }
});

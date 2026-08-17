import { exhibition } from '$lib/content';
import type { Exhibition } from '$lib/content';

// The page is fully static while the content is hardcoded
export const prerender = true;

/**
 * Hardcoded for now. To read from the studio instead, replace the body with:
 *
 *   import { loadData } from '$lib/modules/sanity';
 *   import { exhibitionQuery } from '$lib/groq';
 *   return { exhibition: await loadData<Exhibition>(exhibitionQuery) };
 *
 * The projection in $lib/groq already returns this shape.
 */
export function load(): { exhibition: Exhibition } {
    return { exhibition };
}

import { posterInfo } from '$lib/content';
import type { PosterInfo } from '$lib/content';

// The page is fully static while the content is hardcoded
export const prerender = true;

/**
 * Hardcoded for now. To read from the studio instead, replace the body with:
 *
 *   import { loadData } from '$lib/modules/sanity';
 *   import { posterInfoQuery } from '$lib/groq';
 *   return { poster: await loadData<PosterInfo>(posterInfoQuery) };
 *
 * The projection in $lib/groq already returns this shape — except for `artwork`, which comes
 * back as a Sanity image and needs `urlFor()` rather than the static srcset used here.
 */
export function load(): { poster: PosterInfo } {
    return { poster: posterInfo };
}

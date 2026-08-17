import { exhibitionText } from '$lib/content';
import type { ExhibitionText } from '$lib/content';

// The page is fully static while the content is hardcoded
export const prerender = true;

/**
 * Hardcoded for now — see the note in $lib/content, the copy there is a placeholder. To read
 * from the studio instead, replace the body with:
 *
 *   import { loadData } from '$lib/modules/sanity';
 *   import { exhibitionTextQuery } from '$lib/groq';
 *   return { text: await loadData<ExhibitionText>(exhibitionTextQuery) };
 *
 * The projection in $lib/groq already returns this shape, and unlike the poster's artwork
 * nothing in it needs reworking — so this one is a true loader swap once the studio document
 * exists.
 */
export function load(): { text: ExhibitionText } {
    return { text: exhibitionText };
}

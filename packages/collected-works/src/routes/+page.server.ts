import { error } from '@sveltejs/kit';
import { loadData, urlFor } from '$lib/modules/sanity';
import { posterInfoQuery } from '$lib/groq';
import type { PosterInfo, PosterInfoResult, PosterArtwork } from '$lib/content';

/*
	Fetched per request rather than baked at build time, so a studio edit is live on the next
	page load without a rebuild.

	A `+page.server.ts` rather than a `+page.ts`: a universal load would also run in the
	browser on client-side navigation, and a browser calling the Sanity API needs the site's
	origin added to the project's CORS allowlist. Keeping the fetch on the server avoids that
	entirely, and the two-page site does not gain anything from fetching client-side.
*/

/*
	Widths matched to the column, which `--column-width` caps at 360 CSS px — so these are
	1x, 1.5x, 2x, 3x and a little headroom, not arbitrary large sizes. Anything above about
	1440 could never be picked at this measure. Revisit them if `--column-width` changes.

	`urlFor()` serves format negotiation from one URL with `auto('format')`, which is why
	there is no AVIF `<source>`: the browser gets AVIF or WebP from the same `src`.
*/
const ARTWORK_WIDTHS = [360, 540, 720, 1080, 1440];
const ARTWORK_FALLBACK_WIDTH = 720;

function buildArtwork(artwork: PosterInfoResult['artwork']): PosterArtwork {
    const dimensions = artwork?.asset?.metadata?.dimensions;

    if (!artwork?.asset?._id || !dimensions) {
        error(
            500,
            'The posterInfo document has no artwork image, or its asset is missing dimensions.'
        );
    }

    // `alt` is a plain field on the image rather than on the asset, so it is the editor's
    if (!artwork.alt) {
        error(500, 'The posterInfo artwork has no alt text.');
    }

    return {
        alt: artwork.alt,
        caption: artwork.caption,
        src: urlFor(artwork).width(ARTWORK_FALLBACK_WIDTH).auto('format').url(),
        srcset: ARTWORK_WIDTHS.map(
            (width) => `${urlFor(artwork).width(width).auto('format').url()} ${width}w`
        ).join(', '),
        // The source's own dimensions, so the `<img>` reserves the right box before it loads
        width: dimensions.width,
        height: dimensions.height,
    };
}

export async function load(): Promise<{ poster: PosterInfo }> {
    const result = await loadData<PosterInfoResult | null>(posterInfoQuery);

    if (!result) {
        error(500, 'No posterInfo document found in Sanity. Create it in the studio first.');
    }

    const { artist, title, yearStart, yearEnd, visiting } = result;

    if (!artist || !title || yearStart === undefined || !visiting?.length) {
        error(
            500,
            'The posterInfo document is missing artist, title, yearStart or visiting details.'
        );
    }

    return {
        poster: {
            artist,
            title,
            yearStart,
            yearEnd,
            visiting,
            artwork: buildArtwork(result.artwork),
        },
    };
}

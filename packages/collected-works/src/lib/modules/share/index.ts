import { error } from '@sveltejs/kit';
import { urlFor } from '$lib/modules/sanity';
import { SITE_BG } from '$lib/constants';
import type { ArtworkResult, ShareImage } from '$lib/content';

/*
	The image both pages are shared with. It lives here rather than in either loader because
	the card is the exhibition, not the page it was linked from: whichever of the two someone
	pastes into a message, the same sheet comes back.

	Built from the studio's artwork rather than a file in static/, on the same terms as the
	rest of the site — a new painting published in the studio is the new card on the next
	scrape, with nothing to rebuild and no second copy to remember to replace.
*/

/*
	1200 x 630 is the size every scraper is written around, and the one that fills a card
	rather than being letterboxed inside it.
*/
const SHARE_WIDTH = 1200;
const SHARE_HEIGHT = 630;

/*
	The painting is square and the card is not, so the choice is which to sacrifice: crop the
	work to a letterbox, or print it whole and fill what is left. `fit=fill` with the sheet's
	own green does the latter, so the card reads as the poster on its background rather than a
	band cut out of the middle of a painting.
*/
const SHARE_FIT = 'fill';

/*
	Pinned to JPEG rather than `auto('format')`, which the poster's own `<img>` uses. Format
	negotiation reads the `Accept` header, and a crawler's is unreliable or absent — one that
	is handed AVIF or WebP may render no card at all. Every scraper takes JPEG.
*/
const SHARE_FORMAT = 'jpg';
const SHARE_TYPE = 'image/jpeg';

/**
 * Narrows a projected artwork to the card both pages carry, or fails the request with a
 * readable message — the same contract every other loader in this package keeps.
 */
export function buildShareImage(artwork: ArtworkResult | undefined): ShareImage {
    if (!artwork?.asset?._id) {
        error(500, 'The posterInfo document has no artwork to build a share image from.');
    }

    // `alt` is a plain field on the image rather than on the asset, so it is the editor's
    if (!artwork.alt) {
        error(500, 'The posterInfo artwork has no alt text.');
    }

    /*
		`ignoreImageParams()` is what makes the fill above mean anything, and it is not
		optional. Given both a width and a height, the builder resolves the image's crop and
		hotspot into a `rect` and cuts a 1200:630 band out of the source before the fit is ever
		applied — leaving `fill` nothing to pad and the painting halved. It does this even when
		the studio sets neither, defaulting to a centre hotspot against the source dimensions
		the asset id carries. The flag is the builder's own way of saying don't: no rect, and
		the whole square lands on the green.

		The asset id rather than the artwork for the same reason, one step earlier — with the
		crop and the hotspot deliberately unread, there is no honesty in projecting them. The
		trade is that a crop set in the studio would not reach the card; nothing crops this
		image today, and a share card wants the work whole in any case.
	*/
    return {
        url: urlFor(artwork.asset._id)
            .width(SHARE_WIDTH)
            .height(SHARE_HEIGHT)
            .fit(SHARE_FIT)
            .bg(SITE_BG)
            .format(SHARE_FORMAT)
            .ignoreImageParams()
            .url(),
        alt: artwork.alt,
        width: SHARE_WIDTH,
        height: SHARE_HEIGHT,
        type: SHARE_TYPE,
    };
}

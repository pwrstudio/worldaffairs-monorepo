/**
 * Projections for the two collected-works singletons. Both documents are pinned to a known
 * `_id`, which is what the studio's desk structure creates them as.
 *
 * The artwork asks for named fields rather than spreading the whole asset: a bare `asset->`
 * drags in the blurHash, the LQIP data URI and the full colour palette, none of which either
 * page uses. `hotspot` and `crop` are kept because `urlFor()` reads them when it crops.
 */

/** The billing lines, which head both pages and so are projected by both queries */
const BILLING_FIELDS = `
	artist,
	title,
	yearStart,
	yearEnd
`;

/*
	What `buildShareImage()` needs, which both pages need in turn: they carry the same card.
	Three fields short of the poster's projection above, and deliberately so — the card is cut
	to a fixed size from the asset itself, so it asks neither how big the source is nor where
	its hotspot sits. See the builder for why the hotspot in particular is left out.
*/
const SHARE_ARTWORK = `
	artwork{
		alt,
		asset->{ _id }
	}
`;

export const posterInfoQuery = `
	*[_type == "posterInfo" && _id == "posterInfo"][0]{
		${BILLING_FIELDS},
		visiting,
		artwork{
			alt,
			caption,
			hotspot,
			crop,
			asset->{
				_id,
				metadata { dimensions { width, height } }
			}
		}
	}
`;

/*
	Two documents in one round trip: the text itself, and the parts of `posterInfo` this page
	borrows — the billing that heads it, and the artwork it is shared with. Both come out of
	one projection of that document rather than two, so the extra fields cost nothing.

	The type is still `exhibitionText` because `about` was already taken by the main site's own
	singleton — the two sites share one studio. Only the id is legacy; the page, the route and
	the studio's own label all read "About".
*/
export const aboutQuery = `
	{
		"about": *[_type == "exhibitionText" && _id == "exhibitionText"][0]{
			title,
			author,
			body
		},
		"posterInfo": *[_type == "posterInfo" && _id == "posterInfo"][0]{
			${BILLING_FIELDS},
			${SHARE_ARTWORK}
		}
	}
`;

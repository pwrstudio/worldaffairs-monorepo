/**
 * Projections for the two collected-works singletons. Both documents are pinned to a known
 * `_id`, which is what the studio's desk structure creates them as.
 *
 * The artwork asks for named fields rather than spreading the whole asset: a bare `asset->`
 * drags in the blurHash, the LQIP data URI and the full colour palette, none of which the
 * poster uses. `hotspot` and `crop` are kept because `urlFor()` reads them when it crops.
 */

export const posterInfoQuery = `
	*[_type == "posterInfo" && _id == "posterInfo"][0]{
		artist,
		title,
		yearStart,
		yearEnd,
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

export const exhibitionTextQuery = `
	*[_type == "exhibitionText" && _id == "exhibitionText"][0]{
		title,
		author,
		body
	}
`;

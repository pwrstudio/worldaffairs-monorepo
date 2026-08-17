/**
 * Projections for the two collected-works singletons. Both documents are pinned to a known
 * `_id`, which is what the studio's desk structure creates them as.
 *
 * The artwork asks for named fields rather than spreading the whole asset: a bare `asset->`
 * drags in the blurHash, the LQIP data URI and the full colour palette, none of which the
 * poster uses. `hotspot` and `crop` are kept because `urlFor()` reads them when it crops.
 */

/** The billing lines, which head both pages and so are projected by both queries */
const BILLING_FIELDS = `
	artist,
	title,
	yearStart,
	yearEnd
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
	Two documents in one round trip: the text itself, and the billing from `posterInfo` that
	heads the page above it.
*/
export const exhibitionTextQuery = `
	{
		"text": *[_type == "exhibitionText" && _id == "exhibitionText"][0]{
			title,
			author,
			body
		},
		"billing": *[_type == "posterInfo" && _id == "posterInfo"][0]{
			${BILLING_FIELDS}
		}
	}
`;

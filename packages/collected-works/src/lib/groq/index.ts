/**
 * Projections for the two collected-works singletons. Each matches the shape of its
 * counterpart in $lib/content, so a page moves from hardcoded content to Sanity by swapping
 * the loader in its `+page.ts` and nothing else.
 *
 * Both documents are singletons pinned to a known `_id`, which is what the studio's desk
 * structure creates them as.
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
			...,
			asset->
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

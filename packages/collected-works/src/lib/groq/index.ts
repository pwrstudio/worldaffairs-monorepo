/**
 * Matches the shape of `Exhibition` in $lib/content, so the page can switch from
 * hardcoded content to Sanity by swapping the loader in src/routes/+page.ts.
 */
export const exhibitionQuery = `
	*[_type == "exhibition" && _id == "exhibition"][0]{
		artist,
		title,
		yearStart,
		yearEnd,
		startDate,
		endDate,
		venue,
		openingHours,
		admission,
		artwork{
			alt,
			caption,
			...,
			asset->
		}
	}
`;

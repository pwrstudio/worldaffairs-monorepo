export const SANITY_ID = 'fzoco9f8';
export const SANITY_DATASET = 'production';

/*
	Where the site is served, which is what turns a route into the absolute URL a canonical
	link and an `og:url` both have to be. No trailing slash: every path is joined onto this
	with `new URL()`, which supplies the separator.
*/
export const SITE_URL = 'https://works.worldaffairs.se';

/** The publisher, printed above the exhibition's own name on a share card */
export const SITE_NAME = 'World Affairs';

/*
	English as it is set here — `centres`, `colour`, the en dashes below. The tag is only ever
	a hint to a scraper, but an honest one.
*/
export const SITE_LOCALE = 'en_GB';

/*
	The sheet's green, without the `#`, which is the form Sanity's image API wants for the
	share card's `bg`. It is the third place this colour is written down — keep it in step
	with `--color-bg` in global.css and the `theme-color` in app.html.
*/
export const SITE_BG = '3c9518';

/*
	The billing as one line. The dash between the years is an en dash, matching `formatYears()`
	and the description below — the years are a closed range, not a hyphenated word.
*/
export const SITE_TITLE = 'Jonatan Leandoer Håstad — Collected Works 2016–2026';
export const SITE_DESCRIPTION =
    'Collected Works 2016–2026. 25 September – 11 October 2026 at Torsgatan 22 Stockholm. Free admission.';

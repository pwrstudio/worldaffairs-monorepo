<script lang="ts">
    import { page } from '$app/state';
    import { SITE_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SITE_LOCALE } from '$lib/constants';
    import type { ShareImage } from '$lib/content';

    /*
		Every tag either page puts in the head, in one place. Both pages render this component
		and both pass the same share image, so the card is identical whichever of the two is
		linked — the exhibition is what is being shared, not the page it was copied from.

		The only thing a page decides is its own `<title>`, which is a different job: that one
		names the tab and the search result, so it says which page you are on. `og:title` below
		stays the billing on both.
	*/
    let { title = SITE_TITLE, image }: { title?: string; image: ShareImage } = $props();

    /*
		Absolute, as `og:url` and a canonical link both have to be, and built from the route
		rather than from `page.url` itself — the URL a visitor arrives on carries whatever
		campaign parameters were pasted onto it, and neither tag should name a copy.
	*/
    let canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={SITE_DESCRIPTION} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:locale" content={SITE_LOCALE} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_DESCRIPTION} />

    <!--
		The dimensions let a card render on the first scrape, before the crawler has fetched
		the image itself; the type saves it guessing. All three come from the builder that made
		the URL, so none of them can describe a different image than the one served.
	-->
    <meta property="og:image" content={image.url} />
    <meta property="og:image:type" content={image.type} />
    <meta property="og:image:width" content={String(image.width)} />
    <meta property="og:image:height" content={String(image.height)} />
    <meta property="og:image:alt" content={image.alt} />

    <!--
		The only Twitter tag written out: everything else it needs it takes from the Open Graph
		tags above. `summary_large_image` is the card the 1200 x 630 above is cut for.
	-->
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

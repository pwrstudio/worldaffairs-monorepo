<script lang="ts">
    import WorldAffairsLogo from '$lib/components/WorldAffairsLogo/WorldAffairsLogo.svelte';
    import type { Exhibition } from '$lib/content';
    import { formatDateRange, formatYears } from '$lib/modules/utils';

    let { exhibition }: { exhibition: Exhibition } = $props();

    let years = $derived(formatYears(exhibition));
    let dates = $derived(formatDateRange(exhibition.startDate, exhibition.endDate));

    /*
		The painting fills the column, so it is drawn at `--column-width` until the viewport is
		narrower than that. The page padding is ignored, which reads a little high and so errs
		towards the larger source file. Keep in step with `--column-width` below.
	*/
    const ARTWORK_SIZES = 'min(100vw, 360px)';
</script>

<!--
	A single centred column. Every block below is a plain block-level child of it, so they all
	take the column's width and line up without a width or a margin of their own — the only
	thing a block sets is the space under it.
-->
<article class="poster">
    <h1 class="billing">
        <span class="artist">{exhibition.artist}</span>
        <span class="title">{exhibition.title}</span>
        <span class="years">{years}</span>
    </h1>

    <picture class="artwork">
        {#each exhibition.artwork.sources ?? [] as source (source.type)}
            <source type={source.type} srcset={source.srcset} sizes={ARTWORK_SIZES} />
        {/each}
        <img
            src={exhibition.artwork.src}
            srcset={exhibition.artwork.srcset}
            sizes={ARTWORK_SIZES}
            width={exhibition.artwork.width}
            height={exhibition.artwork.height}
            alt={exhibition.artwork.alt}
            fetchpriority="high"
        />
    </picture>

    <div class="visiting">
        <p>{dates}</p>
        <p>{exhibition.venue}</p>
        <p>{exhibition.openingHours}</p>
        <p>{exhibition.admission}</p>
    </div>

    <div class="links">
        <p><a href="/exhibition-text">Exhibition text</a></p>
        <p>For inquiries contact <a href="mailto:info@worldaffairs.se">info@worldaffairs.se</a></p>
    </div>

    <a class="logo" href="https://worldaffairs.se">
        <WorldAffairsLogo />
    </a>
</article>

<style>
    .poster {
        /* The column. Everything else measures itself against this one width. */
        --column-width: 360px;

        --space-top: 48px;
        --space-bottom: 32px;
        --space-section: 16px;
        --half-space-section: calc(var(--space-section) / 2);

        --type-size-large: 24px;
        --line-height-large: 0.9;

        --type-size-medium: 18px;
        --line-height-medium: 1.1;

        /* The keyline around the artwork, and the hairlines above the links and the logo */
        --line-width: 3px;
        --rule-width: 1px;

        --color-fg-semi: rgba(0, 0, 0, 0.3);

        /* The mark inside the logo bar, which is otherwise the full column width */
        --logo-width: 64px;

        width: min(100%, var(--column-width));
        padding-block: var(--space-top) var(--space-bottom);

        /*
			`auto` on all four sides: it centres the column horizontally, and — as the only child
			of the page's column flexbox — vertically too, without the clipping that
			`justify-content: center` causes once the column is taller than the window.
		*/
        margin: auto;
        text-align: center;
    }

    /*
		The blocks are block-level, so they already fill the column and share its centre line.
		Each only declares the space under it; the last one leans on the column's own padding.
	*/
    .poster > * {
        margin-bottom: var(--space-section);
    }

    .visiting,
    .links {
        margin-bottom: var(--half-space-section);
    }

    .logo {
        margin-bottom: 0;
    }

    .billing {
        font-size: var(--type-size-large);
        line-height: var(--line-height-large);
        font-weight: 400;
    }

    .billing span {
        display: block;
    }

    .billing .title {
        font-weight: 700;
    }

    .billing .years {
        font-weight: 700;
        font-style: italic;
    }

    /*
		The keyline is drawn rather than photographed, and sits inside the column
		(`box-sizing: border-box`), so the painting itself is `--line-width` narrower on each
		side. The source file is square, which is what keeps the framed block square too.
	*/
    .artwork {
        display: block;
    }

    .artwork img {
        width: 100%;
        border: var(--line-width) solid var(--color-fg);
    }

    .visiting,
    .links {
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
    }

    .links {
        border-top: var(--rule-width) solid var(--color-fg-semi);
        padding-top: var(--half-space-section);
    }

    /*
		The link is the full column so its hairline matches the one above the links, but the
		mark inside keeps its own size — 17.55% of the column, the proportion it had against
		the artwork on the reference sheet.
	*/
    .logo {
        display: block;
        border-top: var(--rule-width) solid var(--color-fg-semi);
        padding-top: var(--half-space-section);
        text-decoration: none;
    }

    /*
		The poster prints the mark as a 40% tint of the ink rather than solid black; it is
		lifted a little from that and comes up to full strength on hover, which is the only
		state on the page that reads as interactive. The tint is on the mark alone, so the
		hairline above it stays the same weight as the one above the links.
	*/
    .logo :global(svg) {
        width: var(--logo-width);
        margin-inline: auto;
        opacity: 0.5;
    }

    .logo:hover,
    .logo:focus-visible {
        text-decoration: none;
    }

    .logo:hover :global(svg),
    .logo:focus-visible :global(svg) {
        opacity: 1;
    }

    .logo:focus-visible {
        outline: 2px solid var(--color-fg);
        outline-offset: 4px;
    }
</style>

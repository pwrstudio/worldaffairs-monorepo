<script lang="ts">
    import { resolve } from '$app/paths';
    import WorldAffairsLogo from '$lib/components/WorldAffairsLogo/WorldAffairsLogo.svelte';
    import type { PosterInfo } from '$lib/content';
    import { formatYears } from '$lib/modules/utils';
    import { renderText } from '$lib/modules/sanity';

    let { poster }: { poster: PosterInfo } = $props();

    let years = $derived(formatYears(poster));
    let visiting = $derived(renderText(poster.visiting));

    /*
		The painting fills the column, so it is drawn at `--column-width` until the viewport is
		narrower than that. The page padding is ignored, which reads a little high and so errs
		towards the larger source file. Keep in step with `--column-width` in global.css.
	*/
    const ARTWORK_SIZES = 'min(100vw, 360px)';
</script>

<!--
	The layout supplies the column, so every block below is a plain block-level child of it and
	lines up without a width or a margin of its own — the only thing a block sets is the space
	under it.
-->
<article class="poster">
    <h1 class="billing">
        <span class="artist">{poster.artist}</span>
        <span class="title">{poster.title}</span>
        <span class="years">{years}</span>
    </h1>

    <!--
		One `<img>` rather than a `<picture>`: `urlFor()` builds these URLs with `auto=format`,
		so the browser is served AVIF or WebP from the same `src` and there is no second format
		to offer in a `<source>`.
	-->
    <img
        class="artwork"
        src={poster.artwork.src}
        srcset={poster.artwork.srcset}
        sizes={ARTWORK_SIZES}
        width={poster.artwork.width}
        height={poster.artwork.height}
        alt={poster.artwork.alt}
        fetchpriority="high"
    />

    <!--
		Trusted HTML, on the same terms as the exhibition text: Portable Text from our own
		studio through `renderText`, which emits only the tags the schema can produce. Each
		paragraph becomes a `<p>`, and the global reset leaves those unspaced, so a block per
		line is what sets the four lines here.
	-->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="visiting">{@html visiting}</div>

    <div class="links">
        <p><a href={resolve('/exhibition-text')}>Exhibition text</a></p>
        <p>For inquiries contact <a href="mailto:info@worldaffairs.se">info@worldaffairs.se</a></p>
    </div>

    <a class="logo" href="https://worldaffairs.se">
        <WorldAffairsLogo />
    </a>
</article>

<style>
    /*
		The column, its rhythm, its type and the hairline colour all come from `:root` in
		global.css, which the exhibition text shares. Only what belongs to the poster alone
		is declared here.
	*/
    .poster {
        /* The keyline around the artwork */
        --line-width: 3px;

        /* The mark inside the logo bar, which is otherwise the full column width */
        --logo-width: 64px;
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
        width: 100%;
        border: var(--line-width) solid var(--color-fg);
    }

    .visiting,
    .links {
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
    }

    /* Links in the visiting lines get the same underline as those below them */
    .visiting :global(a) {
        text-decoration: underline;
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

<script lang="ts">
    import { resolve } from '$app/paths';
    import Billing from '$lib/components/Billing/Billing.svelte';
    import WorldAffairsLogo from '$lib/components/WorldAffairsLogo/WorldAffairsLogo.svelte';
    import type { PosterInfo } from '$lib/content';
    import { renderText } from '$lib/modules/sanity';

    let { poster }: { poster: PosterInfo } = $props();

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
    <Billing billing={poster} />

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
        <p><a href={resolve('/about')}>About</a></p>
        <p>For inquiries contact <a href="mailto:art@worldaffairs.se">art@worldaffairs.se</a></p>
    </div>

    <a class="logo" href="https://worldaffairs.se">
        <WorldAffairsLogo />
    </a>
</article>

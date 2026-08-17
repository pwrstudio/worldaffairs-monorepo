<script lang="ts">
    import { resolve } from '$app/paths';
    import { renderText } from '$lib/modules/sanity';
    import { SITE_TITLE } from '$lib/constants';

    let { data } = $props();

    let body = $derived(renderText(data.text.body));
</script>

<svelte:head>
    <title>{data.text.title} — {SITE_TITLE}</title>
    <meta name="description" content="Exhibition text for {SITE_TITLE}" />
</svelte:head>

<!--
	The layout supplies the column, so — as on the poster — each block below is a plain
	block-level child of it and only declares the space under it.
-->
<article class="text">
    <h1 class="title">{data.text.title}</h1>

    <!--
		Trusted HTML: it is Portable Text from our own studio, put through `renderText`, which
		emits only the handful of tags the `exhibitionText` schema can produce. The one value
		interpolated raw is a link's `href`, and the schema types that field as `url`, whose
		default validation admits nothing but http and https — so `javascript:` never reaches
		here. This is the same shape as the main site's `renderBlockText`.
	-->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="body">{@html body}</div>

    {#if data.text.author}
        <p class="author">{data.text.author}</p>
    {/if}

    <nav class="back">
        <a href={resolve('/')}>Back to the poster</a>
    </nav>
</article>

<style>
    .text > * {
        margin-bottom: var(--space-section);
    }

    .back {
        margin-bottom: 0;
    }

    .title {
        font-size: var(--type-size-large);
        line-height: var(--line-height-large);
        font-weight: 700;
    }

    /*
		The one place on the site set as running prose rather than stacked lines, so it takes
		the looser leading and reads ranged left — centring a paragraph of this length would
		leave the rag fighting the column.
	*/
    .body {
        font-size: var(--type-size-medium);
        line-height: var(--line-height-body);
        text-align: left;
    }

    .body :global(p + p),
    .body :global(blockquote) {
        margin-top: var(--space-section);
    }

    .body :global(blockquote) {
        margin-inline: var(--space-section);
        font-style: italic;
    }

    .body :global(a) {
        text-decoration: underline;
    }

    .author {
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
        font-style: italic;
    }

    .back {
        border-top: var(--rule-width) solid var(--color-fg-semi);
        padding-top: var(--half-space-section);
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
    }
</style>

<script lang="ts">
    import { resolve } from '$app/paths';
    import Billing from '$lib/components/Billing/Billing.svelte';
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
    <nav class="back">
        <a href={resolve('/')}>Back</a>
    </nav>

    <div class="billing-block">
        <Billing billing={data.billing} />
    </div>

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
</article>

<style>
    .text > * {
        margin-bottom: var(--space-section);
    }

    /*
		A wrapper around the `<Billing>` component, for two reasons. Svelte's scoped selectors
		do not reach a child component's root element, so `.text > *` above cannot give the
		billing its bottom margin directly — but it does reach this div. And `text-align`
		inherits down to it, which ranges the billing left here without a `:global` override:
		the poster centres it, and this page and the prose below share one edge.
	*/
    .billing-block {
        text-align: left;
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

    .author {
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
        font-style: italic;
    }

    .back {
        border-bottom: var(--rule-width) solid var(--color-fg-semi);
        padding-bottom: var(--half-space-section);
        margin-bottom: var(--half-space-section);
        font-size: var(--type-size-medium);
        line-height: var(--line-height-medium);
    }
</style>

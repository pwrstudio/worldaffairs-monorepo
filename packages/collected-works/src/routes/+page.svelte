<script lang="ts">
    import Poster from '$lib/components/Poster/Poster.svelte';
    import { SITE_TITLE, SITE_DESCRIPTION } from '$lib/constants';

    let { data } = $props();
</script>

<svelte:head>
    <title>{SITE_TITLE}</title>
    <meta name="description" content={SITE_DESCRIPTION} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_DESCRIPTION} />
    <meta property="og:image" content={data.exhibition.artwork.src} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Poster exhibition={data.exhibition} />

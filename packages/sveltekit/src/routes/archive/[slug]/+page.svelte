<script lang="ts">
    import type { Work } from '@sanity-types';
    import WorkLayout from '$lib/components/Works/WorkLayout.svelte';
    import { urlFor } from '$lib/modules/sanity';
    import { onMount } from 'svelte';

    onMount(() => {
        history.scrollRestoration = 'manual';
        requestAnimationFrame(() => window.scrollTo(0, 0));
    });

    export let data: {
        work: Work;
    };

    const { work } = data;

    const pageTitle = `${work.title} | World Affairs AB`;
    const pageDescription = work.intro ? work.intro.slice(0, 155) : '';
    const firstImage = (work.media ?? []).find((m) => m._type === 'imageMedia');
    const ogImageUrl =
        firstImage && firstImage._type === 'imageMedia'
            ? urlFor(firstImage.image as any)
                  .width(1200)
                  .height(630)
                  .fit('crop')
                  .url()
            : '';
    const canonicalUrl = `https://worldaffairs.se/archive/${work.slug.current}`;
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:url" content={canonicalUrl} />
    {#if ogImageUrl}
        <meta property="og:image" content={ogImageUrl} />
    {/if}
</svelte:head>

<WorkLayout {work} lastUpdated={work._updatedAt} />

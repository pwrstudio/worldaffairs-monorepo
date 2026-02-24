<script lang="ts">
    import type { Work } from '@sanity-types';
    import WorkLayout from '$lib/components/Works/WorkLayout.svelte';

    export let data: {
        work: Work;
    };

    const { work } = data;
</script>

<svelte:head>
    <title>{work.title} | World Affairs AB</title>
</svelte:head>

<WorkLayout {work} />

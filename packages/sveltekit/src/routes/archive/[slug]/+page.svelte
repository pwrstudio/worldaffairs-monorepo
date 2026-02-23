<script lang="ts">
    import type { Work } from '@sanity-types';
    import WorkDetail from '$lib/components/Works/WorkDetail.svelte';

    export let data: {
        work: Work;
    };

    const { work } = data;
</script>

<svelte:head>
    <title>{work.title} | World Affairs AB</title>
</svelte:head>

<WorkDetail {work} />

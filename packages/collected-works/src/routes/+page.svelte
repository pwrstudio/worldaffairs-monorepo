<script lang="ts">
    import Meta from '$lib/components/Meta/Meta.svelte';
    import Poster from '$lib/components/Poster/Poster.svelte';

    let { data } = $props();
</script>

<!-- Titled with the billing alone, which is what SITE_TITLE already is -->
<Meta image={data.share} />

<Poster poster={data.poster} />

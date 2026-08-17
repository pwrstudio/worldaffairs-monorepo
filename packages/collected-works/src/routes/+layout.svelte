<script lang="ts">
    import '$lib/styles/global.css';

    let { children } = $props();
</script>

<div class="page">
    {@render children()}
</div>

<style>
    /*
		A column flexbox holding the poster's single column, which centres itself in both axes
		with `margin: auto`. Auto margins rather than `justify-content: center`, because they
		collapse to nothing once the column is taller than the window instead of overflowing
		equally off both ends and putting the title out of reach above the scroll.
	*/
    .page {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding: var(--page-padding);
        background: var(--color-bg);
    }
</style>

<script lang="ts">
    import { page } from '$app/state';
    import '$lib/styles/global.css';

    let { children } = $props();

    /*
		Which routes take the wider measure. The choice belongs to the page, but only the column
		can apply it and the column lives here — custom properties flow down, so a page cannot
		widen its own container. Naming the routes keeps that decision in one readable place
		rather than scattering `:global()` overrides through the pages.
	*/
    const WIDE_ROUTES = ['/about'];

    let wide = $derived(WIDE_ROUTES.includes(page.route.id ?? ''));
</script>

<div class="page">
    <main class="column" class:wide>
        {@render children()}
    </main>
</div>

<style>
    /*
		A column flexbox holding the one column every page sits in, which centres itself in
		both axes with `margin: auto`. Auto margins rather than `justify-content: center`,
		because they collapse to nothing once the column is taller than the window instead of
		overflowing equally off both ends and putting the top of the page out of reach above
		the scroll.
	*/
    .page {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding: var(--page-padding);
        background: var(--color-bg);
    }

    /*
		The column itself. Pages render straight into it, so their blocks are block-level
		children of one fixed measure and line up on its centre without a width or a
		horizontal margin of their own.
	*/
    .column {
        width: min(100%, var(--column-width));
        padding-block: var(--space-top) var(--space-bottom);
        margin: auto;
        text-align: center;
    }

    /* Redefining the token on the column itself, which is what its own `width` above reads */
    .column.wide {
        --column-width: var(--column-width-wide);
    }
</style>

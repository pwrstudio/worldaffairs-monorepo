<script lang="ts">
    import type { Work } from '@sanity-types';
    import type { ViewMode, MediaItem } from './types';
    import WorkTopBar from './WorkTopBar.svelte';
    import ImageView from './ImageView.svelte';
    import TableView from './TableView.svelte';

    const { work } = $props<{
        work: Work;
    }>();

    function defaultViewToMode(dv: Work['defaultView']): ViewMode {
        if (dv === 'text' || dv === 'grid') {
            return 'table';
        }
        return 'slideshow';
    }

    // svelte-ignore state_referenced_locally
    let viewMode = $state<ViewMode>(defaultViewToMode(work.defaultView));
    let selectedIndex = $state(0);

    // svelte-ignore state_referenced_locally
    const media = (work.media ?? []) as MediaItem[];
    const hasMedia = media.length > 0;

    // svelte-ignore state_referenced_locally
    const yearDisplay = work.yearEnd ? `${work.yearStart}–${work.yearEnd}` : `${work.yearStart}`;

    function setViewMode(mode: ViewMode) {
        viewMode = mode;
    }

    function handleSelectSlide(index: number) {
        selectedIndex = index;
        viewMode = 'slideshow';
    }
</script>

<div class="work-layout">
    <WorkTopBar
        title={work.title ?? ''}
        {yearDisplay}
        {hasMedia}
        {viewMode}
        onSetViewMode={setViewMode}
    />

    <div class="content">
        {#if viewMode === 'slideshow' && hasMedia}
            <ImageView {media} initialIndex={selectedIndex} />
        {:else if viewMode === 'table' && hasMedia}
            <TableView
                title={work.title ?? ''}
                {yearDisplay}
                {media}
                intro={work.intro}
                tags={work.tags}
                credits={work.credits}
                onSelectSlide={handleSelectSlide}
            />
        {:else}
            <div class="no-media">
                <p>No media available.</p>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .work-layout {
        --spacing: 1em;

        height: 100dvh;
        display: flex;
        flex-direction: column;
        background: var(--background);
        font-family: var(--font-stack-serif);
        font-size: var(--font-size-small);
        line-height: 1.5;
        color: var(--foreground);
        overflow: hidden;
        max-width: 1600px;
        margin: 0 auto;
        width: 100%;
    }

    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .no-media {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>

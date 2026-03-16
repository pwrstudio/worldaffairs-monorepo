<script lang="ts">
    import type { Work } from '@sanity-types';
    import type { ViewMode, MediaItem } from './types';
    import WorkTopBar from './WorkTopBar.svelte';
    import WorkBottomBar from './WorkBottomBar.svelte';
    import ImageView from './ImageView.svelte';
    import TableView from './TableView.svelte';

    const { work, lastUpdated } = $props<{
        work: Work;
        lastUpdated?: string;
    }>();

    function defaultViewToMode(dv: Work['defaultView']): ViewMode {
        if (dv === 'information') {
            return 'table';
        }
        return 'slideshow';
    }

    // svelte-ignore state_referenced_locally
    let viewMode = $state<ViewMode>(defaultViewToMode(work.defaultView));
    let selectedIndex = $state(0);
    let currentSlideIndex = $state(0);
    let imageViewRef: ImageView | null = $state(null);

    // svelte-ignore state_referenced_locally
    const media = (work.media ?? []) as MediaItem[];
    const hasMedia = media.length > 0;

    // svelte-ignore state_referenced_locally
    const yearDisplay = work.yearEnd ? `${work.yearStart}–${work.yearEnd}` : `${work.yearStart}`;

    function setViewMode(mode: ViewMode) {
        viewMode = mode;
    }

    function toggleViewMode() {
        viewMode = viewMode === 'slideshow' ? 'table' : 'slideshow';
    }

    function handleSelectSlide(index: number) {
        selectedIndex = index;
        viewMode = 'slideshow';
    }

    function handleSlideChange(index: number) {
        currentSlideIndex = index;
    }

    const currentCaption = $derived(media[currentSlideIndex]?.caption ?? '');
</script>

<div class="work-layout">
    <WorkTopBar
        title={work.title ?? ''}
        {yearDisplay}
        {hasMedia}
        {viewMode}
        onSetViewMode={setViewMode}
        onToggleViewMode={toggleViewMode}
    />

    <div class="content">
        {#if viewMode === 'slideshow' && hasMedia}
            <ImageView
                bind:this={imageViewRef}
                {media}
                initialIndex={selectedIndex}
                onSlideChange={handleSlideChange}
            />
        {:else if viewMode === 'table' && hasMedia}
            <TableView
                title={work.title ?? ''}
                {yearDisplay}
                {media}
                intro={work.intro}

                credits={work.credits}
                onSelectSlide={handleSelectSlide}
                pageLastUpdated={lastUpdated}
            />
        {:else}
            <div class="no-media">
                <p>No media available.</p>
            </div>
        {/if}
    </div>

    {#if viewMode === 'slideshow' && hasMedia}
        <WorkBottomBar
            caption={currentCaption}
            onGoToPrev={() => imageViewRef?.goToPrev()}
            onGoToNext={() => imageViewRef?.goToNext()}
        />
    {/if}
</div>

<style lang="scss">
    .work-layout {
        --spacing: 1em;
        --bar-height: 1.9em;

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
        padding-inline: 20px;
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

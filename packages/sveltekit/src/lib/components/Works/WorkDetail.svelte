<script lang="ts">
    import type { Work } from '@sanity-types';
    import MediaSlideshow, { type MediaItem } from './MediaSlideshow.svelte';
    import ImageSlide from './slides/ImageSlide.svelte';
    import AudioSlide from './slides/AudioSlide.svelte';
    import VideoSlide from './slides/VideoSlide.svelte';

    const { work } = $props<{
        work: Work;
    }>();

    type ViewMode = 'slideshow' | 'text' | 'grid';
    let viewMode = $state<ViewMode>('slideshow');
    let currentIndex = $state(0);

    let slideshowRef: MediaSlideshow | null = $state(null);

    // svelte-ignore state_referenced_locally
    const media = (work.media ?? []) as MediaItem[];
    const hasMedia = media.length > 0;

    // svelte-ignore state_referenced_locally
    const yearDisplay = work.yearEnd ? `${work.yearStart}–${work.yearEnd}` : `${work.yearStart}`;

    function setViewMode(mode: ViewMode) {
        viewMode = mode;
    }

    function handleSlideChange(index: number) {
        currentIndex = index;
    }

    function goToPrev() {
        slideshowRef?.goToPrev();
    }

    function goToNext() {
        slideshowRef?.goToNext();
    }

    function goToSlide(index: number) {
        currentIndex = index;
        if (viewMode !== 'slideshow') {
            viewMode = 'slideshow';
        } else {
            slideshowRef?.goToSlide(index);
        }
    }
</script>

<div class="work-detail">
    <header class="top-bar">
        <div class="top-left">
            <a href="/#works">Back</a>
        </div>
        <div class="title-section">
            <span class="title">{work.title}</span>
            {#if work.yearStart}
                <span class="year">({yearDisplay})</span>
            {/if}
        </div>
        <nav class="view-buttons">
            {#if hasMedia}
                <button
                    class:active={viewMode === 'slideshow'}
                    onclick={() => setViewMode('slideshow')}
                >
                    image
                </button>
            {/if}
            <button class:active={viewMode === 'text'} onclick={() => setViewMode('text')}>
                text
            </button>
            {#if hasMedia}
                <button class:active={viewMode === 'grid'} onclick={() => setViewMode('grid')}>
                    grid
                </button>
            {/if}
        </nav>
    </header>

    <div class="content">
        {#if viewMode === 'slideshow' && hasMedia}
            <div class="slideshow-content">
                <MediaSlideshow
                    bind:this={slideshowRef}
                    {media}
                    onSlideChange={handleSlideChange}
                />
            </div>
        {:else if viewMode === 'text'}
            <div class="text-content">
                {#if work.intro}
                    <div class="intro">{work.intro}</div>
                {/if}
                {#if work.tags && work.tags.length > 0}
                    <div class="tags">{work.tags.join(', ')}</div>
                {/if}
                {#if work.credits}
                    <div class="credits">{work.credits}</div>
                {/if}
            </div>
        {:else if viewMode === 'grid' && hasMedia}
            <div class="grid-wrapper">
                <div class="grid-content">
                    {#each media as item, index (item._key)}
                        <button class="grid-item" onclick={() => goToSlide(index)}>
                            <div class="grid-thumb">
                                {#if item._type === 'imageMedia' && item.image}
                                    <ImageSlide image={item.image} />
                                {:else if item._type === 'audioMedia' && item.file}
                                    <AudioSlide file={item.file} />
                                {:else if item._type === 'videoMedia' && item.file}
                                    <VideoSlide file={item.file} />
                                {:else}
                                    <div class="media-placeholder">
                                        {item._type === 'audioMedia' ? '♪' : '▶'}
                                    </div>
                                {/if}
                            </div>
                            <div class="grid-index">{index + 1}</div>
                        </button>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="no-media">
                <p>No media available.</p>
            </div>
        {/if}
    </div>

    <footer class="bottom-bar">
        {#if hasMedia && viewMode === 'slideshow'}
            <div class="slide-nav">
                <button class="nav-caret" onclick={goToPrev}>&lt;</button>
                <div class="nav-numbers">
                    {#each media as _, index}
                        <button
                            class="nav-number"
                            class:active={currentIndex === index}
                            onclick={() => goToSlide(index)}
                        >
                            {index + 1}
                        </button>
                    {/each}
                </div>
                <button class="nav-caret" onclick={goToNext}>&gt;</button>
            </div>
        {/if}
    </footer>
</div>

<style lang="scss">
    .work-detail {
        --spacing: 1em;

        height: 100vh;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        background: var(--background);
        font-family: var(--font-stack-serif);
        font-size: var(--font-size-small);
        line-height: 1.5;
        color: var(--foreground);
        overflow: hidden;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing);
        flex-shrink: 0;

        .top-left {
            width: 200px;
        }

        .title-section {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.5em;
            font-size: var(--font-size-small);

            .title {
                font-weight: normal;
                font-style: italic;
            }
        }

        .view-buttons {
            display: flex;
            gap: 0.5em;
            width: 200px;
            justify-content: flex-end;

            button {
                font-size: var(--font-size-small);
                padding: 0.5em 1em;
                margin: 0;

                &.active {
                    background-color: var(--foreground);
                    color: var(--background);
                }
            }
        }

        @media (max-width: 800px) {
            flex-wrap: wrap;
            gap: 0.5em;

            .top-left {
                width: auto;
                order: 1;
            }

            .title-section {
                order: 3;
                flex-basis: 100%;
            }

            .view-buttons {
                width: auto;
                order: 2;
            }
        }
    }

    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .slideshow-content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    .text-content {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) * 1.5);
        padding: var(--spacing);
        max-width: 600px;
        width: 100%;
        overflow-y: auto;
        height: 100%;
        align-self: center;

        .intro {
            white-space: pre-wrap;
        }

        .tags {
            font-style: italic;
        }

        .credits {
            white-space: pre-wrap;
        }
    }

    .grid-wrapper {
        flex: 1;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        padding: var(--spacing);
    }

    .grid-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: var(--spacing);
        max-width: 600px;
        width: 100%;
        align-content: start;

        @media (max-width: 800px) {
            grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
        }

        .grid-item {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            text-align: center;

            &:hover .grid-thumb {
                opacity: 0.8;
            }

            .grid-thumb {
                aspect-ratio: 1;
                overflow: hidden;

                :global(figure) {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                }

                :global(img) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                :global(figcaption) {
                    display: none;
                }

                :global(video),
                :global(audio) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .media-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                background: var(--table-row-even-bg);
            }

            .grid-index {
                margin-top: 0.25em;
            }
        }
    }

    .no-media {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .bottom-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing);
        flex-shrink: 0;

        .slide-nav {
            display: flex;
            align-items: center;
            gap: var(--spacing);

            .nav-caret {
                background: none;
                border: none;
                padding: 0.25em 0.5em;
                margin: 0;
                font: inherit;
                cursor: pointer;
                color: var(--foreground);

                &:hover {
                    text-decoration: underline;
                }

                @media (max-width: 800px) {
                    display: none;
                }
            }

            .nav-numbers {
                display: flex;
                gap: calc(var(--spacing) * 0.5);

                .nav-number {
                    background: none;
                    border: none;
                    padding: 0.25em 0.5em;
                    margin: 0;
                    font: inherit;
                    cursor: pointer;
                    color: var(--foreground);

                    &.active {
                        font-weight: bold;
                    }

                    &:hover:not(.active) {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>

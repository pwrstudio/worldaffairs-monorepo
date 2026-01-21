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
        <a href="/#works" class="back-link">Back</a>
        <div class="title-section">
            <span class="title">{work.title}</span>
            {#if work.yearStart}
                <span class="year">({yearDisplay})</span>
            {/if}
        </div>
        <nav class="view-links">
            {#if hasMedia}
                <button
                    class="view-link"
                    class:active={viewMode === 'slideshow'}
                    onclick={() => setViewMode('slideshow')}
                >
                    image
                </button>
            {/if}
            <button
                class="view-link"
                class:active={viewMode === 'text'}
                onclick={() => setViewMode('text')}
            >
                text
            </button>
            {#if hasMedia}
                <button
                    class="view-link"
                    class:active={viewMode === 'grid'}
                    onclick={() => setViewMode('grid')}
                >
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
            <div class="grid-content">
                {#each media as item, index (item._key)}
                    <button class="grid-item" onclick={() => goToSlide(index)}>
                        <div class="grid-thumb">
                            {#if item._type === 'imageMedia' && item.image}
                                <ImageSlide image={item.image} />
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
        {:else}
            <div class="no-media">
                <p>No media available.</p>
            </div>
        {/if}
    </div>

    <footer class="bottom-bar">
        {#if hasMedia && viewMode === 'slideshow'}
            <div class="slide-nav">
                <button class="nav-button" onclick={goToPrev}>Previous</button>
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
                <button class="nav-button" onclick={goToNext}>Next</button>
            </div>
        {/if}
    </footer>
</div>

<style lang="scss">
    .work-detail {
        --color-fg: #000;
        --color-muted: #666;
        --color-border: #ddd;
        --spacing: 1em;

        height: 100vh;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        background: #fff;
        font-family: 'Times New Roman', Times, serif;
        font-size: var(--font-size-small);
        line-height: 1.5;
        color: var(--color-fg);
        overflow: hidden;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing);
        flex-shrink: 0;
        user-select: none;
        padding-top: 0;

        .back-link {
            color: var(--color-fg);
            text-decoration: none;
            min-width: 80px;

            &:hover {
                text-decoration: underline;
            }
        }

        .title-section {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.5em;
            flex: 1;
            text-align: center;

            .title {
                font-weight: normal;
            }

            .year {
                color: var(--color-muted);
            }
        }

        .view-links {
            display: flex;
            gap: var(--spacing);
            min-width: 80px;
            justify-content: flex-end;

            .view-link {
                background: none;
                border: none;
                padding: 0;
                font: inherit;
                color: var(--color-muted);
                cursor: pointer;
                text-underline-offset: 0.25em;

                &:hover {
                    text-decoration: underline;
                }

                &.active {
                    color: var(--color-fg);
                    text-decoration: underline;
                }
            }
        }

        @media (max-width: 800px) {
            flex-wrap: wrap;

            .back-link {
                order: 1;
                min-width: auto;
            }

            .title-section {
                order: 3;
                flex-basis: 100%;
                margin-top: 0.5em;
            }

            .view-links {
                order: 2;
                min-width: auto;
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
        overflow-y: auto;
        height: 100%;
        align-self: center;

        .intro {
            white-space: pre-wrap;
        }

        .tags {
            font-style: italic;
            color: var(--color-muted);
        }

        .credits {
            white-space: pre-wrap;
            color: var(--color-muted);
        }
    }

    .grid-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: calc(var(--spacing) * 0.5) var(--spacing);
        padding: var(--spacing);
        overflow-y: auto;
        height: 100%;
        user-select: none;

        @media (max-width: 800px) {
            grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
        }

        .grid-item {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            text-align: center;

            &:hover .grid-thumb {
                opacity: 0.8;
            }

            .grid-thumb {
                aspect-ratio: 1;
                overflow: hidden;
                background: var(--color-border);

                :global(figure) {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                }

                :global(img) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                :global(figcaption) {
                    display: none;
                }
            }

            .media-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: var(--color-muted);
            }

            .grid-index {
                margin-top: 0.25em;
                font-size: var(--font-size-small);
                color: var(--color-muted);
            }
        }
    }

    .no-media {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--color-muted);
    }

    .bottom-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing);
        flex-shrink: 0;
        user-select: none;
        text-underline-offset: 0.25em;

        .slide-nav {
            display: flex;
            align-items: center;
            gap: var(--spacing);

            .nav-button {
                background: none;
                border: none;
                padding: 0;
                font: inherit;
                cursor: pointer;
                color: var(--color-fg);

                &:hover {
                    text-decoration: underline;
                }

                @media (max-width: 800px) {
                    display: none;
                }
            }

            .nav-numbers {
                display: flex;
                gap: var(--spacing);

                .nav-number {
                    background: none;
                    border: none;
                    padding: 0;
                    font: inherit;
                    cursor: pointer;
                    color: var(--color-fg);

                    &.active {
                        text-decoration: underline;
                    }

                    &:hover:not(.active) {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>

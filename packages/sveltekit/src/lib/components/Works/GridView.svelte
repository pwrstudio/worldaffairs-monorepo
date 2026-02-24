<script lang="ts">
    import type { MediaItem } from './types';
    import ImageSlide from './MediaSlideshow/ImageSlide.svelte';
    import AudioSlide from './MediaSlideshow/AudioSlide.svelte';
    import VideoSlide from './MediaSlideshow/VideoSlide.svelte';

    const { media, onSelectSlide } = $props<{
        media: MediaItem[];
        onSelectSlide: (index: number) => void;
    }>();
</script>

<div class="grid-wrapper">
    <div class="grid-content">
        {#each media as item, index (item._key)}
            <button class="grid-item" onclick={() => onSelectSlide(index)}>
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

<style lang="scss">
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
</style>

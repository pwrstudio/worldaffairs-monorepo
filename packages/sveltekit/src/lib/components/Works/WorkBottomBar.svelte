<script lang="ts">
    import type { ViewMode } from './types';

    const { hasMedia, viewMode, currentIndex, mediaCount, onGoToPrev, onGoToNext, onGoToSlide } =
        $props<{
            hasMedia: boolean;
            viewMode: ViewMode;
            currentIndex: number;
            mediaCount: number;
            onGoToPrev: () => void;
            onGoToNext: () => void;
            onGoToSlide: (index: number) => void;
        }>();
</script>

<footer class="bottom-bar">
    {#if hasMedia && viewMode === 'slideshow'}
        <div class="slide-nav">
            <button class="nav-caret" onclick={onGoToPrev}>&lt;</button>
            <div class="nav-numbers">
                {#each { length: mediaCount } as _, index}
                    <button
                        class="nav-number"
                        class:active={currentIndex === index}
                        onclick={() => onGoToSlide(index)}
                    >
                        {index + 1}
                    </button>
                {/each}
            </div>
            <button class="nav-caret" onclick={onGoToNext}>&gt;</button>
        </div>
    {/if}
</footer>

<style lang="scss">
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

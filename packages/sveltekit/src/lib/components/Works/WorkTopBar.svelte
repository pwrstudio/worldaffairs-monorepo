<script lang="ts">
    import type { ViewMode } from './types';

    const { title, yearDisplay, hasMedia, viewMode, onSetViewMode } = $props<{
        title: string;
        yearDisplay: string;
        hasMedia: boolean;
        viewMode: ViewMode;
        onSetViewMode: (mode: ViewMode) => void;
    }>();
</script>

<header class="top-bar">
    <div class="top-left">
        <a href="/#works">Back</a>
    </div>
    <div class="title-section">
        <span class="title">{title}</span>
        {#if yearDisplay}
            <span class="year">({yearDisplay})</span>
        {/if}
    </div>
    <nav class="view-buttons">
        {#if hasMedia}
            <button
                class:active={viewMode === 'slideshow'}
                onclick={() => onSetViewMode('slideshow')}
            >
                image
            </button>
        {/if}
        <button class:active={viewMode === 'text'} onclick={() => onSetViewMode('text')}>
            text
        </button>
        {#if hasMedia}
            <button class:active={viewMode === 'grid'} onclick={() => onSetViewMode('grid')}>
                grid
            </button>
        {/if}
    </nav>
</header>

<style lang="scss">
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
</style>

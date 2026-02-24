<script lang="ts">
    import type { ViewMode } from './types';

    const { title, yearDisplay, hasMedia, viewMode, onSetViewMode, onToggleViewMode } = $props<{
        title: string;
        yearDisplay: string;
        hasMedia: boolean;
        viewMode: ViewMode;
        onSetViewMode: (mode: ViewMode) => void;
        onToggleViewMode: () => void;
    }>();
</script>

<header class="top-bar" onclick={onToggleViewMode}>
    <div class="back">
        <a href="/#archive">Archive</a>
    </div>
    <div class="title-section">
        <span class="title">{title}</span>
        {#if yearDisplay}
            <span class="year">({yearDisplay})</span>
        {/if}
    </div>
    <div class="view-selection-outer" onclick={(e) => e.stopPropagation()}>
        <fieldset class="view-selection">
            {#if hasMedia}
                <label class:active={viewMode === 'slideshow'}>
                    <input
                        type="radio"
                        name="view"
                        value="slideshow"
                        checked={viewMode === 'slideshow'}
                        onchange={() => onSetViewMode('slideshow')}
                    />
                    Slideshow
                </label>
            {/if}
            {#if hasMedia}
                <label class:active={viewMode === 'table'}>
                    <input
                        type="radio"
                        name="view"
                        value="table"
                        checked={viewMode === 'table'}
                        onchange={() => onSetViewMode('table')}
                    />
                    Information
                </label>
            {/if}
        </fieldset>
    </div>
</header>

<style lang="scss">
    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-inline: 20px;
        margin-top: 10px;
        border: 1px solid var(--archive-border-color);
        flex-shrink: 0;
        font-size: var(--font-size-small);

        .back {
            padding: 0.2em;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 240px;
            border-right: 1px solid var(--archive-border-color);
        }

        .title-section {
            padding: 0.2em;
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.5em;

            .title {
                font-weight: normal;
            }
        }

        .view-selection-outer {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-left: 1px solid var(--archive-border-color);
            padding-inline: 20px;
            width: 240px;
        }

        .view-selection {
            display: flex;
            gap: 10px;
            height: 100%;
            border: none;
            margin: 0;
            padding: 0;
            width: auto;
            padding-inline: 20px;

            input {
                position: relative;
                top: -1px;
            }

            label {
                display: flex;
                align-items: center;
                gap: 0.25em;
                cursor: pointer;
            }
        }

        @media (max-width: 800px) {
            cursor: pointer;

            .back {
                width: auto;
                order: 1;
                display: none;
            }

            .title-section {
                width: 100%;
                user-select: none;
            }

            .view-selection {
                width: auto;
                width: 50%;
            }

            .view-selection-outer {
                display: none;
            }
        }
    }
</style>

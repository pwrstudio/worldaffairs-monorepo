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

<header class="top-bar">
    <div class="back">
        <a href="/#archive">Archive</a>
    </div>
    <div
        class="title-section"
        role="button"
        tabindex="-1"
        onclick={onToggleViewMode}
        onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onToggleViewMode();
        }}
    >
        <span class="title">{title}</span>
        {#if yearDisplay}
            <span class="year">({yearDisplay})</span>
        {/if}
        <span class="mobile-indicator" aria-hidden="true">...</span>
    </div>
    <div class="view-selection-outer">
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
            pointer-events: none;
            position: relative;

            .title {
                font-weight: normal;
            }
        }

        .mobile-indicator {
            display: none;
            position: absolute;
            right: 0.5em;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-foreground);
            pointer-events: none;
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
            &:active {
                background-color: var(--table-row-even-bg);
            }

            .back {
                width: auto;
                order: 1;
                display: none;
            }

            .title-section {
                padding: 0.4em;
                width: 100%;
                user-select: none;
                pointer-events: auto;
                cursor: pointer;
            }

            .view-selection-outer {
                display: none;
            }

            .mobile-indicator {
                display: flex;
            }
        }
    }
</style>

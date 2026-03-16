<script lang="ts">
    import type { ViewMode } from './types';
    import RadioGroup from '$lib/components/RadioGroup.svelte';

    const { title, yearDisplay, hasMedia, viewMode, onSetViewMode, onToggleViewMode } = $props<{
        title: string;
        yearDisplay: string;
        hasMedia: boolean;
        viewMode: ViewMode;
        onSetViewMode: (mode: ViewMode) => void;
        onToggleViewMode: () => void;
    }>();

    // svelte-ignore state_referenced_locally
    const viewOptions = hasMedia
        ? [
              { value: 'slideshow', label: 'Slideshow' },
              { value: 'table', label: 'Information' },
          ]
        : [];
</script>

<header class="top-bar">
    <div class="back">
        <a href="/#archive">&times;</a>
    </div>
    <button
        class="title-section"
        class:clickable={viewMode === 'slideshow'}
        onclick={viewMode === 'slideshow' ? onToggleViewMode : undefined}
        disabled={viewMode !== 'slideshow'}
    >
        <span class="title">{title}</span>
        {#if yearDisplay}
            <span class="year">({yearDisplay})</span>
        {/if}
    </button>
    <button
        class="mobile-toggle"
        class:inactive={viewMode === 'table'}
        onclick={viewMode === 'slideshow' ? onToggleViewMode : undefined}
        aria-label="Toggle view"
        disabled={viewMode === 'table'}
        ><span class:invisible={viewMode === 'table'}>i</span></button
    >
    <div class="view-selection-outer">
        <RadioGroup
            name="view"
            options={viewOptions}
            value={viewMode}
            onchange={(v) => onSetViewMode(v as ViewMode)}
            size={10}
        />
    </div>
</header>

<style lang="scss">
    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        border: 1px solid var(--archive-border-color);
        flex-shrink: 0;
        font-size: var(--font-size-small);
        min-height: var(--bar-height);

        .back {
            padding: 0;
            display: flex;
            align-items: stretch;
            justify-content: center;
            align-self: stretch;
            width: 240px;
            border-right: 1px solid var(--archive-border-color);
            cursor: pointer;

            a {
                color: var(--foreground);
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 0.2em;
            }

            @media (hover: hover) {
                &:hover {
                    background-color: var(--table-row-hover-bg);
                }
            }

            &:active {
                background-color: var(--table-row-even-bg);
            }
        }

        .title-section {
            padding: 0.2em;
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.5em;
            pointer-events: none;
            position: relative;
            border: none;
            background: none;
            font: inherit;
            font-size: inherit;
            color: inherit;
            cursor: default;
            margin: 0;

            .title {
                font-weight: normal;
            }
        }

        .mobile-toggle {
            display: none;
            align-items: center;
            justify-content: center;
            align-self: stretch;
            border: none;
            border-left: 1px solid var(--archive-border-color);
            background: none;
            margin: 0;
            padding: 0.2em 1em;
            font: inherit;
            font-size: var(--font-size-small);
            cursor: pointer;
            color: var(--foreground);

            @media (hover: hover) {
                &:hover {
                    background-color: var(--table-row-hover-bg);
                }
            }

            &:active {
                background-color: var(--table-row-even-bg);
            }

            &.inactive {
                cursor: default;
                &:hover {
                    background-color: transparent;
                }
                &:active {
                    background-color: transparent;
                }
            }

            .invisible {
                visibility: hidden;
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

        @media (max-width: 800px) {
            position: relative;

            .back {
                width: auto;
                position: relative;
                z-index: 1;
                background-color: var(--background);

                a {
                    padding: 0.2em 1em;
                }
            }

            .title-section {
                flex: 1;
                padding: 0.4em;
                align-items: center;
                overflow: hidden;

                &.clickable {
                    pointer-events: auto;
                    cursor: pointer;
                }

                @media (hover: hover) {
                    &.clickable:hover {
                        background-color: var(--table-row-hover-bg);
                    }
                }

                &.clickable:active {
                    background-color: var(--table-row-even-bg);
                }
            }

            .view-selection-outer {
                display: none;
            }

            .mobile-toggle {
                display: flex;
            }
        }
    }
</style>

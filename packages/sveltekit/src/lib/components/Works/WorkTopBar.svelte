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
        margin-inline: 20px;
        margin-top: 10px;
        border: 1px solid var(--archive-border-color);
        flex-shrink: 0;
        font-size: var(--font-size-small);

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
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                padding: 0.4em;
                align-items: center;
                user-select: none;
                pointer-events: auto;
                cursor: pointer;

                &:active {
                    background-color: var(--table-row-even-bg);
                }
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

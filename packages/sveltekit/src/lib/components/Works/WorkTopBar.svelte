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
    <div class="spacer"></div>
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

        .spacer {
            display: none;
        }

        @media (max-width: 800px) {
            &:active {
                background-color: var(--table-row-even-bg);
            }

            .back {
                width: auto;
                padding: 0.2em 1em;
            }

            .title-section {
                padding: 0.4em;
                flex: 1;
                user-select: none;
                pointer-events: auto;
                cursor: pointer;
            }

            .view-selection-outer {
                display: none;
            }

            .spacer {
                display: flex;
                width: auto;
                padding: 0.2em 1em;
            }

            .mobile-indicator {
                display: flex;
            }
        }
    }
</style>

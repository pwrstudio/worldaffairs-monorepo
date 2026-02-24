<script lang="ts">
    const { caption, onGoToPrev, onGoToNext } = $props<{
        caption: string;
        onGoToPrev: () => void;
        onGoToNext: () => void;
    }>();
</script>

<footer class="bottom-bar">
    <button class="side" onclick={onGoToPrev}>&lt;</button>
    <div class="center">{caption}</div>
    <button class="side" onclick={onGoToNext}>&gt;</button>
</footer>

<style lang="scss">
    .bottom-bar {
        display: flex;
        align-items: stretch;
        margin-inline: 20px;
        margin-bottom: 10px;
        border: 1px solid var(--archive-border-color);
        flex-shrink: 0;
        font-size: var(--font-size-small);
        min-height: 0;

        .side {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 240px;
            flex-shrink: 0;
            background: none;
            border: none;
            border-radius: 0;
            margin: 0;
            padding: 0.2em;
            font: inherit;
            font-size: var(--font-size-small);
            cursor: pointer;
            color: var(--foreground);

            &:first-child {
                border-right: 1px solid var(--archive-border-color);
            }

            &:last-child {
                border-left: 1px solid var(--archive-border-color);
            }

            &:hover {
                background-color: var(--table-row-hover-bg);
            }

            @media (max-width: 800px) {
                width: auto;
                padding: 0.2em 1em;
            }
        }

        .center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.2em;
            text-align: center;
        }
    }
</style>

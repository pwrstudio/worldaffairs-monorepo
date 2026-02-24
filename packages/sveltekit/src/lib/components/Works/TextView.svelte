<script lang="ts">
    const { intro, tags, credits } = $props<{
        intro?: string | null;
        tags?: string[] | null;
        credits?: string | null;
    }>();
</script>

<div class="text-content">
    {#if intro}
        <div class="intro">{intro}</div>
    {/if}
    {#if tags && tags.length > 0}
        <div class="tags">{tags.join(', ')}</div>
    {/if}
    {#if credits}
        <div class="credits">{credits}</div>
    {/if}
</div>

<style lang="scss">
    .text-content {
        display: flex;
        flex-direction: column;
        gap: calc(var(--spacing) * 1.5);
        padding: var(--spacing);
        max-width: 600px;
        width: 100%;
        overflow-y: auto;
        height: 100%;
        align-self: center;

        .intro {
            white-space: pre-wrap;
        }

        .tags {
            font-style: italic;
        }

        .credits {
            white-space: pre-wrap;
        }
    }
</style>

<script lang="ts">
    const { file, caption } = $props<{
        file: { asset: { url: string } };
        caption?: string;
    }>();
</script>

<figure class="audio-slide">
    <audio controls>
        <source src={file.asset.url} />
        Your browser does not support the audio element.
    </audio>
    {#if caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>

<style lang="scss">
    .audio-slide {
        width: 100%;
        text-align: center;
        padding: 2em 1em;
        margin: 0;

        audio {
            width: 100%;
            max-width: 500px;
        }

        figcaption {
            margin-top: 10px;
            font-size: var(--font-size-small);
            color: var(--foreground-muted);
            font-family: var(--font-stack-serif);
        }
    }
</style>

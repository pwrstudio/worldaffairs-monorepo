<script lang="ts">
    const { file } = $props<{
        file: { asset: { url: string } };
    }>();
</script>

<figure class="audio-slide">
    <audio controls>
        <source src={file.asset.url} />
        Your browser does not support the audio element.
    </audio>
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
    }
</style>

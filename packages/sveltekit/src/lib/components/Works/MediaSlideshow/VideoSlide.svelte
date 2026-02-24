<script lang="ts">
    const { file } = $props<{
        file: { asset: { url: string } };
    }>();
</script>

<figure class="video-slide">
    <video controls>
        <source src={file.asset.url} />
        Your browser does not support the video element.
    </video>
</figure>

<style lang="scss">
    .video-slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 1em;
        box-sizing: border-box;

        video {
            max-height: calc(100% - 2em);
            max-width: 100%;
            object-fit: contain;
        }
    }
</style>

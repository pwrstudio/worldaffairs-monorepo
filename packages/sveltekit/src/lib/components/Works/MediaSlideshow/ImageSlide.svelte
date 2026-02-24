<script lang="ts">
    import { urlFor } from '$lib/modules/sanity';

    const { image, caption } = $props<{
        image: any;
        caption?: string;
    }>();
</script>

<figure class="image-slide">
    <img src={urlFor(image).width(1200).url()} alt={caption ?? 'Work image'} />
</figure>

<style lang="scss">
    .image-slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding-inline: 1em;
        box-sizing: border-box;

        img {
            max-height: calc(100% - 2em);
            width: auto;
            max-width: 100%;
            object-fit: contain;
        }
    }
</style>

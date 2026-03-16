<script lang="ts">
    import MediaSlideshow from './MediaSlideshow/MediaSlideshow.svelte';
    import type { MediaItem } from './types';

    const {
        media,
        initialIndex = 0,
        onSlideChange: onSlideChangeProp,
    } = $props<{
        media: MediaItem[];
        initialIndex?: number;
        onSlideChange?: (index: number) => void;
    }>();

    let slideshowRef: MediaSlideshow | null = $state(null);

    function handleSlideChange(index: number) {
        onSlideChangeProp?.(index);
    }

    export function goToPrev() {
        slideshowRef?.goToPrev();
    }

    export function goToNext() {
        slideshowRef?.goToNext();
    }

    export function goToSlide(index: number) {
        slideshowRef?.goToSlide(index);
    }
</script>

<div class="slideshow-content">
    <MediaSlideshow
        bind:this={slideshowRef}
        {media}
        {initialIndex}
        onSlideChange={handleSlideChange}
    />
</div>

<style lang="scss">
    .slideshow-content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }
</style>

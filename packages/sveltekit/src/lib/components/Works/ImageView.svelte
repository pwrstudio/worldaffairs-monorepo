<script lang="ts">
    import MediaSlideshow from './MediaSlideshow/MediaSlideshow.svelte';
    import type { MediaItem } from './types';
    import WorkBottomBar from './WorkBottomBar.svelte';

    const { media, initialIndex = 0 } = $props<{
        media: MediaItem[];
        initialIndex?: number;
    }>();

    // svelte-ignore state_referenced_locally
    let currentIndex = $state(initialIndex);
    let slideshowRef: MediaSlideshow | null = $state(null);

    function handleSlideChange(index: number) {
        currentIndex = index;
    }

    function goToPrev() {
        slideshowRef?.goToPrev();
    }

    function goToNext() {
        slideshowRef?.goToNext();
    }

    function goToSlide(index: number) {
        currentIndex = index;
        slideshowRef?.goToSlide(index);
    }
</script>

<div class="slideshow-content">
    <MediaSlideshow bind:this={slideshowRef} {media} onSlideChange={handleSlideChange} />
</div>

<WorkBottomBar
    hasMedia={true}
    viewMode="slideshow"
    {currentIndex}
    mediaCount={media.length}
    onGoToPrev={goToPrev}
    onGoToNext={goToNext}
    onGoToSlide={goToSlide}
/>

<style lang="scss">
    .slideshow-content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }
</style>

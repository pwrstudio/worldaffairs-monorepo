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

    const currentCaption = $derived(media[currentIndex]?.caption ?? '');
</script>

<div class="slideshow-content">
    <MediaSlideshow
        bind:this={slideshowRef}
        {media}
        {initialIndex}
        onSlideChange={handleSlideChange}
    />
</div>

<WorkBottomBar caption={currentCaption} onGoToPrev={goToPrev} onGoToNext={goToNext} />

<style lang="scss">
    .slideshow-content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }
</style>

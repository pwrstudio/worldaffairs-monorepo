<script lang="ts">
    import { onMount } from 'svelte';
    import Swiper from 'swiper';
    import { Keyboard } from 'swiper/modules';
    import type { MediaItem } from '../types';

    import ImageSlide from './ImageSlide.svelte';
    import AudioSlide from './AudioSlide.svelte';
    import VideoSlide from './VideoSlide.svelte';

    const { media, onSlideChange } = $props<{
        media: MediaItem[];
        onSlideChange?: (index: number) => void;
    }>();

    let swiperContainer: HTMLElement;
    let swiperInstance: Swiper | null = null;

    // svelte-ignore state_referenced_locally
    const loopEnabled = media.length > 1;

    onMount(() => {
        swiperInstance = new Swiper(swiperContainer, {
            modules: [Keyboard],
            loop: loopEnabled,
            grabCursor: true,
            keyboard: {
                enabled: true,
            },
            threshold: 5,
            touchRatio: 1.5,
            on: {
                slideChange: () => {
                    if (swiperInstance && onSlideChange) {
                        onSlideChange(
                            loopEnabled ? swiperInstance.realIndex : swiperInstance.activeIndex
                        );
                    }
                },
            },
        });

        return () => {
            swiperInstance?.destroy();
        };
    });

    export function goToPrev() {
        swiperInstance?.slidePrev();
    }

    export function goToNext() {
        swiperInstance?.slideNext();
    }

    export function goToSlide(index: number) {
        if (loopEnabled) {
            swiperInstance?.slideToLoop(index);
        } else {
            swiperInstance?.slideTo(index);
        }
    }
</script>

<div class="swiper" bind:this={swiperContainer}>
    <div class="swiper-wrapper">
        {#each media as item (item._key)}
            <div class="swiper-slide">
                {#if item._type === 'imageMedia' && item.image}
                    <ImageSlide image={item.image} caption={item.caption} />
                {:else if item._type === 'audioMedia' && item.file}
                    <AudioSlide file={item.file} caption={item.caption} />
                {:else if item._type === 'videoMedia' && item.file}
                    <VideoSlide file={item.file} caption={item.caption} />
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>

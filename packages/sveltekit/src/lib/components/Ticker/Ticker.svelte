<script lang="ts">
  import { onMount } from "svelte"
  import { commodities } from "$lib/components/Ticker/commodities.svelte"

  import TickerItem from "$lib/components/Ticker/TickerItem.svelte"

  let marqueeContent: HTMLElement | null = $state(null)
  let animationFrame = $state(0)
  let position = $state(0)
  let speed = $state(1)
  let contentWidth = $state(0)

  function updateMarquee() {
    if (!marqueeContent) return

    position -= speed
    if (position <= -contentWidth) {
      position = 0
    }
    marqueeContent.style.transform = `translateX(${position}px)`
    animationFrame = requestAnimationFrame(updateMarquee)
  }

  onMount(() => {
    // Wait for the next frame to ensure content is rendered
    requestAnimationFrame(() => {
      if (marqueeContent) {
        contentWidth = marqueeContent.offsetWidth / 2
      }
      updateMarquee()
    })

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  })
</script>

<div class="marquee-container">
  <div class="marquee" bind:this={marqueeContent}>
    <!-- First set of items -->
    {#each commodities as commodity}
      <TickerItem {commodity} />
    {/each}
    <!-- Duplicate set for seamless loop -->
    {#each commodities as commodity}
      <TickerItem {commodity} />
    {/each}
  </div>
</div>

<style lang="scss">
  .marquee-container {
    height: 20px;
    background: var(--background);
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }

  .marquee {
    display: inline-flex;
    position: absolute;
    white-space: nowrap;
    will-change: transform;
  }
</style>

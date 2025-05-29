<script lang="ts">
  import { onMount } from "svelte"

  const commodities = [
    { name: "Gold", price: 2345.67, change: 12.34 },
    { name: "Silver", price: 28.45, change: -0.23 },
    { name: "Platinum", price: 987.65, change: 5.67 },
    { name: "Palladium", price: 1234.56, change: -8.9 },
    { name: "Copper", price: 4.56, change: 0.12 },
    { name: "Aluminum", price: 2.34, change: -0.05 },
    { name: "Zinc", price: 3.45, change: 0.07 },
    { name: "Nickel", price: 18.9, change: -0.45 },
    { name: "Lead", price: 2.12, change: 0.03 },
    { name: "Tin", price: 25.67, change: -0.34 },
    { name: "Iron Ore", price: 123.45, change: 2.34 },
    { name: "Steel", price: 789.01, change: -5.67 },
    { name: "Natural Gas", price: 3.45, change: 0.12 },
    { name: "Crude Oil", price: 78.9, change: -1.23 },
    { name: "Brent Oil", price: 82.34, change: 0.45 },
  ]

  let marqueeContent: HTMLElement
  let animationFrame: number
  let position = 0
  let speed = 1
  let contentWidth = 0

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
      <div class="commodity">
        <span class="name">{commodity.name}</span>
        <span class="price">${commodity.price.toFixed(2)}</span>
        <span
          class="change"
          class:positive={commodity.change > 0}
          class:negative={commodity.change < 0}
        >
          {commodity.change > 0 ? "+" : ""}{commodity.change.toFixed(2)}
        </span>
      </div>
    {/each}
    <!-- Duplicate set for seamless loop -->
    {#each commodities as commodity}
      <div class="commodity">
        <span class="name">{commodity.name}</span>
        <span class="price">${commodity.price.toFixed(2)}</span>
        <span
          class="change"
          class:positive={commodity.change > 0}
          class:negative={commodity.change < 0}
        >
          {commodity.change > 0 ? "+" : ""}{commodity.change.toFixed(2)}
        </span>
      </div>
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

  .commodity {
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    font-family: "times new roman", times, serif;
    font-size: var(--font-size-small);
    color: var(--foreground);
    text-transform: uppercase;

    .name {
      font-weight: 500;
      margin-right: 8px;
    }

    .price {
      margin-right: 8px;
    }

    .change {
      font-weight: bold;
      //   &.positive {
      //     color: #4caf50;
      //   }
      //   &.negative {
      //     color: #f44336;
      //   }
    }
  }
</style>

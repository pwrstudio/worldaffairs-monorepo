<script lang="ts">
  import type { Commodity } from "$lib/types"
  const { commodity }: { commodity: Commodity } = $props()
</script>

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

<style lang="scss">
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

<script lang="ts">
  import type { Product } from "@sanity-types"
  export let products: Product[]
</script>

<div class="section shop">
  <h2>Shop</h2>
  {#if products.length === 0}
    <div class="placeholder">Coming soon</div>
  {:else}
    <ul>
      {#each products as product}
        <li>
          {product.title}
        </li>
      {/each}
    </ul>
  {/if}
</div>

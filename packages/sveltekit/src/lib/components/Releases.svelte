<script lang="ts">
  import type { Release } from "@sanity-types"
  export let releases: Release[]

  import ReleaseItem from "$lib/components/ReleaseItem.svelte"
</script>

<div class="section releases">
  {#each releases as release}
    <ReleaseItem {release} />
  {/each}
</div>

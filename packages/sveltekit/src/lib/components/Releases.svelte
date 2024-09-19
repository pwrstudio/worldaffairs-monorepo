<script lang="ts">
  import type { Release } from "@sanity-types"
  export let releases: Release[]
</script>

<div class="section releases">
  {#each releases as release}
    <div class="release-item">
      <a href={release.link} target="__blank">{release.title}</a>
    </div>
  {/each}
</div>

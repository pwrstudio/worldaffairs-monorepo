<script lang="ts">
  import type { Release } from "@sanity-types"
  export let release: Release

  let linkBoxActive = false

  function toggleLinkBox() {
    linkBoxActive = !linkBoxActive
  }
</script>

<div class="release-item">
  <button class="pseudo-link" on:click={toggleLinkBox}>
    {release.title}
  </button>
  {#if linkBoxActive}
    <div class="link-box">
      {#each release.links ?? [] as link}
        <div>
          <a class="link-box-item" href={link.url} target="__blank">
            {link.label}
          </a>
        </div>
      {/each}
      <div>*</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .link-box {
    .link-box-item {
      font-family: var(--font-stack-mono);
      font-size: var(--font-size-small);
    }
  }
</style>

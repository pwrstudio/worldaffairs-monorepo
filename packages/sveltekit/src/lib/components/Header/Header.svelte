<script lang="ts">
  const { hasNewPosts }: { hasNewPosts: boolean } = $props()
</script>

<div class="header">
  <div class="column toc">
    <h1>World Affairs AB</h1>
    <div class="imprint">Momsregistreringsnummer (VAT): SE556886471301</div>
    {#if hasNewPosts}
      <h2 class="toc-link">
        <a href="#new">New</a>
      </h2>
    {/if}
    <h2 class="toc-link">
      <a href="#store">Store</a>
    </h2>
    <h2 class="toc-link">
      <a href="#music">Music</a>
    </h2>
    <h2 class="toc-link">
      <a href="#video">Video</a>
    </h2>
    <h2 class="toc-link">
      <a href="#tour-dates">Tour Dates</a>
    </h2>
    <h2 class="toc-link">
      <a href="#newsletter">Newsletter</a>
    </h2>
    <h2 class="toc-link">
      <a href="#contact">Contact</a>
    </h2>
  </div>
  <div class="column image">
    <img src="/images/wa-logo-alt.png" alt="logo" />
  </div>
</div>

<style lang="scss">
  img {
    width: 340px;
    height: auto;
  }

  .toc-link {
    display: block;
  }

  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .header {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    display: flex;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
    margin-bottom: 0.5em;
    height: 280px;

    .column {
      width: 50%;
      height: 100%;
      padding-left: 10px;

      .imprint {
        font-size: var(--font-size-small);
        margin-bottom: 0.5em;
      }

      &.image {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 768px) {
          display: none;
        }
      }

      &.toc {
        padding-left: 0;
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }

    img {
      max-height: 100%;
      width: auto;
    }
  }
</style>

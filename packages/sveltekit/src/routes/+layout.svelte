<script lang="ts">
  //   ...
</script>

<!-- MAIN CONTENT SLOT -->
<main>
  <slot />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    padding-bottom: 80px;
  }
</style>

<script lang="ts">
  import { getCurrentYear } from "$lib/modules/utils"
</script>

<div class="footer">
  <div class="imprint">© {getCurrentYear()} World Affairs AB</div>
  <div class="updated">Last updated: 2025-05-28 15:45</div>
</div>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);

    .imprint {
      font-size: var(--font-size-small);
    }

    .updated {
      font-size: var(--font-size-small);
      color: var(--foreground);
      float: right;
    }
  }
</style>

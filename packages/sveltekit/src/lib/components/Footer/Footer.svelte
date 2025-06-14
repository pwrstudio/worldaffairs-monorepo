<script lang="ts">
  import { getCurrentYear } from "$lib/modules/utils"
  const { siteLastUpdated }: { siteLastUpdated: string } = $props()
</script>

<div class="footer">
  <div class="imprint">© {getCurrentYear()} World Affairs AB</div>
  <div class="updated">Site last updated: {siteLastUpdated}</div>
</div>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      padding-bottom: 1em;
    }

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

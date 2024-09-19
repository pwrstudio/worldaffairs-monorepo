<script lang="ts">
  import type { TourDate } from "@sanity-types"
  export let tourDates: TourDate[]
</script>

<div class="section tour-dates">
  <h2>Tour Dates</h2>
  {#if tourDates.length === 0}
    <div class="placeholder">Coming soon</div>
  {:else}
    <ul>
      {#each tourDates as tourDate}
        <li>
          {tourDate.date} - {tourDate.venue}
        </li>
      {/each}
    </ul>
  {/if}
</div>

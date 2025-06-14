<script lang="ts">
  import type { TourDate } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { tourDates } = $props<{
    tourDates: TourDate[]
  }>()

  const columns: Column[] = [
    { type: "text", label: "Date", key: "date" },
    { type: "text", label: "Artist", key: "artist" },
    { type: "text", label: "Location", key: "location" },
    { type: "text", label: "Venue", key: "venue" },
    { type: "linkList", label: "Links" },
  ]
</script>

<DataTable
  tableType={TableType.TourDates}
  title="Tour Dates"
  anchor="tour-dates"
  {columns}
  data={tourDates}
/>

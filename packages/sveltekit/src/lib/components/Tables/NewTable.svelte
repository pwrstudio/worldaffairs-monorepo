<script lang="ts">
  import type { Release, Tour, TourDate, Video } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { newPosts } = $props<{
    newPosts: (Release | Tour | TourDate | Video)[]
  }>()

  const columns: Column[] = [
    { type: "icon" },
    { type: "text", label: "Title", key: "title" },
    { type: "text", label: "Artist", key: "artist" },
    { type: "text", label: "Date", key: "date" },
    { type: "linkList", label: "Links" },
  ]
</script>

<DataTable
  tableType={TableType.New}
  title="New"
  anchor="new"
  {columns}
  data={newPosts}
/>

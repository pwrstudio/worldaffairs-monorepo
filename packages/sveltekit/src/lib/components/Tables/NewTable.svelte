<script lang="ts">
  import type { Release, Tour, TourDate, Video } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { newPosts } = $props<{
    newPosts: (Release | Tour | TourDate | Video)[]
  }>()

  const columns: Column[] = [
    { type: "icon", hide: false },
    { type: "text", label: "Title", key: "title", hide: false },
    { type: "text", label: "Artist", key: "artist", hide: false },
    { type: "text", label: "Date", key: "date", hide: true },
    { type: "linkList", label: "Links", hide: false },
  ]
</script>

<DataTable
  tableType={TableType.New}
  title="New"
  anchor="new"
  {columns}
  data={newPosts}
/>

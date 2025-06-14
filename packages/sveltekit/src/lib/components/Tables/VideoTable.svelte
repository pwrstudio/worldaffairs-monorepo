<script lang="ts">
  import type { Video } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { videos } = $props<{
    videos: Video[]
  }>()

  const columns: Column[] = [
    { type: "index", label: "#" },
    { type: "text", label: "Title", key: "title" },
    { type: "text", label: "Artist", key: "artist" },
    { type: "text", label: "Release Date", key: "date" },
    { type: "linkList", label: "Links" },
  ]
</script>

<DataTable
  tableType={TableType.Video}
  title="Videos"
  anchor="videos"
  {columns}
  data={videos}
/>

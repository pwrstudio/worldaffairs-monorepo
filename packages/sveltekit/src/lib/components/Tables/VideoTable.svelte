<script lang="ts">
  import type { Video } from "@sanity-types"
  import { TableType } from "$lib/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { videos } = $props<{
    videos: Video[]
  }>()

  const columns: Column[] = [
    { type: "index", label: "#", hide: true },
    { type: "text", label: "Release Date", key: "date", hide: true },
    { type: "text", label: "Title", key: "title", hide: false },
    { type: "text", label: "Artist", key: "artist", hide: false },
    { type: "linkList", label: "Links", hide: false },
  ]
</script>

<DataTable
  tableType={TableType.Video}
  title="Videos"
  anchor="videos"
  {columns}
  data={videos}
/>

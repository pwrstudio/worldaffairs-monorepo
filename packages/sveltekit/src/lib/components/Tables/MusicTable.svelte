<script lang="ts">
  import type { Release } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { releases } = $props<{
    releases: Release[]
  }>()

  const columns: Column[] = [
    { type: "index", label: "#" },
    { type: "text", label: "Release Date", key: "date" },
    { type: "text", label: "Title", key: "title" },
    { type: "text", label: "Artist", key: "artist" },
    { type: "text", label: "Type", key: "type" },
    { type: "linkList", label: "Links" },
  ]
</script>

<DataTable
  tableType={TableType.Music}
  title="Music"
  anchor="music"
  {columns}
  data={releases}
/>

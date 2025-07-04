<script lang="ts">
  import type { Product } from "@sanity-types"
  import { TableType } from "$lib/enums"
  import type { Column } from "$lib/types"
  import DataTable from "$lib/components/Tables/DataTable.svelte"

  const { products } = $props<{
    products: Product[]
  }>()

  console.log(products)

  const columns: Column[] = [
    { type: "text", label: "Title", key: "title", hide: false },
    { type: "text", label: "Information", key: "information", hide: false },
    { type: "linkList", label: "Links", hide: false },
  ]
</script>

<h3 id="store">Store</h3>
<a
  href="https://store.worldaffairs.se/"
  target="_blank"
  rel="noopener noreferrer"
>
  <button>Yung Lean Official Merchandise</button>
</a>

<DataTable
  tableType={TableType.Products}
  anchor="store"
  {columns}
  data={products}
/>

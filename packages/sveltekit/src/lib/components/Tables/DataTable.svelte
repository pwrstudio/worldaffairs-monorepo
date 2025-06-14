<script lang="ts">
  import { TableType } from "$lib/components/enums"
  import type { Column } from "$lib/types"

  const { tableType, title, anchor, columns, data } = $props<{
    tableType: TableType
    title: string
    anchor: string
    columns: Column[]
    data: Record<string, any>[]
  }>()
</script>

{#if title}
  <h3 id={anchor} class="table-title">
    {title}
  </h3>
{/if}

<table class={tableType}>
  <thead>
    <tr>
      {#each columns as column}
        <th>
          {column.label}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row, i}
      <tr>
        {#each columns as column}
          <td class={column.type}>
            {#if column.type === "icon"}
              <!-- Icon -->
              <img src="/images/fire.gif" alt="new" />
            {:else if column.type === "index"}
              <!-- Index -->
              {i + 1}
            {:else if column.type === "linkList"}
              <!-- Link -->
              {#if row.links && Array.isArray(row.links)}
                {#each row.links as link, linkIndex}
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                  {#if linkIndex < row.links.length - 1}
                    <span class="separator">/</span>
                  {/if}
                {/each}
              {/if}
            {:else if column.key}
              <!-- Normal Value  -->
              {row[column.key]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  .table-title {
    font-size: 1.2em;
    margin: 1em 0 0.5em 0;
    color: #000;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5em 0;
    border: 1px solid #000;
    font-size: var(--font-size-small);
    margin-bottom: 2em;
    background: white;

    th,
    td {
      padding: 0.2em;
      text-align: left;
      border: 1px solid #000;
    }

    td {
      &.icon {
        padding: 0;
        line-height: 0;
        width: 48px;

        img {
          width: 24px;
          height: 24px;
          display: block;
          margin: 0 auto;
        }
      }

      &.index {
        width: 48px;
      }

      &.linkList {
        min-width: 80px;
      }
    }

    th {
      font-weight: bold;
      background-color: #ccc;
      color: #000;
      border: 2px groove #eee;
    }

    tr:nth-child(even) {
      background-color: #f0f0f0;
    }

    tr:hover {
      background-color: #e0e0e0;
    }

    .separator {
      margin: 0 0.25em;
    }
  }
</style>

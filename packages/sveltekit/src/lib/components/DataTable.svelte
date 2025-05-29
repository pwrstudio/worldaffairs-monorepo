<script lang="ts">
  const {
    data,
    className = "",
    title = "",
    isNew = false,
  } = $props<{
    data: Record<string, any>[]
    className?: string
    title?: string
    isNew?: boolean
  }>()

  // Get all unique column headers from all objects
  let headers = $derived<string[]>([
    ...new Set<string>(
      data.flatMap((obj: Record<string, any>) => Object.keys(obj))
    ),
  ])

  function isUrl(str: string): boolean {
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  }
</script>

{#if title}
  <h3 id={title.toLowerCase().replace(" ", "-")} class="table-title">
    {title}
  </h3>
{/if}

<table class={className}>
  <thead>
    <tr>
      <th>#</th>
      {#each headers as header}
        <th>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row, i}
      <tr>
        <td class:new={isNew}>
          {#if isNew}
            <img src="/images/fire.gif" alt="new" />
          {:else}
            {i + 1}
          {/if}
        </td>
        {#each headers as header}
          <td>
            {#if typeof row[header] === "string" && isUrl(row[header])}
              <a href={row[header]} target="_blank" rel="noopener noreferrer"
                >Link</a
              >
            {:else}
              {row[header]}
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
  }

  th,
  td {
    padding: 0.2em;
    text-align: left;
    border: 1px solid #000;

    &.new {
      padding: 0;
      line-height: 0;

      img {
        width: 24px;
        height: 24px;
        display: block;
        margin: 0 auto;
      }
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
</style>

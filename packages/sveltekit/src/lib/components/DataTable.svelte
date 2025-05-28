<script lang="ts">
  export let data: Record<string, any>[]
  export let className: string = ""
  export let title: string = ""

  // Get all unique column headers from all objects
  $: headers = [...new Set(data.flatMap(obj => Object.keys(obj)))]

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
        <td>{data.length - i}</td>
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
  }

  th,
  td {
    padding: 0.2em;
    text-align: left;
    border: 1px solid #000;
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

  a {
    color: #0000ee;
    text-decoration: underline;
    &:visited {
      color: #551a8b;
    }
  }
</style>

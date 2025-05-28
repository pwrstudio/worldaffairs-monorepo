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

  // Convert number to Excel-like column letter (1 = A, 2 = B, etc.)
  function getColumnLetter(index: number): string {
    let result = ""
    while (index >= 0) {
      result = String.fromCharCode(65 + (index % 26)) + result
      index = Math.floor(index / 26) - 1
    }
    return result
  }
</script>

<div class="spreadsheet">
  <div class="header-row">
    <div class="corner-cell"></div>
    <div class="column-headers">
      {#each headers as header, i}
        <div class="column-header">{getColumnLetter(i)}</div>
      {/each}
    </div>
  </div>
  <div class="body-container">
    <div class="row-headers">
      {#each data as _, i}
        <div class="row-header">{i + 1}</div>
      {/each}
    </div>
    <div class="table-container">
      <table class={className}>
        <tbody>
          {#each data as row, i}
            <tr>
              {#each headers as header}
                <td>
                  {#if typeof row[header] === "string" && isUrl(row[header])}
                    <a
                      href={row[header]}
                      target="_blank"
                      rel="noopener noreferrer">Link</a
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
    </div>
  </div>
</div>

<style lang="scss">
  .spreadsheet {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--tab-border);
  }

  .header-row {
    display: flex;
    height: 32px;
    background: var(--tab-bg);
    border-bottom: 1px solid var(--tab-border);
  }

  .corner-cell {
    width: 40px;
    flex-shrink: 0;
    border-right: 1px solid var(--tab-border);
  }

  .column-headers {
    display: flex;
    flex: 1;
    background: var(--tab-bg);
  }

  .column-header {
    flex: 1;
    min-width: 100px;
    padding: 4px;
    text-align: center;
    font-family: var(--font-stack-mono);
    font-size: 12px;
    color: var(--tab-text);
    border-right: 1px solid var(--tab-border);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .body-container {
    display: flex;
    flex: 1;
    overflow: auto;
  }

  .row-headers {
    width: 40px;
    flex-shrink: 0;
    background: var(--tab-bg);
    border-right: 1px solid var(--tab-border);
  }

  .row-header {
    height: 32px;
    padding: 4px;
    text-align: right;
    font-family: var(--font-stack-mono);
    font-size: 12px;
    color: var(--tab-text);
    border-bottom: 1px solid var(--tab-border);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .table-container {
    flex: 1;
    overflow: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-small);
    table-layout: fixed;
  }

  td {
    padding: 4px;
    text-align: left;
    border: 1px solid var(--tab-border);
    min-width: 100px;
    height: 32px;
    box-sizing: border-box;
    line-height: 1;
  }

  tr {
    height: 32px;
  }

  tr:nth-child(even) {
    background-color: var(--tab-hover-bg);
  }

  tr:hover {
    background-color: var(--tab-bg);
  }
</style>

<script lang="ts">
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';

    const { tableType, title, anchor, columns, data } = $props<{
        tableType: TableType;
        title?: string;
        anchor: string;
        columns: Column[];
        data: Record<string, any>[];
    }>();
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
                <th class:hide-on-mobile={column.hide}>
                    {column.label}
                </th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data as row, i}
            <tr>
                {#each columns as column}
                    <td class={column.type} class:hide-on-mobile={column.hide}>
                        {#if column.type === 'icon'}
                            <!-- Icon -->
                            <img src="/images/fire.gif" alt="new" />
                        {:else if column.type === 'index'}
                            <!-- Index -->
                            {data.length - i}
                        {:else if column.type === 'linkList'}
                            <!-- Link -->
                            {#if row.links && Array.isArray(row.links)}
                                {#each row.links as link, linkIndex}
                                    {#if link.url.startsWith('/')}
                                        <a href={link.url}>
                                            {link.label}
                                        </a>
                                    {:else}
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                        </a>
                                    {/if}
                                    {#if linkIndex < row.links.length - 1}
                                        <span class="separator">|</span>
                                    {/if}
                                {/each}
                            {/if}
                        {:else if column.type === 'internalLink' && column.linkPath && column.key}
                            <!-- Internal Link -->
                            <a href="{column.linkPath}{row.slug?.current}">{row[column.key]}</a>
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
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.5em 0;
        border: 1px solid var(--table-border-color);
        font-size: var(--font-size-small);
        margin-bottom: 2em;
        background: white;

        th,
        td {
            padding: 0.2em;
            text-align: left;
            border: 1px solid var(--table-border-color);
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

                @media (max-width: 768px) {
                    padding-right: 10px;
                }

                a {
                    @media (max-width: 768px) {
                        display: block;
                        line-height: 1.8;
                        white-space: nowrap;
                    }
                }
            }
        }

        th {
            font-weight: bold;
            background-color: var(--table-header-bg);
            color: var(--table-border-color);
            border: 2px groove var(--table-header-border);
        }

        tr:nth-child(even) {
            background-color: var(--table-row-even-bg);
        }

        tr:hover {
            background-color: var(--table-row-hover-bg);
        }

        .hide-on-mobile {
            @media (max-width: 768px) {
                display: none;
            }
        }

        .separator {
            margin: 0 0.25em;

            @media (max-width: 768px) {
                display: none;
            }
        }
    }
</style>

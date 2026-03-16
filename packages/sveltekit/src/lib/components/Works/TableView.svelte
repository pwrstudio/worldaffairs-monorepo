<script lang="ts">
    import type { MediaItem } from './types';
    import { urlFor } from '$lib/modules/sanity';

    import Footer from '$lib/components/Footer/Footer.svelte';

    const { title, yearDisplay, media, intro, tags, credits, onSelectSlide, pageLastUpdated } =
        $props<{
            title: string;
            yearDisplay: string;
            media: MediaItem[];
            intro?: string | null;
            tags?: string[] | null;
            credits?: string | null;
            onSelectSlide: (index: number) => void;
            pageLastUpdated?: string | null;
        }>();
</script>

<div class="table-wrapper">
    <h3 class="information-title">{title} ({yearDisplay})</h3>
    {#if intro || (tags && tags.length > 0) || credits}
        <div class="text-content">
            {#if intro}
                <div class="intro">{intro}</div>
            {/if}
            {#if tags && tags.length > 0}
                <div class="tags">{tags.join(', ')}</div>
            {/if}
            {#if credits}
                <div class="credits">{credits}</div>
            {/if}
        </div>
    {/if}
    <table>
        <thead>
            <tr>
                <th class="col-index">#</th>
                <th class="col-thumb">Preview</th>
                <th>Information</th>
            </tr>
        </thead>
        <tbody>
            {#each media as item, index (item._key)}
                <tr onclick={() => onSelectSlide(index)}>
                    <td class="col-index">{index + 1}</td>
                    <td class="col-thumb">
                        {#if item._type === 'imageMedia' && item.image}
                            <img
                                src={urlFor(item.image).width(200).url()}
                                alt={item.caption ?? ''}
                            />
                        {:else if item._type === 'audioMedia'}
                            <span class="media-icon">&#9834;</span>
                        {:else if item._type === 'videoMedia'}
                            {#if item.poster}
                                <img
                                    src={urlFor(item.poster).width(200).url()}
                                    alt={item.caption ?? ''}
                                />
                            {:else}
                                <span class="media-icon">&#9654;</span>
                            {/if}
                        {:else if item._type === 'embedMedia'}
                            {#if item.poster}
                                <img
                                    src={urlFor(item.poster).width(200).url()}
                                    alt={item.caption ?? ''}
                                />
                            {:else}
                                <span class="media-icon">&#9654;</span>
                            {/if}
                        {/if}
                    </td>
                    <td
                        >{item.caption ?? ''}
                        <br />
                        {item.credits ?? ''}
                        <br />
                        {item.year ?? ''}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="footer-container">
        <hr />
        <Footer {pageLastUpdated} />
    </div>
</div>

<style lang="scss">
    .footer-container {
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .table-wrapper {
        flex: 1;
        overflow-y: auto;
        padding: 0;
    }

    .information-title {
        font-size: var(--font-size-large);
        margin: 0.5em 0 0.5em 0;
        color: var(--table-border-color);
    }

    .text-content {
        display: flex;
        flex-direction: column;
        gap: 1em;
        font-size: var(--font-size-small);
        max-width: 90ch;
        margin-bottom: 20px;

        .intro {
            white-space: pre-wrap;
        }

        .tags {
            font-style: italic;
        }

        .credits {
            white-space: pre-wrap;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--table-border-color);
        font-size: var(--font-size-small);
        background: white;

        th,
        td {
            padding: 0.4em;
            text-align: left;
            border: 1px solid var(--table-border-color);
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

        tbody tr {
            cursor: pointer;

            &:hover {
                background-color: var(--table-row-hover-bg);
            }
        }

        .col-index {
            width: 180px;
            text-align: center;

            @media (max-width: 800px) {
                width: 80px;
            }
        }

        .col-thumb {
            width: 60px;

            img {
                display: block;
                width: 140px;
                height: 140px;
                object-fit: cover;
            }
        }

        .media-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 140px;
            height: 140px;
            background: var(--table-row-even-bg);
            font-size: 18px;
        }
    }
</style>

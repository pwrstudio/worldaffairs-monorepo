<script lang="ts">
    import type { MediaItem } from './types';
    import { urlFor } from '$lib/modules/sanity';

    import Footer from '$lib/components/Footer/Footer.svelte';

    const { title, yearDisplay, media, intro, credits, onSelectSlide, pageLastUpdated } = $props<{
        title: string;
        yearDisplay: string;
        media: MediaItem[];
        intro?: string | null;
        credits?: string | null;
        onSelectSlide: (index: number) => void;
        pageLastUpdated?: string | null;
    }>();
</script>

<div class="table-wrapper">
    <h3 class="information-title">{title} ({yearDisplay})</h3>
    {#if intro || credits}
        <div class="text-content">
            {#if intro}
                <div class="intro">{intro}</div>
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
                <th class="col-credits">Credits</th>
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
                        {#if item.year}
                            <span class="year">({item.year})</span>
                        {/if}
                    </td>
                    <td class="col-credits credits">{item.credits ?? ''}</td>
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
        padding: 0;
    }

    .information-title {
        font-size: var(--font-size-large);
        margin: 1em 0 0.5em 0;
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

        .credits {
            margin-top: 0.5em;
            padding-top: 0.5em;
            width: 45ch;
            max-width: 100%;
            border-top: 1px solid var(--archive-border-color);
            white-space: pre-wrap;
            font-style: italic;

            @media (max-width: 800px) {
                width: 100%;
            }
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

            &.credits {
                white-space: pre-wrap;
                font-style: italic;
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

        td {
            cursor: pointer;
        }

        tbody tr {
            cursor: pointer;

            &:hover {
                background-color: var(--table-row-hover-bg);
            }
        }

        .col-index {
            width: 120px;
            text-align: center;

            @media (max-width: 800px) {
                width: 80px;
            }
        }

        .col-credits {
            @media (max-width: 800px) {
                display: none;
            }
        }

        .col-thumb {
            width: 100px;

            @media (max-width: 800px) {
                width: 80px;
            }

            img {
                display: block;
                width: 100px;
                height: 100px;
                object-fit: cover;

                @media (max-width: 800px) {
                    width: 80px;
                    height: 80px;
                }
            }
        }

        .media-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;

            @media (max-width: 800px) {
                width: 80px;
                height: 80px;
            }
            background: var(--table-row-even-bg);
            font-size: 18px;
        }
    }
</style>

<script lang="ts">
    import type { Exhibition } from '@sanity-types';
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';
    import DataTable from '$lib/components/Tables/DataTable.svelte';

    const { exhibitions } = $props<{
        exhibitions: Exhibition[];
    }>();

    // A run of days shows as a range, a one-day show as a single date — as with tour dates
    const transformedExhibitions = $derived(
        exhibitions.map((exhibition: Exhibition) => ({
            ...exhibition,
            dateDisplay: exhibition.dateEnd
                ? `${exhibition.date} – ${exhibition.dateEnd}`
                : exhibition.date,
        }))
    );

    /*
        The dates, the artist and the title are what identify a show, so they are held on one
        line; location is the one column left free to wrap, which is where that width comes
        from, and the first to go on a narrow screen.

        `notes` is deliberately not a column. The field is still on the document and still
        worth filling in — it just has nowhere to sit in a row this wide without crowding the
        three that matter. Add it back here to show it again.
    */
    const columns: Column[] = [
        { type: 'text', label: 'Dates', key: 'dateDisplay', hide: false, nowrap: true },
        { type: 'text', label: 'Artist', key: 'artist', hide: false, nowrap: true },
        { type: 'text', label: 'Title', key: 'title', hide: false, nowrap: true },
        { type: 'text', label: 'Location', key: 'location', hide: true },
        { type: 'linkList', label: 'Links', hide: false },
    ];
</script>

<DataTable
    tableType={TableType.Art}
    title="Art"
    anchor="art"
    {columns}
    data={transformedExhibitions}
/>

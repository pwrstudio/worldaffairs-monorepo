<script lang="ts">
    import type { TourDate } from '@sanity-types';
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';
    import DataTable from '$lib/components/Tables/DataTable.svelte';

    const { tourDates } = $props<{
        tourDates: TourDate[];
    }>();

    const columns: Column[] = [
        { type: 'text', label: 'Date', key: 'date', hide: false },
        { type: 'text', label: 'Artist', key: 'artist', hide: false },
        { type: 'text', label: 'Location', key: 'location', hide: false },
        { type: 'text', label: 'Venue', key: 'venue', hide: true },
        { type: 'linkList', label: 'Links', hide: false },
    ];
</script>

<DataTable
    tableType={TableType.TourDates}
    title="Tour Dates"
    anchor="tour-dates"
    {columns}
    data={tourDates}
/>

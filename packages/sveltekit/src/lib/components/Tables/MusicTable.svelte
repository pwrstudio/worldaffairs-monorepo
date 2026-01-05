<script lang="ts">
    import type { Release } from '@sanity-types';
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';
    import DataTable from '$lib/components/Tables/DataTable.svelte';

    const { releases } = $props<{
        releases: Release[];
    }>();

    const columns: Column[] = [
        { type: 'index', label: '#', hide: true },
        { type: 'text', label: 'Release Date', key: 'date', hide: true },
        { type: 'text', label: 'Title', key: 'title', hide: false },
        { type: 'text', label: 'Artist', key: 'artist', hide: false },
        { type: 'text', label: 'Type', key: 'type', hide: true },
        { type: 'linkList', label: 'Links', hide: false },
    ];
</script>

<DataTable tableType={TableType.Music} title="Music" anchor="music" {columns} data={releases} />

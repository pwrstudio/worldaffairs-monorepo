<script lang="ts">
    import type { Work } from '@sanity-types';
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';
    import DataTable from '$lib/components/Tables/DataTable.svelte';

    const { works } = $props<{
        works: Work[];
    }>();

    const columns: Column[] = [
        { type: 'text', label: 'Title', key: 'title', hide: false },
        { type: 'text', label: 'Year', key: 'yearDisplay', hide: true },
        { type: 'text', label: 'Artist', key: 'artist', hide: false },
        { type: 'linkList', label: 'Links', hide: false },
    ];

    // Transform works to include formatted year and links
    // svelte-ignore state_referenced_locally
    const worksData = works.map((work: Work) => ({
        ...work,
        yearDisplay: work.yearEnd ? `${work.yearStart}–${work.yearEnd}` : `${work.yearStart}`,
        links: [{ label: 'View', url: `/works/${work.slug.current}` }],
    }));
</script>

<DataTable tableType={TableType.Works} title="Works" anchor="works" {columns} data={worksData} />

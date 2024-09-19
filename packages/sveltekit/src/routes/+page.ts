import type { About, Release } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    const about: About = await loadData(queries.about, {});
    const releases: Release[] = await loadData(queries.releases, {});
    return { about, releases };
}) satisfies PageLoad;
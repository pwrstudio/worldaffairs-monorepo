import type { About, Release, Tour,  Video } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    const about: About = await loadData(queries.about, {});
    const releases: Release[] = await loadData(queries.releases, {});
    const videos: Video[] = await loadData(queries.videos, {});
    const tours: Tour[] = await loadData(queries.tours, {});
    return { about, releases, tours, videos };
}) satisfies PageLoad;
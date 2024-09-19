import type { About, Release, TourDate, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    const about: About = await loadData(queries.about, {});
    const releases: Release[] = await loadData(queries.releases, {});
    const tourDates: TourDate[] = await loadData(queries.tourDates, {});
    const products: Product[] = await loadData(queries.products, {});
    return { about, releases, tourDates, products };
}) satisfies PageLoad;
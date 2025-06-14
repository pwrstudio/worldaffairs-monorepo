import type { About, Release, Tour,  Video, NewPosts, TourDate } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    const about: About = await loadData(queries.about, {});
    const releases: Release[] = await loadData(queries.releases, {});
    const videos: Video[] = await loadData(queries.videos, {});
    const tours: Tour[] = await loadData(queries.tours, {});
    const tourDates: TourDate[] = await loadData(queries.tourDates, {});
    const newPostsDocument: NewPosts = await loadData(queries.newPosts, {});
    const lastUpdatedPost = await loadData(queries.lastUpdatedPost, {})

    const newPosts = newPostsDocument.posts
    const siteLastUpdated = lastUpdatedPost._updatedAt

    return { about, releases,  videos, tours, tourDates, newPosts, siteLastUpdated };
}) satisfies PageLoad;
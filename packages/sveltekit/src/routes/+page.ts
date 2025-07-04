import type { About, Release, Video, NewPosts, TourDate, StoreList, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    const about: About = await loadData(queries.about, {});
    const releases: Release[] = await loadData(queries.releases, {});
    const videos: Video[] = await loadData(queries.videos, {});
    const tourDates: TourDate[] = await loadData(queries.tourDates, {});
    const newPostsDocument: NewPosts = await loadData(queries.newPosts, {});
    const storeListDocument: StoreList = await loadData(queries.storeList, {});
    const lastUpdatedPost = await loadData(queries.lastUpdatedPost, {})

    const newPosts = newPostsDocument.posts
    const products = storeListDocument.posts as unknown as Product[]
    const siteLastUpdated = lastUpdatedPost._updatedAt

    return { about, releases,  videos, tourDates, newPosts, products, siteLastUpdated };
}) satisfies PageLoad;
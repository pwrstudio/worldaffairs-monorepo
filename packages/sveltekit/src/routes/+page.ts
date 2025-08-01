import type { About, Release, Video, NewPosts, TourDate, StoreList, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    // Singletons with fallbacks
    const about: About | null = await loadData(queries.about, {});
    const storeListDocument: StoreList | null = await loadData(queries.storeList, {});
    const newPostsDocument: NewPosts | null = await loadData(queries.newPosts, {});

    // Collections (can be empty)
    const releases: Release[] = await loadData(queries.releases, {}) ?? [];
    const videos: Video[] = await loadData(queries.videos, {}) ?? [];
    const tourDates: TourDate[] = await loadData(queries.tourDates, {}) ?? [];

    // Last updated post
    const lastUpdatedPost = await loadData(queries.lastUpdatedPost, {})

    const newPosts = newPostsDocument?.posts ?? []
    const products = storeListDocument?.posts as unknown as Product[] ?? []
    const siteLastUpdated = lastUpdatedPost?._updatedAt ?? new Date().toISOString()

    // Log warnings for missing required documents
    if (!about) {
        console.warn('About document is missing - contact section will be hidden')
    }
    if (!storeListDocument) {
        console.warn('StoreList document is missing - store section will be empty')
    }
    if (!newPostsDocument) {
        console.warn('NewPosts document is missing - new posts section will be hidden')
    }

    return { about, releases,  videos, tourDates, newPosts, products, siteLastUpdated };
}) satisfies PageLoad;
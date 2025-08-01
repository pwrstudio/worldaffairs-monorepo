import type { About, Release, Video, NewPosts, TourDate, StoreList, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    // Fetch all data in parallel for better performance
    const [
        about,
        storeListDocument,
        newPostsDocument,
        releases,
        videos,
        tourDates,
        lastUpdatedPost
    ]: [
        About | null,
        StoreList | null,
        NewPosts | null,
        Release[] | null,
        Video[] | null,
        TourDate[] | null,
        any | null
    ] = await Promise.all([
        loadData(queries.about, {}),
        loadData(queries.storeList, {}),
        loadData(queries.newPosts, {}),
        loadData(queries.releases, {}),
        loadData(queries.videos, {}),
        loadData(queries.tourDates, {}),
        loadData(queries.lastUpdatedPost, {})
    ]);

    // Process the data with fallbacks
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

    return { 
        about, 
        releases: releases ?? [], 
        videos: videos ?? [], 
        tourDates: tourDates ?? [], 
        newPosts, 
        products, 
        siteLastUpdated 
    };
}) satisfies PageLoad;
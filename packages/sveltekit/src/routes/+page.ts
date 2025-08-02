import type { About, Release, Video, NewPosts, TourDate, StoreList, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"

export const load = (async () => {
    // Fetch all data in one optimized query
    const allData = await loadData(queries.allData, {}) as {
        about: About | null
        releases: Release[] | null
        videos: Video[] | null
        tourDates: TourDate[] | null
        newPosts: NewPosts | null
        storeList: StoreList | null
    }

    // Extract data with fallbacks
    const { about, releases, videos, tourDates, newPosts: newPostsDocument, storeList: storeListDocument } = allData
    const newPosts = newPostsDocument?.posts ?? []
    const products = storeListDocument?.posts as unknown as Product[] ?? []
    
    // Find the last updated document from all fetched data
    const allDocuments = [
        about,
        storeListDocument,
        newPostsDocument,
        ...(releases ?? []),
        ...(videos ?? []),
        ...(tourDates ?? []),
        ...(newPosts ?? []),
        ...(products ?? [])
    ].filter(Boolean) as Array<{ _updatedAt?: string }>
    
    const siteLastUpdated = allDocuments.length > 0 
        ? allDocuments.reduce((latest, doc) => {
            if (!doc._updatedAt) return latest
            return doc._updatedAt > latest ? doc._updatedAt : latest
          }, allDocuments[0]?._updatedAt ?? new Date().toISOString())
        : new Date().toISOString()

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
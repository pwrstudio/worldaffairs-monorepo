import type { About, Release, Video, NewPosts, TourDate, StoreList, Product } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from '$lib/modules/sanity';
import { queries } from '$lib/groq';

export const load = (async () => {
    // Fetch all data in one optimized query
    const allData = (await loadData(queries.allData, {})) as {
        about: About | null;
        releases: Release[] | null;
        videos: Video[] | null;
        tourDates: TourDate[] | null;
        newPosts: NewPosts | null;
        storeList: StoreList | null;
    };

    // Extract data with fallbacks
    const {
        about,
        releases,
        videos,
        tourDates,
        newPosts: newPostsDocument,
        storeList: storeListDocument,
    } = allData;
    const newPosts = newPostsDocument?.posts ?? [];
    const products = (storeListDocument?.posts as unknown as Product[]) ?? [];

    // This is a bit of a hack. It would be better to do this in the GROQ query.
    // Filter tour dates to include only those on or after current date anywhere on earth
    // We err on the side of keeping dates visible too long rather than too short
    const filteredTourDates = (tourDates ?? []).filter((tourDate) => {
        if (!tourDate.date) return false;

        // Get current UTC date minus 24 hours to be extra conservative
        // This ensures dates are visible for the entire day they're happening,
        // even if the show is in the latest timezone (UTC+14) and server is in earliest (UTC-12)
        const now = new Date();
        const utcNow = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );
        const conservativeDate = new Date(utcNow.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours
        const currentDateString = conservativeDate.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Use dateEnd if available, otherwise use date
        const relevantDate = tourDate.dateEnd ?? tourDate.date;
        return relevantDate >= currentDateString;
    });

    // Find the last updated document from all fetched data
    const allDocuments = [
        about,
        storeListDocument,
        newPostsDocument,
        ...(releases ?? []),
        ...(videos ?? []),
        ...filteredTourDates,
        ...(newPosts ?? []),
        ...(products ?? []),
    ].filter(Boolean) as Array<{ _updatedAt?: string }>;

    const siteLastUpdated =
        allDocuments.length > 0
            ? allDocuments.reduce((latest, doc) => {
                  if (!doc._updatedAt) return latest;
                  return doc._updatedAt > latest ? doc._updatedAt : latest;
              }, allDocuments[0]?._updatedAt ?? new Date().toISOString())
            : new Date().toISOString();

    // Log warnings for missing required documents
    if (!about) {
        console.warn('About document is missing - contact section will be hidden');
    }
    if (!storeListDocument) {
        console.warn('StoreList document is missing - store section will be empty');
    }
    if (!newPostsDocument) {
        console.warn('NewPosts document is missing - new posts section will be hidden');
    }

    return {
        about,
        releases: releases ?? [],
        videos: videos ?? [],
        tourDates: filteredTourDates,
        newPosts,
        products,
        siteLastUpdated,
    };
}) satisfies PageLoad;

import type { About, Release, Video, NewPosts, TourDate } from '@sanity-types';
import type { PageServerLoad } from './$types';
import { loadData } from '$lib/modules/sanity';
import { loadProducts } from '$lib/modules/shopify';
import { queries } from '$lib/groq';

export const load = (async () => {
    const [allData, products] = await Promise.all([
        loadData(queries.allData, {}) as Promise<{
            about: About | null;
            releases: Release[] | null;
            videos: Video[] | null;
            tourDates: TourDate[] | null;
            newPosts: NewPosts | null;
        } | null>,
        loadProducts(),
    ]);

    const {
        about = null,
        releases = null,
        videos = null,
        tourDates = null,
        newPosts: newPostsDocument = null,
    } = allData ?? {};
    const newPosts = newPostsDocument?.posts ?? [];

    // Filter tour dates to include only those on or after current date anywhere on earth
    // We err on the side of keeping dates visible too long rather than too short
    const filteredTourDates = (tourDates ?? []).filter((tourDate) => {
        if (!tourDate.date) return false;

        const now = new Date();
        const utcNow = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );
        // Subtract 24 hours to keep dates visible across all timezones
        const conservativeDate = new Date(utcNow.getTime() - 24 * 60 * 60 * 1000);
        const currentDateString = conservativeDate.toISOString().split('T')[0];

        const relevantDate = tourDate.dateEnd ?? tourDate.date;
        return relevantDate >= currentDateString;
    });

    // newPosts entries are Sanity references (no _updatedAt); the source documents
    // they point to are already covered by releases/videos/tourDates above.
    const timestamps = [
        about?._updatedAt,
        newPostsDocument?._updatedAt,
        ...(releases ?? []).map((r) => r._updatedAt),
        ...(videos ?? []).map((v) => v._updatedAt),
        ...filteredTourDates.map((t) => t._updatedAt),
        ...products.map((p) => p.updatedAt),
    ].filter((t): t is string => Boolean(t));

    const siteLastUpdated =
        timestamps.length > 0
            ? timestamps.reduce((latest, ts) => (ts > latest ? ts : latest))
            : new Date().toISOString();

    if (!about) {
        console.warn('About document is missing - contact section will be hidden');
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
}) satisfies PageServerLoad;

import type { Work } from '@sanity-types';
import type { PageLoad } from './$types';
import { loadData } from '$lib/modules/sanity';
import { queries } from '$lib/groq';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const { slug } = params;

    // Load the work by slug
    const work = (await loadData(queries.workBySlug, { slug })) as Work | null;

    if (!work) {
        throw error(404, 'Work not found');
    }

    return {
        work,
    };
}) satisfies PageLoad;

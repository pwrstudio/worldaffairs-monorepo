import { error } from '@sveltejs/kit';
import { loadData } from '$lib/modules/sanity';
import { exhibitionTextQuery } from '$lib/groq';
import type { ExhibitionText, ExhibitionTextResult } from '$lib/content';

// Fetched per request and kept server-side, for the same reasons as the poster — see ../+page.server.ts

export async function load(): Promise<{ text: ExhibitionText }> {
    const result = await loadData<ExhibitionTextResult | null>(exhibitionTextQuery);

    if (!result) {
        error(500, 'No exhibitionText document found in Sanity. Create it in the studio first.');
    }

    const { title, author, body } = result;

    if (!title || !body?.length) {
        error(500, 'The exhibitionText document is missing its title or body.');
    }

    // The studio's string fields keep whatever whitespace was typed into them
    return { text: { title: title.trim(), author: author?.trim(), body } };
}

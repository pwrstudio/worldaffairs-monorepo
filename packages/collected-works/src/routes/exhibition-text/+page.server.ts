import { error } from '@sveltejs/kit';
import { loadData } from '$lib/modules/sanity';
import { exhibitionTextQuery } from '$lib/groq';
import type { Billing, ExhibitionText, ExhibitionTextResult } from '$lib/content';

// Fetched per request and kept server-side, for the same reasons as the poster — see ../+page.server.ts

export async function load(): Promise<{ text: ExhibitionText; billing: Billing }> {
    const result = await loadData<ExhibitionTextResult | null>(exhibitionTextQuery);

    if (!result?.text) {
        error(500, 'No exhibitionText document found in Sanity. Create it in the studio first.');
    }

    const { title, author, body } = result.text;

    if (!title || !body?.length) {
        error(500, 'The exhibitionText document is missing its title or body.');
    }

    const { artist, title: workTitle, yearStart, yearEnd } = result.billing ?? {};

    if (!artist || !workTitle || yearStart === undefined) {
        error(500, 'The posterInfo document is missing the billing this page is headed with.');
    }

    // The studio's string fields keep whatever whitespace was typed into them
    return {
        text: { title: title.trim(), author: author?.trim(), body },
        billing: { artist, title: workTitle, yearStart, yearEnd },
    };
}

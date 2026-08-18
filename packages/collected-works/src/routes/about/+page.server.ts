import { error } from '@sveltejs/kit';
import { loadData } from '$lib/modules/sanity';
import { buildShareImage } from '$lib/modules/share';
import { aboutQuery } from '$lib/groq';
import type { About, AboutResult, Billing, ShareImage } from '$lib/content';

// Fetched per request and kept server-side, for the same reasons as the poster — see ../+page.server.ts

export async function load(): Promise<{ about: About; billing: Billing; share: ShareImage }> {
    const result = await loadData<AboutResult | null>(aboutQuery);

    if (!result?.about) {
        error(500, 'No About document found in Sanity. Create it in the studio first.');
    }

    const { title, author, body } = result.about;

    if (!title || !body?.length) {
        error(500, 'The About document is missing its title or body.');
    }

    const { artist, title: workTitle, yearStart, yearEnd, artwork } = result.posterInfo ?? {};

    if (!artist || !workTitle || yearStart === undefined) {
        error(500, 'The posterInfo document is missing the billing this page is headed with.');
    }

    // The studio's string fields keep whatever whitespace was typed into them
    return {
        about: { title: title.trim(), author: author?.trim(), body },
        billing: { artist, title: workTitle, yearStart, yearEnd },
        // The same card the poster carries — see $lib/modules/share
        share: buildShareImage(artwork),
    };
}

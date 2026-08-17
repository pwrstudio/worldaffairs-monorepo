import type { PosterInfo } from '$lib/content';

/** `2016–2026`, or a single year when there is no distinct end year. */
export function formatYears(poster: Pick<PosterInfo, 'yearStart' | 'yearEnd'>): string {
    const { yearStart, yearEnd } = poster;
    if (!yearEnd || yearEnd === yearStart) return `${yearStart}`;
    // Closed range, set tight as on the poster
    return `${yearStart}–${yearEnd}`;
}

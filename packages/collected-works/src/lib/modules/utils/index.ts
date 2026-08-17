import type { Billing } from '$lib/content';

/** `2016–2026`, or a single year when there is no distinct end year. */
export function formatYears(billing: Pick<Billing, 'yearStart' | 'yearEnd'>): string {
    const { yearStart, yearEnd } = billing;
    if (!yearEnd || yearEnd === yearStart) return `${yearStart}`;
    // Closed range, set tight as on the poster
    return `${yearStart}–${yearEnd}`;
}

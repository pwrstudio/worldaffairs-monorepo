import type { Exhibition } from '$lib/content';

const dayFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' });

/** `2016–2026`, or a single year when there is no distinct end year. */
export function formatYears(exhibition: Pick<Exhibition, 'yearStart' | 'yearEnd'>): string {
    const { yearStart, yearEnd } = exhibition;
    if (!yearEnd || yearEnd === yearStart) return `${yearStart}`;
    // Closed range, set tight as on the poster
    return `${yearStart}–${yearEnd}`;
}

/**
 * `25 September – 11 October 2026`. Dates that fall in different years carry
 * their own year: `25 September 2025 – 11 October 2026`.
 */
export function formatDateRange(startDate: string, endDate: string): string {
    // Date-only strings parse as UTC midnight, so read them back in UTC
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startYear = start.getUTCFullYear();
    const endYear = end.getUTCFullYear();

    const startText = `${dayFormat.format(start)} ${monthFormat.format(start)}`;
    const endText = `${dayFormat.format(end)} ${monthFormat.format(end)} ${endYear}`;

    // The poster spaces this range, unlike the closed one in the billing
    if (startYear === endYear) return `${startText} – ${endText}`;
    return `${startText} ${startYear} – ${endText}`;
}

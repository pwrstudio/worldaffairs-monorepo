import { MdPalette } from 'react-icons/md';

/*
    An exhibition, listed in the Art section of the front page.

    Dates are a real start and optional end, entered and shown the same way as a tour date —
    `2026-11-28 – 2026-11-29` — which is what lets the section be ordered by date. `location`
    and `notes` stay plain strings: the table prints them as typed and computes nothing from
    them, so structure would only cost the editor a phrasing they could not write themselves.
*/
export default {
    title: 'Exhibition',
    name: 'exhibition',
    type: 'document',
    icon: MdPalette,
    orderings: [
        {
            title: 'Date (newest first)',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }],
        },
        {
            title: 'Date (oldest first)',
            name: 'dateAsc',
            by: [{ field: 'date', direction: 'asc' }],
        },
    ],
    fields: [
        {
            title: 'Artist',
            name: 'artist',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'eg. Collected Works 2016–2026',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Date',
            name: 'date',
            type: 'date',
            description: 'Opening day',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'End Date',
            description: 'Closing day. Leave empty for a one-day show.',
            name: 'dateEnd',
            type: 'date',
        },
        {
            title: 'Location',
            name: 'location',
            type: 'string',
            description: 'eg. Norra Bangården, Torsgatan 22, Stockholm',
        },
        {
            title: 'Notes',
            name: 'notes',
            type: 'string',
            description: 'eg. Open daily 12–19 except Mondays / Free admission',
        },
        {
            title: 'Links',
            name: 'links',
            type: 'array',
            of: [
                {
                    title: 'Link',
                    name: 'link',
                    type: 'object',
                    fields: [
                        {
                            title: 'Label',
                            name: 'label',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'URL',
                            name: 'url',
                            type: 'url',
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            artist: 'artist',
            date: 'date',
            dateEnd: 'dateEnd',
        },
        prepare(value: Record<string, any>) {
            const { title, artist, date, dateEnd } = value;
            const dateDisplay = dateEnd ? `${date} – ${dateEnd}` : date;
            return {
                title,
                subtitle: [artist, dateDisplay].filter(Boolean).join(' – '),
            };
        },
    },
};

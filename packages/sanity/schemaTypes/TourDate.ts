import { MdEvent } from 'react-icons/md';

export default {
    title: 'Tour date',
    name: 'tourDate',
    type: 'document',
    icon: MdEvent,
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
            title: 'Date',
            name: 'date',
            type: 'date',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'End Date',
            description: 'Optional end date for multi-day events (e.g. festivals)',
            name: 'dateEnd',
            type: 'date',
        },
        {
            title: 'Location',
            description: 'eg. Detroit, MI or Berlin, DE',
            name: 'location',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Venue',
            name: 'venue',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
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
            title: 'artist',
            date: 'date',
            dateEnd: 'dateEnd',
            location: 'location',
        },
        prepare(value: Record<string, any>) {
            const { title, date, dateEnd, location } = value;
            const dateDisplay = dateEnd ? `${date} – ${dateEnd}` : date;
            return {
                title,
                subtitle: `${dateDisplay} – ${location}`,
            };
        },
    },
};

import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'exhibition',
    title: 'Exhibition',
    type: 'document',
    groups: [
        { name: 'billing', title: 'Billing', default: true },
        { name: 'artwork', title: 'Artwork' },
        { name: 'visiting', title: 'Visiting' },
    ],
    fields: [
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'string',
            group: 'billing',
            description: 'Set above the exhibition title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'billing',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'yearStart',
            title: 'Year Start',
            type: 'number',
            group: 'billing',
            description: 'First year of the collected work',
            validation: (Rule) => Rule.required().integer().min(1900).max(2100),
        }),
        defineField({
            name: 'yearEnd',
            title: 'Year End',
            type: 'number',
            group: 'billing',
            description: 'Leave empty if the same as the start year',
            validation: (Rule) => Rule.integer().min(1900).max(2100),
        }),
        defineField({
            name: 'artwork',
            title: 'Artwork',
            type: 'image',
            group: 'artwork',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description: 'Described for screen readers',
                }),
                defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            group: 'visiting',
            options: { dateFormat: 'D MMMM YYYY' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            group: 'visiting',
            options: { dateFormat: 'D MMMM YYYY' },
            validation: (Rule) =>
                Rule.required().custom((endDate, context) => {
                    const startDate = (context.document as { startDate?: string } | undefined)
                        ?.startDate;
                    if (!endDate || !startDate) return true;
                    return endDate >= startDate
                        ? true
                        : 'End date must fall on or after the start date';
                }),
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'string',
            group: 'visiting',
            description: 'Street address and city, as it should read on the page',
        }),
        defineField({
            name: 'openingHours',
            title: 'Opening Hours',
            type: 'string',
            group: 'visiting',
            description: 'For example: Open daily 10–19 except Mondays',
        }),
        defineField({
            name: 'admission',
            title: 'Admission',
            type: 'string',
            group: 'visiting',
            description: 'For example: Free admission',
        }),
    ],
    preview: {
        select: {
            artist: 'artist',
            title: 'title',
            media: 'artwork',
        },
        prepare({ artist, title, media }) {
            return {
                title: title || 'Exhibition',
                subtitle: artist,
                media,
            };
        },
    },
});

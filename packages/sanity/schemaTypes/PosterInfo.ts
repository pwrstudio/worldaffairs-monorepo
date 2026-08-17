import { defineType, defineField, defineArrayMember } from 'sanity';

/*
    Drives the poster on works.worldaffairs.se — the billing, the artwork and the visiting
    details, in the order they read down the sheet. Paired with the About text, which
    holds the essay behind the poster's one link.

    The visiting details are one rich text field rather than separate dated fields: the poster
    sets them as a few short lines and never computes anything from them, so structure bought
    nothing and cost the editor a date range they could not phrase themselves.
*/
export default defineType({
    name: 'posterInfo',
    title: 'Poster info',
    type: 'document',
    groups: [
        { name: 'billing', title: 'Title', default: true },
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
            name: 'visiting',
            title: 'Visiting',
            type: 'array',
            group: 'visiting',
            description:
                'Dates, venue, opening hours and admission. One paragraph per line on the ' +
                'poster, so the paragraph breaks are the layout.',
            validation: (Rule) => Rule.required().min(1),
            of: [
                defineArrayMember({
                    type: 'block',
                    // A few short centred lines: a paragraph is the only style that fits, and
                    // there is no room in the column for headings or lists.
                    styles: [{ title: 'Paragraph', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [
                            { title: 'Italic', value: 'em' },
                            { title: 'Bold', value: 'strong' },
                        ],
                        annotations: [
                            defineArrayMember({
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule) => Rule.required(),
                                    }),
                                ],
                            }),
                        ],
                    },
                }),
            ],
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
                title: title || 'Poster info',
                subtitle: artist,
                media,
            };
        },
    },
});

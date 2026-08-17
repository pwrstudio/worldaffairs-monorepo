import { defineType, defineField, defineArrayMember } from 'sanity';

/*
    The essay behind the poster's one link, at works.worldaffairs.se/exhibition-text.
    Paired with `posterInfo`, which holds the sheet itself.
*/
export default defineType({
    name: 'exhibitionText',
    title: 'Exhibition text',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading at the top of the page',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            description: 'Credited under the text. Leave empty to print it unsigned.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            validation: (Rule) => Rule.required().min(1),
            of: [
                defineArrayMember({
                    type: 'block',
                    // The page sets one measure of running text; anything richer than a
                    // paragraph, a quote and an emphasis has nowhere to go in that column.
                    styles: [
                        { title: 'Paragraph', value: 'normal' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
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
            title: 'title',
            author: 'author',
        },
        prepare({ title, author }) {
            return {
                title: title || 'Exhibition text',
                subtitle: author,
            };
        },
    },
});

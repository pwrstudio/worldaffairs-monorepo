export default {
    title: 'About',
    name: 'about',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
            readOnly: true,
        },
        {
            title: 'Contact: email',
            name: 'contactEmail',
            type: 'string',
        },
        {
            title: 'Contact: links',
            name: 'contactLinks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { type: 'string', name: 'label' },
                        { type: 'string', name: 'url' },
                    ],
                },
            ],
        },
    ],
};

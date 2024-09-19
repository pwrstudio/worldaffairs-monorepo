export default {
    title: 'Release',
    name: 'release',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Link',
            name: 'link',
            type: 'url',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Release Date',
            name: 'releaseDate',
            type: 'date',
        }
    ],
}

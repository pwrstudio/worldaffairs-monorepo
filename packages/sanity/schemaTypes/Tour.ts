import { MdTour } from "react-icons/md"

export default {
    title: 'Tour',
    name: 'tour',
    type: 'document',
    icon: MdTour,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Artist',
            name: 'artist',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Region',
            name: 'region',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Tour period',
            name: 'date',
            type: 'string',
        },
        {
            title: 'Links',
            name: 'links',
            type: 'array',
            of: [{
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                    {
                        title: 'Label',
                        name: 'label',
                        type: 'string',
                        validation: (Rule: any) => Rule.required()
                    },
                    {
                        title: 'URL',
                        name: 'url',
                        type: 'url',
                        validation: (Rule: any) => Rule.required()
                    }
                ]
            }]    
        }
    ],
    preview: {
        select: {
            title: 'title',
            artist: 'artist'
        },
        prepare(value: Record<string, any>) {
            const { title, artist } = value;
            return {
                title,
                subtitle: artist
            }
        }
    },
}

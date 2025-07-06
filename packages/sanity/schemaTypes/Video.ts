import { MdVideocam } from "react-icons/md"

export default {
    title: 'Video',
    name: 'video',
    type: 'document',
    icon: MdVideocam,
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
            title: 'Release date',
            name: 'date',
            type: 'date',
            validation: (Rule: any) => Rule.required()
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
        prepare({ title, artist }: { title: string, artist: string }) {
            return {
                title,
                subtitle: artist
            }
        }
    },
}

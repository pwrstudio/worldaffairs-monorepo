import { MdMusicNote } from "react-icons/md"

export default {
    title: 'Release',
    name: 'release',
    type: 'document',
    readOnly: true,
    icon: MdMusicNote,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Type',
            name: 'type',
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
        prepare(value: Record<string, any>) {
            const { title, artist } = value;
            return {
                title,
                subtitle: artist
            }
        }
    },
}

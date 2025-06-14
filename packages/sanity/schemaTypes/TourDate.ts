import { MdEvent } from "react-icons/md"

export default {
    title: 'Tour date',
    name: 'tourDate',
    type: 'document',
    icon: MdEvent,
    preview: {
        select: {
            title: 'artist',
            date: 'date',
            location: 'location'
        },
        prepare({ title, date, location }: { title: string, date: string, location: string }) {
            return {
                title,
                subtitle: `${date} – ${location}`
            }
        }
    },
    fields: [
        {
            title: 'Artist',
            name: 'artist',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Date',
            name: 'date',
            type: 'date',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Location',
            description: "eg. Detroit, MI or Berlin, DE",
            name: 'location',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Venue',
            name: 'venue',
            type: 'string',
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
        },
    ],
}

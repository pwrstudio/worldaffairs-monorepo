import { MdCalendarToday } from "react-icons/md"

export default {
    title: 'Tour Date',
    name: 'tourDate',
    type: 'document',
    icon: MdCalendarToday,
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
            title: 'Venue',
            name: 'venue',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'City',
            name: 'city',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Country',
            name: 'country',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Link',
            name: 'link',
            type: 'url',
        },

    ],
    preview: {
        select: {
            artist: 'artist',
            date: 'date',
            venue: 'venue',
        },
        prepare({ artist, date, venue }) {
            return {
                title: `${artist} – ${venue}`,
                subtitle: date
            }
        }

    }
}

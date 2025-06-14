import { MdEvent } from "react-icons/md"

export default {
    title: 'Tour date',
    name: 'tourDate',
    type: 'document',
    icon: MdEvent,
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
            title: "Ticket link",
            name: "ticketLink",
            type: "url",
            validation: (Rule: any) => Rule.required()
        }
    ],
}

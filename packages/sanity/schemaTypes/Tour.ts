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
            title: 'Tour Date',
            name: 'tourDate',
            type: 'string',
        },
        {
            title: "Link",
            name: "link",
            type: "url",
            validation: (Rule: any) => Rule.required()
        }
    ],
}

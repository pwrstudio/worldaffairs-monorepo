import { MdMusicNote } from "react-icons/md"

export default {
    title: 'Release',
    name: 'release',
    type: 'document',
    icon: MdMusicNote,
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

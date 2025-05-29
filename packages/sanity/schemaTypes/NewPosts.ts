import { MdTour } from "react-icons/md"

export default {
    title: 'New posts',
    name: 'newPosts',
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
            title: 'Posts',
            name: 'posts',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tour' }, { type: 'release' }, { type: 'video' }] }],
        },
    ],
}

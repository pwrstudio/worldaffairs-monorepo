import { MdTour } from 'react-icons/md';

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
            readOnly: true,
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Posts',
            description:
                'Select and order the posts that will be displayed in the new posts section',
            name: 'posts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'tour' },
                        { type: 'tourDate' },
                        { type: 'release' },
                        { type: 'video' },
                    ],
                },
            ],
        },
    ],
};

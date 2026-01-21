import { MdWork } from 'react-icons/md';

export default {
    title: 'Works list',
    name: 'worksList',
    type: 'document',
    icon: MdWork,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            readOnly: true,
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Works',
            description: 'Select and order the works that will be displayed in the works section',
            name: 'works',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'work' }] }],
        },
    ],
};

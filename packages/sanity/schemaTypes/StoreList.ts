import { MdShop } from "react-icons/md"

export default {
    title: 'Store list',
    name: 'storeList',
    type: 'document',
    icon: MdShop,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            readOnly: true,
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Posts',
            description: 'Select and order the posts that will be displayed in the store section',
            name: 'posts',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
        },
    ],
}

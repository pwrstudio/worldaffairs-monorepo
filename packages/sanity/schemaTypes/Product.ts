import { MdShop } from "react-icons/md"

export default {
    title: 'Product',
    name: 'product',
    type: 'document',
    icon: MdShop,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        }
    ]
}

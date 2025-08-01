import { MdShoppingBag } from "react-icons/md"

export default {
    title: 'Product',
    name: 'product',
    type: 'document',
    icon: MdShoppingBag,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: 'Information',
            name: 'information',
            type: 'string',
        },
        {
            title: 'Release date',
            name: 'date',
            type: 'date',
        },
        {
            title: 'Price',
            name: 'price',
            type: 'string',
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            information: 'information'
        },
        prepare(value: Record<string, any>) {
            const { title, information } = value;
            return {
                title,
                subtitle: information
            }
        }
    },
}

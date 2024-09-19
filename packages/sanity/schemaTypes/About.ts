export default {
    title: 'About',
    name: 'about',
    type: 'document',
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
            readOnly: true
        },
        {
            title: 'CEO label',
            name: 'ceoLabel',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            title: "CEO name",
            name: "ceoName",
            type: "string",
            validation: (Rule: any) => Rule.required()
        },
        {
            title: "Contact label",
            name: "contactLabel",
            type: "string",
            validation: (Rule: any) => Rule.required()
        },
        {
            title: "Contact email",
            name: "contactEmail",
            type: "string",
            validation: (Rule: any) => Rule.required()
        },
        {
            title: "Contact instagram handle",
            name: "contactInstagram",
            type: "string",
            validation: (Rule: any) => Rule.required()
        }
    ],
}

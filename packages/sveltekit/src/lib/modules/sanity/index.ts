import { createClient } from "@sanity/client"
import blocksToHtml from '@sanity/block-content-to-html'
import imageUrlBuilder from '@sanity/image-url'
import { SANITY_ID } from "$lib/constants";

export const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: '2024-08-14',
})

const h = blocksToHtml.h

export const renderBlockText = (blocks: any) =>
    blocksToHtml({
        blocks: blocks,
        serializers: serializers,
        projectId: SANITY_ID,
        dataset: 'production',
    })

export const toPlainText = (blocks: any) => {
    return (
        blocks
            .map(block => {
                if (block._type !== 'block' || !block.children) {
                    return ''
                }
                return block.children.map(child => child.text).join('')
            })
            .join('\n\n')
    )
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

const serializers = {
    marks: {
        link: props =>
            h(
                'a',
                { target: '_blank', rel: 'noreferrer', href: props.mark.href },
                props.children
            )
    },
    types: {
        block: props => {
            const style = props.node.style || 'normal'
            return style === 'blockquote'
                ? h('blockquote', {}, props.children)
                : h('p', { className: style }, props.children)

        },
    }
}

export const loadData = async (query: string, params: any) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error("404"));
        }
        return res
    } catch (err) {
        return Promise.reject(new Error("404"));
    }
}

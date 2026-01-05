import { createClient } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';
import { createImageUrlBuilder } from '@sanity/image-url';
import { SANITY_ID } from '$lib/constants';
import type { PortableTextBlock } from '@portabletext/types';

export const client = createClient({
    projectId: SANITY_ID,
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2025-06-01',
});

export const renderBlockText = (blocks: PortableTextBlock[]) => {
    return toHTML(blocks, {
        components: {
            marks: {
                link: ({ children, value }) => {
                    return `<a href="${value.href}" target="_blank" rel="noreferrer">${children}</a>`;
                },
            },
            block: {
                normal: ({ children }) => `<p>${children}</p>`,
                blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
            },
        },
    });
};

export const toPlainText = (blocks: PortableTextBlock[]) => {
    return blocks
        .map((block) => {
            if (block._type !== 'block' || !block.children) {
                return '';
            }
            return block.children.map((child) => child.text).join('');
        })
        .join('\n\n');
};

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

export const loadData = async (query: string, params: any) => {
    try {
        const res = await client.fetch(query, params);
        return res || null; // Return null if no data found, don't throw
    } catch (err) {
        console.warn(`Failed to load data for query: ${query}`, err);
        return null; // Return null instead of throwing
    }
};

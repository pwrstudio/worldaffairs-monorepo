import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import { SANITY_ID, SANITY_DATASET } from '$lib/constants';

export const client = createClient({
    projectId: SANITY_ID,
    dataset: SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export async function loadData<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
    return client.fetch<T>(query, params);
}

/**
 * Portable Text to HTML for both rich text fields: `exhibitionText.body` and the poster's
 * `posterInfo.visiting`. Between them the studio can produce paragraphs, block quotes, italic
 * and bold, and links — `visiting` allows only the subset it needs. Anything neither schema
 * can produce is left to the library's defaults rather than spelled out here.
 *
 * The output is trusted because it comes from our own studio, which is what lets the page put
 * it through `{@html}`.
 *
 * The argument is typed structurally rather than as `PortableTextBlock[]` because typegen
 * cannot see the schema's validation rules, and so marks a block's `children` — and each
 * span's `text` — optional where Portable Text requires them. The values are identical at
 * runtime, and this is the one place that gap is bridged.
 */
export function renderText(blocks: readonly { _type: string; _key: string }[]): string {
    return toHTML(blocks as unknown as PortableTextBlock[], {
        components: {
            block: {
                normal: ({ children }) => `<p>${children}</p>`,
                blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
            },
            marks: {
                link: ({ children, value }) =>
                    `<a href="${value.href}" target="_blank" rel="noreferrer">${children}</a>`,
            },
        },
    });
}

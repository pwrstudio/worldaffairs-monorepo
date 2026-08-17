import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
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

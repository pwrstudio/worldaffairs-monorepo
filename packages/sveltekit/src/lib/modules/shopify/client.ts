import { env } from '$env/dynamic/private';

export class ShopifyConfigError extends Error {}

type GraphQLResponse<T> = {
    data?: T;
    errors?: Array<{ message: string }>;
};

export const shopifyFetch = async <T>(query: string, variables: Record<string, unknown> = {}) => {
    const domain = env.SHOPIFY_STORE_DOMAIN;
    const token = env.SHOPIFY_STOREFRONT_TOKEN;

    if (!domain || !token) {
        throw new ShopifyConfigError(
            'Missing Shopify env vars (SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN)'
        );
    }

    const apiVersion = env.SHOPIFY_API_VERSION || '2024-10';
    const url = `https://${domain}/api/${apiVersion}/graphql.json`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
            Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
        throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as GraphQLResponse<T>;
    if (json.errors?.length) {
        throw new Error(`Shopify GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);
    }
    if (!json.data) {
        throw new Error('Shopify response missing data');
    }
    return json.data;
};

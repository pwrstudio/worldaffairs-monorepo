import { env } from '$env/dynamic/private';
import { shopifyFetch, ShopifyConfigError } from './client';
import { PRODUCTS_LISTING_QUERY } from './queries';
import type { ShopifyProduct } from './types';

const CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_COLLECTION_HANDLE = 'frontpage';

type CacheEntry = { products: ShopifyProduct[]; expiresAt: number };
let cache: CacheEntry | null = null;

type ProductsListingResponse = {
    collection: {
        products: {
            edges: Array<{ node: ShopifyProduct }>;
        };
    } | null;
};

export const loadProducts = async (): Promise<ShopifyProduct[]> => {
    if (cache && cache.expiresAt > Date.now()) {
        return cache.products;
    }

    try {
        const handle = env.SHOPIFY_COLLECTION_HANDLE || DEFAULT_COLLECTION_HANDLE;
        const data = await shopifyFetch<ProductsListingResponse>(PRODUCTS_LISTING_QUERY, {
            handle,
        });

        if (!data.collection) {
            console.warn(`Shopify collection "${handle}" not found - store section will be empty`);
            cache = { products: [], expiresAt: Date.now() + CACHE_TTL_MS };
            return [];
        }

        const products = data.collection.products.edges
            .map((edge) => edge.node)
            .filter((p) => p.availableForSale);

        cache = { products, expiresAt: Date.now() + CACHE_TTL_MS };
        return products;
    } catch (err) {
        if (err instanceof ShopifyConfigError) {
            console.warn(err.message + ' - store section will be empty');
        } else {
            console.warn('Failed to load Shopify products:', err);
        }
        return [];
    }
};

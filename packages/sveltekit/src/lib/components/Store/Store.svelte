<script lang="ts">
    import type { ShopifyProduct } from '$lib/modules/shopify';
    import { TableType } from '$lib/enums';
    import type { Column } from '$lib/types';
    import { STOREFRONT_URL, productUrl } from '$lib/constants';
    import DataTable from '$lib/components/Tables/DataTable.svelte';

    const { products } = $props<{
        products: ShopifyProduct[];
    }>();

    const columns: Column[] = [
        { type: 'text', label: 'Product', key: 'title', hide: false },
        { type: 'text', label: 'Information', key: 'information', hide: true },
        { type: 'linkList', label: 'Links', hide: false },
    ];

    const firstParagraphText = (html: string) => {
        const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        const inner = match ? match[1] : html;
        return inner
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const rows = $derived(
        products.map((p: ShopifyProduct) => ({
            title: p.title,
            information: firstParagraphText(p.descriptionHtml),
            links: [{ label: 'Buy', url: productUrl(p.handle) }],
        }))
    );
</script>

<h3 id="store">Store</h3>
<a href={STOREFRONT_URL} target="_blank" rel="noopener noreferrer">
    <button>Yung Lean Official Merchandise</button>
</a>

{#if rows.length > 0}
    <DataTable tableType={TableType.Products} anchor="store" {columns} data={rows} />
{/if}

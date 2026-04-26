export type ShopifyMoney = {
    amount: string;
    currencyCode: string;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    title: string;
    descriptionHtml: string;
    availableForSale: boolean;
    priceRange: { minVariantPrice: ShopifyMoney };
    updatedAt: string;
};

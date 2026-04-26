export const PRODUCTS_LISTING_QUERY = /* GraphQL */ `
    query ProductsListing($handle: String!) {
        collection(handle: $handle) {
            products(first: 100) {
                edges {
                    node {
                        id
                        handle
                        title
                        descriptionHtml
                        availableForSale
                        updatedAt
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    }
`;

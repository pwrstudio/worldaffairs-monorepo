const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Get JSON file from command line argument
const jsonFile = process.argv[2];

if (!jsonFile) {
    console.error('Usage: node import-products.js <json-file>');
    console.error('Example: node import-products.js products.json');
    process.exit(1);
}

// Resolve the file path
const filePath = path.resolve(process.cwd(), jsonFile);

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

// Load the products from the JSON file
let products;
try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    products = JSON.parse(fileContent);
} catch (error) {
    console.error(`Failed to parse JSON file: ${error.message}`);
    process.exit(1);
}

if (!Array.isArray(products)) {
    console.error('JSON file must contain an array of products');
    process.exit(1);
}

// Initialize Sanity client
const client = createClient({
    projectId: 'fzoco9f8',
    dataset: 'production',
    apiVersion: '2025-03-19',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

async function importProducts() {
    console.log(`Importing ${products.length} products from ${jsonFile}...`);

    let imported = 0;
    let failed = 0;

    for (const product of products) {
        try {
            // Create a unique ID for the document
            const docId = uuidv4();

            // Transform the data to match the schema
            const { link, ...rest } = product;

            // Build links array if link exists
            const links = link ? [{ _key: uuidv4(), label: 'Buy', url: link }] : undefined;

            const transformedProduct = {
                ...rest,
                ...(links && { links }),
            };

            // Create the document in Sanity (only adds, never removes existing)
            await client.create({
                _id: docId,
                _type: 'product',
                ...transformedProduct,
            });

            console.log(`✓ ${product.title}`);
            imported++;
        } catch (error) {
            console.error(`✗ ${product.title}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\nImport completed: ${imported} added, ${failed} failed`);
}

importProducts().catch(console.error);

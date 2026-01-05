const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Initialize Sanity client
const client = createClient({
    projectId: 'fzoco9f8',
    dataset: 'production',
    apiVersion: '2025-03-19',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

async function deleteAllTourDates() {
    console.log('Starting to delete all tour dates...');

    try {
        // First, fetch all tour date documents
        const query = `*[_type == "tourDate"]`;
        const documents = await client.fetch(query);

        console.log(`Found ${documents.length} tour dates to delete`);

        // Delete each document
        const transaction = client.transaction();
        documents.forEach((doc) => {
            transaction.delete(doc._id);
        });

        // Commit the transaction
        await transaction.commit();

        console.log('Successfully deleted all tour dates!');
    } catch (error) {
        console.error('Failed to delete tour dates:', error);
    }
}

// Run the deletion
deleteAllTourDates().catch(console.error);

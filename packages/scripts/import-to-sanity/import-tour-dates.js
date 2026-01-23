const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Get JSON file from command line argument
const jsonFile = process.argv[2];

if (!jsonFile) {
    console.error('Usage: node import-tour-dates.js <json-file>');
    console.error('Example: node import-tour-dates.js tour-dates-2026.json');
    process.exit(1);
}

// Resolve the file path
const filePath = path.resolve(process.cwd(), jsonFile);

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

// Load the tour dates from the JSON file
let tourDates;
try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    tourDates = JSON.parse(fileContent);
} catch (error) {
    console.error(`Failed to parse JSON file: ${error.message}`);
    process.exit(1);
}

if (!Array.isArray(tourDates)) {
    console.error('JSON file must contain an array of tour dates');
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

async function importTourDates() {
    console.log(`Importing ${tourDates.length} tour dates from ${jsonFile}...`);

    let imported = 0;
    let failed = 0;

    for (const tourDate of tourDates) {
        try {
            // Create a unique ID for the document
            const docId = uuidv4();

            // Transform the data to match the schema
            const { ticketLink, ...rest } = tourDate;

            // Build links array if ticketLink exists
            const links = ticketLink
                ? [{ _key: uuidv4(), label: 'Tickets', url: ticketLink }]
                : undefined;

            const transformedTourDate = {
                ...rest,
                ...(links && { links }),
            };

            // Create the document in Sanity (only adds, never removes existing)
            await client.create({
                _id: docId,
                _type: 'tourDate',
                ...transformedTourDate,
            });

            console.log(`✓ ${tourDate.date} - ${tourDate.location}`);
            imported++;
        } catch (error) {
            console.error(`✗ ${tourDate.date} - ${tourDate.location}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\nImport completed: ${imported} added, ${failed} failed`);
}

importTourDates().catch(console.error);

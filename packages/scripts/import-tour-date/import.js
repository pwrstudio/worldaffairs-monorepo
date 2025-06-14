const { createClient } = require('@sanity/client')
const { v4: uuidv4 } = require('uuid')
const tourDates = require('./tour-dates')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Initialize Sanity client
const client = createClient({
  projectId: 'fzoco9f8',
  dataset: 'production',
  apiVersion: '2025-03-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

async function importTourDates() {
  console.log('Starting tour date import...')
  
  for (const tourDate of tourDates) {
    try {
      // Create a unique ID for the document
      const docId = uuidv4()
      
      // Transform the data to match the new schema
      const { ticketLink, ...rest } = tourDate
      const transformedTourDate = {
        ...rest,
        links: [{
          _key: uuidv4(),
          label: 'Tickets',
          url: ticketLink
        }]
      }
      
      // Create the document in Sanity
      const result = await client.create({
        _id: docId,
        _type: 'tourDate',
        ...transformedTourDate
      })
      
      console.log(`Successfully imported tour date: ${tourDate.date} - ${tourDate.location}`)
    } catch (error) {
      console.error(`Failed to import tour date: ${tourDate.date} - ${tourDate.location}`)
      console.error(error)
    }
  }
  
  console.log('Tour date import completed!')
}

// Run the import
importTourDates().catch(console.error)

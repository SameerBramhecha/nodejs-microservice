const express = require('express');
const {CosmosClient} = require('@azure/cosmos')
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic API endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js microservice!');
});

// Cosmos DB client setup
const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
});

const database = client.database(process.env.COSMOS_DB_DATABASE);
const container = database.container(process.env.COSMOS_DB_CONTAINER);

// Another example endpoint
app.post('/data', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).send('No data provided');
  }
  res.send(`Received data: ${JSON.stringify(data)}`);
});

// Simple endpoint to fetch all records from a collection
app.get('/items', async (req, res) => {
    try {
        const { resources } = await container.items.readAll().fetchAll();
        res.status(201).json(resources);
    } catch (error) {
        res.status(500).send(error);
    }
});


// POST endpoint to add a new item to the collection
app.post('/items', async (req, res) => {
    const newItem = req.body;  // Get the new item from the request body

    try {
        const { resource: createdItem } = await container.items.create(newItem);
        res.status(201).json(createdItem);  // Respond with the created item
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).send(error);
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});

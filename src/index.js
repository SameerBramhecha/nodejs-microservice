const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic API endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js microservice!');
});

// Another example endpoint
app.post('/data', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).send('No data provided');
  }
  res.send(`Received data: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});

// Import Express
const express = require('express');
const fs = require('fs');
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Handle POST requests and print their contents
app.post('/log', (req, res) => {
    console.log('Received POST request with data:', req.body);
    res.send('Data received');
    fs.appendFile('log.txt', JSON.stringify(req.body) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
});

// Start the server
app.listen(5678, () => {
    console.log('Server is running on http://localhost:5678');
});
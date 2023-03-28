// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")

// Import route handlers from the routes/api module
const { handleChatCompletion, handleListModels } = require("./routes/api");

// Initialize the Express application
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json())

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Define the port for the application to listen on
const port = 3080;

// Register the imported route handlers for chat completion and model listing
app.post('/', handleChatCompletion);
app.get('/models', handleListModels);

// Start the application and listen for incoming requests
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

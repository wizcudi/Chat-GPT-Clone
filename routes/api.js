// Import OpenAI API module
const { Configuration, OpenAIApi } = require("openai");

// Create a configuration object using the organization ID and API key from environment variables
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});

// Initialize an instance of the OpenAIApi with the configuration
const openai = new OpenAIApi(configuration);

// Route handler for generating chat completions
async function handleChatCompletion(req, res) {
    const { message, currentModel } = req.body;

    let response;

    // Check if the model supports chat-based completion
    if (currentModel.includes("gpt")) {
        response = await openai.createChatCompletion({
            model: `${currentModel}`,
            messages: [{role: 'user', content: `${message}`}],
            max_tokens: 4000,
            temperature: 0.5,
        });
    } else {
        // Fall back to prompt-based completion for non-chat models
        response = await openai.createCompletion({
            model: `${currentModel}`,
            prompt: `${message}`,
            max_tokens: 1000,
            temperature: 0.5,
        });
    }

    // Return the generated response as JSON
    res.json({
        message: currentModel.includes("gpt") ? response.data.choices[0].message.content : response.data.choices[0].text,
    })
}

// Route handler for fetching available models
async function handleListModels(req, res) {
    // Fetch the list of available models from the OpenAI API
    const response = await openai.listEngines();

    // Return the list of models as JSON
    res.json({
        models: response.data.data,
    })
}

// Export the route handlers for use in other modules
module.exports = {
    handleChatCompletion,
    handleListModels
};
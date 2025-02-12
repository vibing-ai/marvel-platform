// services/genkit.js
const { genkit } = require('genkit');
const { logger } = require('genkit/logging');
const { googleAI } = require('@genkit-ai/googleai');
const { vertexAI } = require('@genkit-ai/vertexai');
const { enableGoogleCloudTelemetry } = require('@genkit-ai/google-cloud');

// Set log level to see detailed logs
logger.setLogLevel('debug');

// Enable telemetry for debugging
enableGoogleCloudTelemetry();

// Initialize Genkit instance
const aiInstance = genkit({
  debug: true,
  telemetry: true,
  plugins: [vertexAI(), googleAI()],
});

module.exports = {
  ai: aiInstance,
  googleAIapiKey: process.env.GOOGLE_API_KEY,
};
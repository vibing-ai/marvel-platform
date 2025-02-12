// index.js
const { onCallGenkit } = require('firebase-functions/https');
const { googleAIapiKey } = require('./services/genkit');
const { basicChatFlow } = require('./flows/basicChatFlow');

console.log('Google API Key:', googleAIapiKey);

// Expose the basic chat flow as a Firebase callable function
exports.basicChatMessage = onCallGenkit(
  { secrets: [googleAIapiKey] },
  basicChatFlow
);
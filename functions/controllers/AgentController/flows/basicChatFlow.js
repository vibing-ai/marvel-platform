// flows/basicChatFlow.js
const { ai } = require('../services/genkit');
const { z } = require('genkit');

// Load the basic prompt by its file name (without the .prompt extension)
const basicChatPrompt = ai.prompt('basicChat');

exports.basicChatFlow = ai.defineFlow(
  {
    name: "basicChatFlow",
    // Define schemas using Zod
    inputSchema: z.object({
      message: z.string()
    }),
    outputSchema: z.object({
      response: z.any()
    })
  },
  async (input) => {
    console.log('Input:', input);
    // Call the prompt with the user message
    const { text } = await basicChatPrompt({ message: input.message });
    console.log('text:', text);
    return { response: text };
  }
);
import axios from 'axios';

import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { firestore } from '@/libs/redux/store'; // Import the existing Firestore instance

/**
 * Save the tool session response to Firestore
 * @param {object} sessionData - The data to be saved to Firestore
 */
const saveResponseToFirestore = async (sessionData) => {
  try {
    await addDoc(collection(firestore, 'toolSessions'), {
      ...sessionData,
      createdAt: Timestamp.fromMillis(Date.now()),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving tool session to Firestore:', error);
  }
};

/**
 * Submits a prompt to the Marvel AI backend and saves the response to Firestore
 * @param {object} payload - The payload to be sent to the backend
 * @param {object} payload.tool_data - The tool data
 * @param {number} payload.tool_data.tool_id - The ID of the tool
 * @param {Array<object>} payload.tool_data.inputs - The inputs for the tool
 * @param {object} payload.user - The user data
 * @param {string} payload.user.id - The ID of the user
 * @return {Promise<object>} The response from the backend
 */
const submitPrompt = async (payload) => {
  try {
    const response = {};

    // Return for tool_id = presentation-generator
    if (payload.tool_data.tool_id === 'presentation-generator') {
      response.data = {
        data: {
          slides: [
            {
              title: 'Can we really trust AI?',
              content: 'That is the question',
              type: 'title',
            },
            {
              title: 'Something to think about',
              content: 'It is a question of trust',
              type: 'body',
            },
            {
              title: 'Another slide',
              content: 'Another content',
              type: 'body',
            },
            {
              title: 'that is the question',
              content: 'It is a question of trust',
              type: 'body',
            },
          ],
        },
      };
    } else {
      const url = `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`;

      response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'API-Key': 'dev',
        },
      });
    }

    // Safely extract the topic from inputs
    const topicInput = payload.tool_data.inputs.find(
      (input) => input.name === 'topic'
    );
    const topic = topicInput ? topicInput.value : null;

    // Extract necessary data for Firestore
    const sessionData = {
      response: response.data.data,
      toolId: payload.tool_data.tool_id, // Extract toolId from tool_data
      topic, // Use the safely extracted topic
      userId: payload.user.id, // Extract userId from user
    };

    // non-blocking: Save the response to Firestore
    saveResponseToFirestore(sessionData);

    return response.data?.data;
  } catch (err) {
    const { response } = err;

    // eslint-disable-next-line no-console
    console.error('Error sending request:', err);

    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;

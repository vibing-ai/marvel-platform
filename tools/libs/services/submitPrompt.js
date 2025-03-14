import axios from 'axios';

import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { firestore } from '@/libs/redux/store'; // Import the existing Firestore instance

/**
 * Save the tool session response to Firestore
 * @param {object} sessionData - The data to be saved to Firestore
 */
const saveResponseToFirestore = async (sessionData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'toolSessions'), {
      ...sessionData,
      createdAt: Timestamp.fromMillis(Date.now()),
    });
    return docRef.id;  // Return the document ID
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving tool session to Firestore:', error);
    return null;
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
const submitPrompt = async (payload, dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`;

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'dev',
      },
    });

    console.log('Response:', response.data);

    // Safely extract the topic from inputs
    const topicInput = payload.tool_data.inputs.find(
      (input) => input.name === 'topic'
    );
    const topic = topicInput ? topicInput.value : null;

    // Extract necessary data for Firestore
    const sessionData = {
      response: response.data.data,
      toolId: payload.tool_data.tool_id, // Extract toolId from tool_data
      currentState: {
        content: null,
        timestamp: null,
        type: null,
      },
      editHistory: [],
      topic, // Use the safely extracted topic
      userId: payload.user.id, // Extract userId from user
      savedInputs: payload.tool_data.inputs, // Store all input data in the same document
      lastEditedAt: Timestamp.fromMillis(Date.now()),
    };

    // Save the response to Firestore and get the session ID
    const sessionId = await saveResponseToFirestore(sessionData);

    return {
      response: response.data?.data,
      sessionId,
      topic,
    };
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
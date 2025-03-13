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
  const presentation_outline = [
    'Introduction to World War II',
    'Causes of the War',
    'Rise of Totalitarian Regimes',
    'Major Battles and Strategies',
    'Key Figures and Leaders',
    'The Role of Technology and Warfare Innovations',
    'The Home Front and War Efforts',
    'Allied vs. Axis Powers: A Comparison',
    'The Holocaust and Human Rights Violations',
    'End of the War and Surrender',
    'The Aftermath and Global Impact',
    'The Formation of the United Nations',
    'Cold War Beginnings',
    'Legacy and Lessons Learned',
  ];

  const presentation_response = [
    {
      title: 'Introduction to World War II',
      content: [
        'An overview of the global conflict that lasted from 1939 to 1945.',
      ],
      template: 'titleBody',
    },
    {
      title: 'Causes of the War',
      content: [
        'Treaty of Versailles and its consequences',
        'Rise of totalitarian regimes',
        'Expansionist policies of Axis Powers',
        'Failure of the League of Nations',
      ],
      template: 'titleBullets',
    },
    {
      title: 'Major Participants',
      content: [
        'Allies: USA, UK, USSR, China, France',
        'Axis: Germany, Italy, Japan',
      ],
      template: 'titleBullets',
    },
    {
      title: 'Key Events of the War',
      content: [
        'Germany invades Poland (1939)',
        'Battle of Britain (1940)',
        'Pearl Harbor Attack (1941)',
        'D-Day Invasion (1944)',
        'Hiroshima and Nagasaki (1945)',
      ],
      template: 'titleBullets',
    },
    {
      title: 'The Eastern Front',
      content: [
        'The largest and bloodiest front of WWII, primarily between Nazi Germany and the Soviet Union.',
      ],
      template: 'titleBody',
    },
    {
      title: 'War in the Pacific',
      content: [
        'Japanese expansion across Asia and the Pacific',
        'Key battles: Midway, Iwo Jima, Okinawa',
        'Atomic bombings of Hiroshima and Nagasaki',
      ],
      template: 'titleBullets',
    },
    {
      title: 'Impact on Civilians',
      content: [
        'Holocaust and genocide',
        'Mass bombings of cities',
        'Displacement and refugee crises',
        'Economic and social turmoil',
      ],
      template: 'titleBullets',
    },
    {
      title: 'End of the War',
      content: [
        'Germany surrenders in May 1945',
        'Japan surrenders in September 1945 after atomic bombings',
      ],
      template: 'titleBullets',
    },
    {
      title: 'Aftermath and Consequences',
      content: [
        'Formation of the United Nations',
        'Start of the Cold War',
        'Decolonization movements',
        'Economic recovery and rebuilding',
      ],
      template: 'titleBullets',
    },
    {
      title: 'Lessons from World War II',
      content: [
        'The importance of diplomacy',
        'Need for international cooperation',
        'Dangers of unchecked aggression',
      ],
      template: 'titleBullets',
    },
  ];

  try {
    const url = `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`;

    // console.log(payload.tool_data.tool_id === 'presentation-generator')
    if (payload.tool_data.tool_id === 'presentation-generator') {
      // console.log(payload);
      return presentation_outline;
    }

    if (payload.tool_data.tool_id === 'presentation') {
      console.log('Presentation inside if');
      return presentation_response;
    }

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'dev',
      },
    });

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

// const submitPrompt = async (payload) => {

//   return presentation_outline;

// }

export default submitPrompt;

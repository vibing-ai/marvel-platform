const API_ENDPOINT = 'https://marvel-ai-backend-sandbox-297484662473.us-east1.run.app/assistant-chat';

export const createAssistantSession = async (assistantId, userName, userAge, userPreference) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistant_inputs: {
          assistant_group: 'classroom_support',
          assistant_name: assistantId,
          user_info: {
            user_name: userName,
            user_age: userAge,
            user_preference: userPreference
          },
          messages: []
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create assistant session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating assistant session:', error);
    throw error;
  }
};

export const sendMessage = async (assistantId, sessionId, message, messages) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistant_inputs: {
          assistant_group: 'classroom_support',
          assistant_name: assistantId,
          user_info: {
            session_id: sessionId
          },
          messages: [
            ...messages,
            {
              role: 'human',
              type: 'text',
              timestamp: new Date().toISOString(),
              payload: {
                text: message
              }
            }
          ]
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

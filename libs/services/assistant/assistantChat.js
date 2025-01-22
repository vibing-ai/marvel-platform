import { setError, setStreaming, setTyping } from '../../redux/slices/chatSlice';

const ASSISTANT_CHAT_ENDPOINT = 'https://marvel-ai-backend-sandbox-297484662473.us-east1.run.app/assistant-chat';

/**
 * Formats messages to match the assistant chat API format
 * @param {Array} messages - Array of chat messages
 * @returns {Array} Formatted messages
 */
export const formatMessages = (messages) => {
  return messages.map(msg => ({
    role: msg.role,
    type: 'text',
    timestamp: msg.timestamp || null,
    payload: {
      text: msg.payload?.text || msg.message?.payload?.text || msg.response?.payload?.text || ''
    }
  }));
};

/**
 * Sends a message to the assistant chat endpoint
 * @param {Object} payload - Message payload
 * @param {string} payload.assistantGroup - Assistant group name
 * @param {string} payload.assistantName - Assistant name
 * @param {Object} payload.userInfo - User information
 * @param {Array} payload.messages - Chat messages
 * @param {function} dispatch - Redux dispatch function
 * @returns {Promise} Response from the assistant chat endpoint
 */
export const sendAssistantMessage = async (payload, dispatch) => {
  try {
    const response = await fetch(ASSISTANT_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'dev'
      },
      body: JSON.stringify({
        assistant_inputs: {
          assistant_group: payload.assistantGroup,
          assistant_name: payload.assistantName,
          user_info: payload.userInfo,
          messages: formatMessages(payload.messages)
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    dispatch(setError('Error! Couldn\'t send message'));
    dispatch(setStreaming(false));
    dispatch(setTyping(false));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    console.error('Error sending message:', err);
    throw err;
  }
};

export default sendAssistantMessage;

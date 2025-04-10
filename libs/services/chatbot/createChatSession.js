import {
  setError,
  setStreaming,
  setTyping,
} from '@/libs/redux/slices/chatSlice';
import axios from "axios"
import functions_urls from '@/libs/constants/google_functions_url_selector';

/**
 * Creates a chat session.
 *
 * @param {Object} payload - The payload for creating the chat session.
 * @param {function} dispatch - The dispatch function for managing state.
 * @return {Object} - An object containing a status and data containing the session.
 */
const createChatSession = async (payload, dispatch) => {
  try {
    const response = await axios.post(functions_urls().createChatSession, payload);

    if(response.status == 200 && response.data.status !== 'error'){
      return response.data;
    }
    else{
      throw new Error(response.data.data);
    }
  } catch (err) {
    dispatch(setError('Error! Couldn\u0027t send message'));
    dispatch(setStreaming(false));
    dispatch(setTyping(false));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    throw new Error('Error could not send message');
  }
};

export default createChatSession;

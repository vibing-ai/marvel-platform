import {
  setError,
  setStreaming,
  setTyping,
} from '@/libs/redux/slices/chatSlice';
import axios from "axios";
import functions_urls from '@/libs/constants/google_functions_url_selector';

const sendMessage = async (payload, dispatch) => {
  try {
    const response = await axios.post(functions_urls().chat, payload);
    
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

    // eslint-disable-next-line no-console
    console.error('Error could not send message', err);

    // eslint-disable-next-line no-alert
    alert('Error could not send message');
    return null;
  }
};

export default sendMessage;

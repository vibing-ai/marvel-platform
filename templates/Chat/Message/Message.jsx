import { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageMessage from '../ImageMessage';
import Options from '../Options';
import TextMessage from '../TextMessage';
import VideoMessage from '../VideoMessage';
import { MESSAGE_ROLE, MESSAGE_TYPES } from '@/libs/constants/bots';
import { setStreaming, setStreamingDone } from '@/libs/redux/slices/chatSlice';

const { OPTIONS, VIDEO, TEXT, IMAGE, GIF, QUICK_REPLY } = MESSAGE_TYPES;

/**
 * Renders a message component based on the provided props.
 *
 * @param {Object} props - The props object containing the content and role of the message.
 * @return {ReactElement} The rendered message component.
 */
const Message = forwardRef((props, ref) => {
  const {
    payload,
    role,
    type,
    messagesLength,
    messageNo,
    onQuickReply,
    fullyScrolled,
    streaming,
    onRendered, // Added onRendered prop
  } = props;

  const dispatch = useDispatch();

  const isMyMessage = role === MESSAGE_ROLE.HUMAN;
  const isLastMessage = messageNo === messagesLength;
  const displayCTAs = !streaming && type === OPTIONS && isLastMessage;

  // Check message type
  const isStreamable = [TEXT, OPTIONS, QUICK_REPLY].includes(type);
  const isVideo = type === VIDEO;
  const isImage = [IMAGE, GIF].includes(type);

  const [message, setMessage] = useState('');
  const [messageMounted, setMessageMounted] = useState(
    isMyMessage || !isLastMessage
  );

  const stopStreaming =
    messageMounted || !isLastMessage || !isStreamable || !streaming;

  useEffect(() => {
    if (stopStreaming) {
      // If it's an AI message that's already complete, notify parent component
      if (!isMyMessage && typeof onRendered === 'function') {
        onRendered();
      }
      return;
    }

    const characters = payload?.text.split('');

    characters.forEach((chunk, index) => {
      setTimeout(() => {
        setMessage((prevChunks) => prevChunks + chunk);
      }, 20 * index);
    });

    setTimeout(() => {
      dispatch(setStreamingDone(true));
      setMessageMounted(true);
      dispatch(setStreaming(false));
      
      // Call onRendered callback when streaming is complete for AI messages
      if (!isMyMessage && typeof onRendered === 'function') {
        onRendered();
      }
    }, 20 * characters.length);
  }, []);

  useEffect(() => {
    if (fullyScrolled)
      ref.current?.scrollTo(0, ref.current?.scrollHeight, {
        behavior: 'smooth',
      });
  }, [message]);

  const renderStreamableMessage = () => {
    return (
      <>
        <TextMessage
          isMyMessage={isMyMessage}
          message={stopStreaming ? payload?.text : message}
        />
        <Options
          options={payload?.options}
          onQuickReply={onQuickReply}
          show={displayCTAs}
        />
      </>
    );
  };

  return (
    <>
      {isStreamable && renderStreamableMessage()}
      {isVideo && <VideoMessage link={payload?.text} />}
      {isImage && <ImageMessage link={payload?.text} />}
    </>
  );
});

export default Message;
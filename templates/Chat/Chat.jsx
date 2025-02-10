import { useContext, useEffect, useRef, useState } from 'react';

import {
  ArrowDownwardOutlined,
  InfoOutlined,
  Settings,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import {
  Button,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';

import NavigationIcon from '@/assets/svg/Navigation.svg';

import ChatHistoryWindow from './ChatHistoryWindow';
import ChatSpinner from './ChatSpinner';
import DefaultPrompt from './DefaultPrompt';
import Message from './Message';
import QuickActions from './QuickActions';
import styles from './styles';

import TextMessage from './TextMessage';

import { MESSAGE_ROLE, MESSAGE_TYPES } from '@/libs/constants/bots';

import { AuthContext } from '@/libs/providers/GlobalProvider';
import {
  openInfoChat,
  resetChat,
  setActionType,
  setChatSession,
  setDisplayQuickActions,
  setError,
  setFullyScrolled,
  setInput,
  setMessages,
  setMore,
  setSessionLoaded,
  setStreaming,
  setStreamingDone,
  setTyping,
} from '@/libs/redux/slices/chatSlice';
import { updateHistoryEntry } from '@/libs/redux/slices/historySlice';
import { firestore } from '@/libs/redux/store';
import fetchHistory from '@/libs/redux/thunks/fetchHistory';
import createChatSession from '@/libs/services/chatbot/createChatSession';
import sendMessage from '@/libs/services/chatbot/sendMessage';

const ChatInterface = () => {
  const messagesContainerRef = useRef();

  const dispatch = useDispatch();
  const {
    more,
    input,
    typing,
    chat,
    sessionLoaded,
    openSettingsChat,
    infoChatOpened,
    fullyScrolled,
    streamingDone,
    streaming,
    error,
    displayQuickActions,
    actionType,
  } = useSelector((state) => state.chat);
  const { data: userData } = useSelector((state) => state.user);

  const sessionId = localStorage.getItem('sessionId');

  const currentSession = chat;
  const chatMessages = currentSession?.messages;
  const showNewMessageIndicator = !fullyScrolled && streamingDone;

  const { handleOpenSnackBar } = useContext(AuthContext);

  const [isAIProcessing, setIsAIProcessing] = useState(false); // Newly Added
  

  const startConversation = async (message) => {
    // Optionally dispatch a temporary message for the user's input
    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    // Define the chat payload
    const chatPayload = {
      user: {
        id: userData?.id,
        fullName: userData?.fullName,
        email: userData?.email,
      },
      type: 'chat',
      message,
    };

    // Send a chat session
    const { status, data } = await createChatSession(chatPayload, dispatch);

    // Remove typing bubble
    dispatch(setTyping(false));
    if (status === 'created') dispatch(setStreaming(true));

    // Set chat session
    dispatch(setChatSession(data));
    dispatch(setSessionLoaded(true));

    dispatch(fetchHistory(userData.id));
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('sessionId');
      dispatch(resetChat());
    };
  }, []);

  useEffect(() => {
    let unsubscribe;

    if (sessionLoaded || currentSession) {
      messagesContainerRef.current?.scrollTo(
        0,
        messagesContainerRef.current?.scrollHeight,
        {
          behavior: 'smooth',
        }
      );

      const sessionRef = query(
        collection(firestore, 'chatSessions'),
        where('id', '==', sessionId)
      );

      unsubscribe = onSnapshot(sessionRef, async (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const updatedData = change.doc.data();
            const updatedMessages = updatedData.messages;

            const lastMessage = updatedMessages[updatedMessages.length - 1];
            // Convert Firestore timestamp to JavaScript Date object.
            lastMessage.timestamp = lastMessage.timestamp.toDate();

            // Update the history entry with the latest timestamp.
            dispatch(
              updateHistoryEntry({
                id: sessionId,
                updatedAt: updatedData.updatedAt.toDate().toISOString(),
              })
            );

            if (lastMessage?.role === MESSAGE_ROLE.AI) {
              dispatch(
                setMessages({
                  role: MESSAGE_ROLE.AI,
                  response: lastMessage,
                })
              );
              dispatch(setTyping(false));
              setIsAIProcessing(false);   //Newly Added
            }
          }
        });
      });
    }

    return () => {
      if (sessionLoaded || currentSession) unsubscribe();
    };
  }, [sessionLoaded]);

  const handleOnScroll = () => {
    const scrolled =
      Math.abs(
        messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.clientHeight -
          messagesContainerRef.current.scrollTop
      ) <= 1;

    if (fullyScrolled !== scrolled) dispatch(setFullyScrolled(scrolled));
  };

  const handleScrollToBottom = () => {
    messagesContainerRef.current?.scrollTo(
      0,
      messagesContainerRef.current?.scrollHeight,
      {
        behavior: 'smooth',
      }
    );

    dispatch(setStreamingDone(false));
  };

  const handleSendMessage = async () => {
    if (!input) {
      dispatch(setError('Please enter a message'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

    // Lock input when AI starts processing
    setIsAIProcessing(true);   //Newly Added

    // BUG FIX: First checking whether the user has entered any text before setting streaming true amd then sending the message.
    dispatch(setStreaming(true));

    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.TEXT,
      payload: {
        text: input,
        action: actionType,
      },
    };

    if (!chatMessages) {
      // Start a new conversation if there are no existing messages
      await startConversation(message);
      return;
    }

    // Add the user's message to the chat
    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    // Ensure the user’s message is displayed before sending the message
    setTimeout(async () => {
      await sendMessage(
        { message, id: sessionId },
        dispatch,
        handleOpenSnackBar
      );
    }, 0);
    dispatch(setActionType(null));
  };

  const handleQuickReply = async (option) => {
    // Lock input when AI starts processing
    setIsAIProcessing(true);   //Newly Added

    dispatch(setInput(option));
    dispatch(setStreaming(true));

    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.QUICK_REPLY,
      payload: {
        text: option,
        action: actionType,
      },
    };

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
      })
    );
    dispatch(setTyping(true));

    await sendMessage({ message, id: currentSession?.id }, dispatch);

    dispatch(setActionType(null));
  };

  /* Push Enter */
  const keyDownHandler = async (e) => {
    if (typing || !input || streaming || isAIProcessing) return;    //Newly Added
    if (e.keyCode === 13) handleSendMessage();
  };

  const renderSendIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={handleSendMessage}
          {...styles.bottomChatContent.iconButtonProps(
            typing || error || !input || streaming || isAIProcessing   //Newly Added
          )}
        >
          <NavigationIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  const renderMoreChat = () => {
    if (!more) return null;
    return (
      <Grid {...styles.moreChat.moreChatProps}>
        <Grid {...styles.moreChat.contentMoreChatProps}>
          <Settings {...styles.moreChat.iconProps} />
          <Typography {...styles.moreChat.titleProps}>Settings</Typography>
        </Grid>
        <Grid
          {...styles.moreChat.contentMoreChatProps}
          onClick={() => dispatch(openInfoChat())}
        >
          <InfoOutlined {...styles.moreChat.iconProps} />
          <Typography {...styles.moreChat.titleProps}>Information</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderStartChatMessage = () => {
    return (
      <TextMessage
        isMyMessage={false}
        message="Hello! I’m Marvel, your AI teaching assistant. You can ask any questions realted to best practices in teaching, or working with your students. Feel free to ask me for ideas for your classroom, and the more specific your questions, the better my responses will be. **How can I help you today?**"
      />
    );
  };

  const renderCenterChatContent = () => {
    return (
      <Grid
        onClick={() => dispatch(setMore({ role: 'shutdown' }))}
        {...styles.centerChat.centerChatGridProps}
      >
        <Grid
          ref={messagesContainerRef}
          onScroll={handleOnScroll}
          {...styles.centerChat.messagesGridProps}
        >
          {/* Render the start chat message if there are no chat messages or if the info chat is not open. */}
          {(chatMessages?.length === 0 || !chatMessages) && !infoChatOpened
            ? renderStartChatMessage()
            : null}
          {chatMessages?.map(
            (message, index) =>
              message?.role !== MESSAGE_ROLE.SYSTEM && (
                <Message
                  ref={messagesContainerRef}
                  {...message}
                  messagesLength={chatMessages?.length}
                  messageNo={index + 1}
                  onQuickReply={handleQuickReply}
                  streaming={streaming}
                  fullyScrolled={fullyScrolled}
                  key={index}
                />
              )
          )}
          {typing && <ChatSpinner />}
        </Grid>
      </Grid>
    );
  };

  const renderNewMessageIndicator = () => {
    return (
      <Fade in={showNewMessageIndicator}>
        <Button
          startIcon={<ArrowDownwardOutlined />}
          onClick={handleScrollToBottom}
          {...styles.newMessageButtonProps}
        />
      </Fade>
    );
  };

  /**
   * Render the Quick Action component as an InputAdornment.
   * This component is used to toggle the display of the Quick Actions.
   *
   * @return {JSX.Element} The rendered Quick Action component.
   */
  const renderQuickAction = () => {
    // Render the Quick Action component as an InputAdornment.
    return (
      <InputAdornment position="start">
        {/* The Grid component used to display the Quick Action. */}
        <Grid
          // Handle the click event to toggle the display of the Quick Actions.
          onClick={() => dispatch(setDisplayQuickActions(!displayQuickActions))}
          {...styles.quickActionButton}
        >
          {/* Render the AddIcon component. */}
          <AddIcon {...styles.quickActionButtonAddIcon} />
          {/* Render the Typography component to display the text. */}
          <Typography>Actions</Typography>
        </Grid>
      </InputAdornment>
    );
  };

  const renderBottomChatContent = () => {
    if (!openSettingsChat && !infoChatOpened)
      return (
        <Grid {...styles.bottomChatContent.bottomChatContentGridProps}>
          {/* Default Prompt Component */}
          <DefaultPrompt handleSendMessage={handleSendMessage} />
          {/* Quick Actions Component */}
          <QuickActions handleSendMessage={handleSendMessage} />
          <Grid {...styles.bottomChatContent.chatInputGridProps(!!error)}>
            <TextField
              value={input}
              onChange={(e) => dispatch(setInput(e.currentTarget.value))}
              onKeyUp={keyDownHandler}
              error={!!error}
              helperText={error}
              disabled={!!error || isAIProcessing}
              focused={false}
              {...styles.bottomChatContent.chatInputProps(
                renderQuickAction,
                renderSendIcon,
                !!error
              )}
            />
          </Grid>
        </Grid>
      );

    return null;
  };

  return (
    <Grid {...styles.chatInterface}>
      <Grid {...styles.mainGridProps}>
        {renderMoreChat()}
        {renderCenterChatContent()}
        {renderNewMessageIndicator()}
        {renderBottomChatContent()}
      </Grid>
      {/* ChatHistoryWindow component displays a sidebar that contains chat history. This component is rendered on the right side of the chat interface. */}
      <ChatHistoryWindow />
    </Grid>
  );
};

export default ChatInterface;

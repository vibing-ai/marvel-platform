
/* eslint-disable consistent-return */
import { useState, useContext, useEffect, useRef } from 'react';

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
  CircularProgress,
  useMediaQuery,
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
  const [isAtTop, setIsAtTop] = useState(true);
  const messagesContainerRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false); // State for API processing
  const [isRendering, setIsRendering] = useState(false); // State for UI rendering
  const messagesEndRef = useRef(null);

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

  const isMobileScreen = useMediaQuery('(max-width:799px)');

  const { handleOpenSnackBar } = useContext(AuthContext);

  // Helper to check if input should be disabled
  const isInputDisabled = isProcessing || isRendering || typing || streaming || !!error;

  const startConversation = async (message) => {
    setIsProcessing(true); // Disable input while API processes
    setIsRendering(true); // Disable input while UI renders
    
    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    const chatPayload = {
      user: {
        id: userData?.id,
        fullName: userData?.fullName,
        email: userData?.email,
      },
      type: 'chat',
      message,
    };

    const { status, data } = await createChatSession(chatPayload, dispatch);

    dispatch(setTyping(false));
    if (status === 'created') dispatch(setStreaming(true));

    dispatch(setChatSession(data));
    dispatch(setSessionLoaded(true));

    dispatch(fetchHistory(userData.id));
    setIsProcessing(false); // API processing complete
    // isRendering remains true until Message component calls onRendered
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('sessionId');
      dispatch(resetChat());
    };
  }, []);
  // BULLET 2: Ensure smooth auto-scrolling
  useEffect(() => {
    if (messagesEndRef.current && fullyScrolled) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, fullyScrolled]); //  Now checks `fullyScrolled` before scrolling

  useEffect(() => {
    if (!sessionLoaded || !currentSession) return;

    let unsubscribe;

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
          lastMessage.timestamp = lastMessage.timestamp.toDate(); // Convert Firestore timestamp
          dispatch(
            updateHistoryEntry({
              id: sessionId,
              updatedAt: updatedData.updatedAt.toDate().toISOString(),
            })
          );

          if (lastMessage?.role === MESSAGE_ROLE.AI) {
            dispatch(
              setMessages({ role: MESSAGE_ROLE.AI, response: lastMessage })
            );
            dispatch(setTyping(false));
            console.log(
              ' AI message received - setting `streamingDone` to true'
            );
            dispatch(setStreamingDone(true));
            dispatch(setStreaming(false)); // Stop streaming after AI message

            // Force `fullyScrolled` to false since a new AI message has arrived
            dispatch(setFullyScrolled(false));
          }
        }
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [sessionLoaded, currentSession]);

  //BULLET 3: Prevent forced scrolling when the user manually scrolls up
  const handleOnScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    console.log(' User Scrolled - At Bottom?', isAtBottom);

    if (fullyScrolled !== isAtBottom) {
      dispatch(setFullyScrolled(isAtBottom));
    }

    // Show "New Response" indicator when user scrolls up
    if (!isAtBottom) {
      dispatch(setStreamingDone(true));
    }
  };

  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Reset both streaming done and fully scrolled states
    dispatch(setStreamingDone(false));
    dispatch(setFullyScrolled(true));
  };

  const handleSendMessage = async () => {
    if (!input || isInputDisabled) {
      if (!input) {
        dispatch(setError('Please enter a message'));
        setTimeout(() => {
          dispatch(setError(null));
        }, 3000);
      }
      return;
    }

    setIsProcessing(true);
    setIsRendering(true);
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
      await startConversation(message);
      return;
    }

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));
    dispatch(setInput('')); // Clear input after sending

    setTimeout(async () => {
      await sendMessage(
        { message, id: sessionId },
        dispatch,
        handleOpenSnackBar
      );
      setIsProcessing(false); // API processing complete
      // isRendering remains true until Message component calls onRendered
    }, 0);
    dispatch(setActionType(null));
  };

  const handleQuickReply = async (option) => {
    if (isInputDisabled) return;
    
    setIsProcessing(true);
    setIsRendering(true);
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
        message, // Add the message to properly render it
      })
    );
    dispatch(setTyping(true));

    await sendMessage({ message, id: currentSession?.id }, dispatch);
    setIsProcessing(false);
    dispatch(setActionType(null));
  };

  const keyDownHandler = async (e) => {
    if (isInputDisabled) return;
    if (e.keyCode === 13) handleSendMessage();
  };

  // Handler called when Message component finishes rendering AI response
  const handleMessageRendered = () => {
    setIsRendering(false);
  };

  const renderSendIcon = () => {
    return (
      <InputAdornment position="end">
        {isInputDisabled ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <IconButton
            onClick={handleSendMessage}
            {...styles.bottomChatContent.iconButtonProps(isInputDisabled)}
          >
            <NavigationIcon />
          </IconButton>
        )}
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
        message="Hello! I'm Marvel, your AI teaching assistant. You can ask any questions related to best practices in teaching, or working with your students. Feel free to ask me for ideas for your classroom, and the more specific your questions, the better my responses will be. **How can I help you today?**"
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
                  onRendered={handleMessageRendered} // Pass the callback to set isRendering to false
                />
              )
          )}
          {typing && <ChatSpinner />}
          <div ref={messagesEndRef} />
        </Grid>
      </Grid>
    );
  };
  //BULLET 4: Introduce a “New Response” indicator

  const renderNewMessageIndicator = () => {
    const showIndicator = (!fullyScrolled && streamingDone) || !fullyScrolled;

    return (
      <Fade in={showIndicator}>
        <button
          onClick={handleScrollToBottom}
          className={`
          ${showIndicator ? 'flex' : 'hidden'}
          fixed bottom-[150px] left-[40%] -translate-x-1/2 z-50
          items-center justify-center gap-2
          bg-[rgb(88,20,244)] hover:bg-[rgb(88,20,244)]
          text-white text-sm font-medium
          w-[120px] h-8 px-3
          rounded-full shadow-lg
          transition-all duration-200 ease-in-out
        `}
        >
          <ArrowDownwardOutlined className="w-4 h-4 text-white" />
          <span className="text-white">New Response</span>
        </button>
      </Fade>
    );
  };

  const renderQuickAction = () => {
    return (
      <InputAdornment position="start">
        <Grid
          onClick={() => !isInputDisabled && dispatch(setDisplayQuickActions(!displayQuickActions))}
          {...styles.quickActionButton}
          sx={{
            ...styles.quickActionButton.sx,
            opacity: isInputDisabled ? 0.6 : 1,
            cursor: isInputDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          <AddIcon {...styles.quickActionButtonAddIcon} />
          {/* Render the Typography component if the screen is not mobile size (at least 800 pixels wide). */}
          {!isMobileScreen && <Typography>Actions</Typography>}
        </Grid>
      </InputAdornment>
    );
  };

  const renderBottomChatContent = () => {
    if (!openSettingsChat && !infoChatOpened)
      return (
        <Grid {...styles.bottomChatContent.bottomChatContentGridProps}>
          <DefaultPrompt handleSendMessage={isInputDisabled ? null : handleSendMessage} />
          <QuickActions handleSendMessage={isInputDisabled ? null : handleSendMessage} />
          <Grid {...styles.bottomChatContent.chatInputGridProps(!!error)}>
            <TextField
              value={input}
              onChange={(e) => !isInputDisabled && dispatch(setInput(e.currentTarget.value))}
              onKeyUp={keyDownHandler}
              error={!!error}
              helperText={error}
              disabled={isInputDisabled}
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

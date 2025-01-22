import { useContext, useEffect, useRef, useMemo } from 'react';

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
import fetchHistory from '@/libs/redux/thunks/fetchHistory';
import { sendAssistantMessage } from '../../libs/services/assistant/assistantChat';
import { useRouter } from 'next/router';

const ChatInterface = () => {
  const messagesContainerRef = useRef();
  const router = useRouter();
  const { assistant } = router.query;

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
  const { data: assistants } = useSelector((state) => state.assistants);

  const currentSession = chat;
  const chatMessages = currentSession?.messages;
  const showNewMessageIndicator = !fullyScrolled && streamingDone;

  const { handleOpenSnackBar } = useContext(AuthContext);

  // Get the current assistant data
  const currentAssistant = useMemo(() => 
    assistants?.find(a => a.id === assistant),
    [assistants, assistant]
  );

  useEffect(() => {
    if (!assistants?.length) {
      dispatch(fetchAssistants());
    }
  }, [dispatch]);

  const startConversation = async (message) => {
    if (!currentAssistant) {
      dispatch(setError('Assistant not found'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    try {
      const response = await sendAssistantMessage({
        assistantGroup: currentAssistant.groupName,
        assistantName: currentAssistant.name,
        userInfo: {
          user_name: userData?.fullName || 'Anonymous',
          user_preference: userData?.role || 'Student',
          user_age: userData?.age || 20
        },
        messages: [message]
      }, dispatch);

      if (response.data && response.data.length > 0) {
        const aiMessage = response.data[0];
        dispatch(
          setMessages({
            role: MESSAGE_ROLE.AI,
            response: aiMessage,
          })
        );
      }

      dispatch(setTyping(false));
      dispatch(setStreaming(true));
      dispatch(setSessionLoaded(true));
      
    } catch (error) {
      console.error('Error starting conversation:', error);
      dispatch(setTyping(false));
      dispatch(setError('Failed to start conversation'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetChat());
    };
  }, []);

  useEffect(() => {
    if (sessionLoaded || currentSession) {
      messagesContainerRef.current?.scrollTo(
        0,
        messagesContainerRef.current?.scrollHeight,
        {
          behavior: 'smooth',
        }
      );
    }
  }, [sessionLoaded, chatMessages]);

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
    if (!currentAssistant) {
      dispatch(setError('Assistant not found'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

    if (!input) {
      dispatch(setError('Please enter a message'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

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

    try {
      const response = await sendAssistantMessage({
        assistantGroup: currentAssistant.groupName,
        assistantName: currentAssistant.name,
        userInfo: {
          user_name: userData?.fullName || 'Anonymous',
          user_preference: userData?.role || 'Student',
          user_age: userData?.age || 20
        },
        messages: [...chatMessages, message]
      }, dispatch);

      if (response.data && response.data.length > 0) {
        const aiMessage = response.data[0];
        dispatch(
          setMessages({
            role: MESSAGE_ROLE.AI,
            response: aiMessage,
          })
        );
      }

      dispatch(setTyping(false));
      
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(setTyping(false));
      dispatch(setError('Failed to send message'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
    }
    
    dispatch(setActionType(null));
  };

  const handleQuickReply = async (option) => {
    if (!currentAssistant) {
      dispatch(setError('Assistant not found'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

    dispatch(setInput(option));
    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.TEXT,
      payload: {
        text: option,
        action: actionType,
      },
    };

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );
    dispatch(setTyping(true));

    try {
      const response = await sendAssistantMessage({
        assistantGroup: currentAssistant.groupName,
        assistantName: currentAssistant.name,
        userInfo: {
          user_name: userData?.fullName || 'Anonymous',
          user_preference: userData?.role || 'Student',
          user_age: userData?.age || 20
        },
        messages: [...chatMessages, message]
      }, dispatch);

      if (response.data && response.data.length > 0) {
        const aiMessage = response.data[0];
        dispatch(
          setMessages({
            role: MESSAGE_ROLE.AI,
            response: aiMessage,
          })
        );
      }

      dispatch(setTyping(false));
      
    } catch (error) {
      console.error('Error sending quick reply:', error);
      dispatch(setTyping(false));
      dispatch(setError('Failed to send quick reply'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
    }
    
    dispatch(setActionType(null));
  };

  /* Push Enter */
  const keyDownHandler = async (e) => {
    if (typing || !input || streaming) return;
    if (e.keyCode === 13) handleSendMessage();
  };

  const renderSendIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={handleSendMessage}
          {...styles.bottomChatContent.iconButtonProps(
            typing || error || !input || streaming
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
              disabled={!!error}
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

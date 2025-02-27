import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssistantSession, sendMessage } from '../services/assistants';
import {
  setActiveAssistant,
  addSession,
  updateSession,
  addMessages,
  setHasMore,
  setCurrentPage,
  setLoadingMore,
  setError
} from '../redux/slices/assistantSlice';

const MESSAGES_PER_PAGE = 20;

export const useAssistantChat = (assistantId) => {
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const user = useSelector(state => state.user.userData);
  const session = useSelector(state => 
    state.assistant.sessions[sessionId] || { messages: [], currentPage: 1, hasMore: true }
  );

  // Initialize chat session
  const initializeSession = useCallback(async () => {
    try {
      const session = await createAssistantSession(
        assistantId,
        user?.displayName || 'Anonymous',
        user?.age || null,
        user?.preference || null
      );
      
      const sessionData = {
        id: session.id,
        startTime: new Date().toISOString(),
        messages: [],
        currentPage: 1,
        hasMore: true,
        assistantName: 'CoTeacher',
        assistantAvatar: null // Add avatar URL if available
      };
      
      setSessionId(session.id);
      dispatch(addSession({ sessionId: session.id, data: sessionData }));
      dispatch(setActiveAssistant(assistantId));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }, [assistantId, user, dispatch]);

  // Load more messages
  const loadMoreMessages = useCallback(async () => {
    if (!sessionId || !session.hasMore) return;

    dispatch(setLoadingMore({ sessionId, isLoading: true }));
    try {
      // In a real implementation, you would fetch older messages from the backend
      // For now, we'll simulate pagination with the existing messages
      const nextPage = session.currentPage + 1;
      const olderMessages = []; // This would be fetched from backend
      
      dispatch(addMessages({ 
        sessionId, 
        messages: olderMessages,
        prepend: true 
      }));
      dispatch(setCurrentPage({ sessionId, page: nextPage }));
      dispatch(setHasMore({ 
        sessionId, 
        hasMore: olderMessages.length === MESSAGES_PER_PAGE 
      }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoadingMore({ sessionId, isLoading: false }));
    }
  }, [sessionId, session.hasMore, session.currentPage, dispatch]);

  // Send message and handle streaming response
  const sendChatMessage = useCallback(async (messageText) => {
    if (!sessionId) return;

    setIsTyping(true);
    const newMessage = {
      role: 'human',
      type: 'text',
      timestamp: new Date().toISOString(),
      payload: { text: messageText }
    };

    try {
      dispatch(addMessages({ 
        sessionId, 
        messages: [newMessage]
      }));
      
      const response = await sendMessage(
        assistantId,
        sessionId,
        messageText,
        session.messages
      );

      const assistantMessage = response.data[0];
      dispatch(addMessages({ 
        sessionId, 
        messages: [assistantMessage]
      }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setIsTyping(false);
    }
  }, [assistantId, sessionId, session.messages, dispatch]);

  // Initialize session on mount
  useEffect(() => {
    if (assistantId && !sessionId) {
      initializeSession();
    }
  }, [assistantId, sessionId, initializeSession]);

  return {
    messages: session.messages,
    isTyping,
    sendMessage: sendChatMessage,
    loadMoreMessages,
    hasMore: session.hasMore,
    error: useSelector(state => state.assistant.error),
    sessionId
  };
};

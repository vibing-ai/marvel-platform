import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  CircularProgress,
  Button,
  Typography
} from '@mui/material';
import { useAssistantChat } from '@/libs/hooks/useAssistantChat';
import ChatInterface from '@/templates/Chat/Chat';
import { MESSAGE_ROLE } from '@/libs/constants/bots';

const AssistantChat = () => {
  const router = useRouter();
  const { assistant } = router.query;
  const containerRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const {
    messages,
    isTyping,
    sendMessage,
    error,
    loadMoreMessages,
    hasMore,
    sessionId
  } = useAssistantChat(assistant);

  const session = useSelector(
    (state) => state.assistant.sessions[sessionId] || {}
  );

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      await loadMoreMessages();
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Convert messages to chat interface format
  const formatMessages = (messages) => {
    return messages.map(msg => ({
      id: msg.timestamp,
      content: msg.payload.text,
      role: msg.role === 'ai' ? MESSAGE_ROLE.ASSISTANT : MESSAGE_ROLE.USER,
      timestamp: msg.timestamp,
      status: 'delivered'
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', py: 2 }} ref={containerRef}>
      {/* Load More Button */}
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          variant="outlined"
          startIcon={isLoadingMore && <CircularProgress size={20} />}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </Button>
      </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, px: 2 }}>
          {error}
        </Typography>
      )}

      {/* Reuse existing ChatInterface component */}
      <ChatInterface
        messages={formatMessages(messages)}
        onSendMessage={sendMessage}
        isTyping={isTyping}
        containerRef={containerRef}
        assistant={{
          id: assistant,
          name: session.assistantName || 'AI Assistant',
          avatar: session.assistantAvatar
        }}
      />
    </Container>
  );
};

export default AssistantChat;

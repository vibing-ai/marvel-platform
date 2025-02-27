import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AssistantChat from './AssistantChat';
import { useAssistantChat } from '@/libs/hooks/useAssistantChat';

// Mock the hooks and components
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/libs/hooks/useAssistantChat');

// Mock the Chat component
jest.mock('@/templates/Chat/Chat', () => {
  return function MockChat({ onSendMessage, isTyping, messages }) {
    return (
      <div data-testid="mock-chat">
        <div data-testid="messages">{JSON.stringify(messages)}</div>
        <div data-testid="typing-status">
          {isTyping ? 'Typing...' : 'Not typing'}
        </div>
        <button onClick={() => onSendMessage('test message')}>Send Message</button>
      </div>
    );
  };
});

const mockStore = configureStore([]);

describe('AssistantChat', () => {
  const mockMessages = [
    {
      id: '1',
      timestamp: '2025-02-20T10:00:00Z',
      payload: { text: 'Hello' },
      role: 'user'
    },
    {
      id: '2',
      timestamp: '2025-02-20T10:00:01Z',
      payload: { text: 'Hi there!' },
      role: 'ai'
    }
  ];

  const mockHookReturn = {
    messages: mockMessages,
    isTyping: false,
    sendMessage: jest.fn(),
    loadMoreMessages: jest.fn(),
    hasMore: true,
    error: null,
    sessionId: 'test-session'
  };

  const initialState = {
    assistant: {
      sessions: {
        'test-session': {
          assistantId: 'co_teacher',
          messages: mockMessages,
          hasMore: true,
          currentPage: 1,
          isLoadingMore: false
        }
      },
      activeAssistant: 'co_teacher',
      error: null
    }
  };

  beforeEach(() => {
    useRouter.mockReturnValue({ query: { assistant: 'co_teacher' } });
    useAssistantChat.mockReturnValue(mockHookReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (ui, { store = mockStore(initialState) } = {}) => {
    return render(
      <Provider store={store}>
        {ui}
      </Provider>
    );
  };

  it('renders chat interface with messages', () => {
    renderWithProvider(<AssistantChat />);
    
    const chatInterface = screen.getByTestId('mock-chat');
    expect(chatInterface).toBeInTheDocument();
    
    const messagesElement = screen.getByTestId('messages');
    const parsedMessages = JSON.parse(messagesElement.textContent);
    expect(parsedMessages).toHaveLength(2);
  });

  it('handles sending messages', async () => {
    renderWithProvider(<AssistantChat />);
    
    const sendButton = screen.getByText('Send Message');
    fireEvent.click(sendButton);
    
    expect(mockHookReturn.sendMessage).toHaveBeenCalledWith('test message');
  });

  it('shows typing indicator when AI is responding', () => {
    useAssistantChat.mockReturnValue({
      ...mockHookReturn,
      isTyping: true
    });

    renderWithProvider(<AssistantChat />);
    
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });

  it('loads more messages when scrolling up', async () => {
    renderWithProvider(<AssistantChat />);
    
    // Simulate scroll to top
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    
    await waitFor(() => {
      expect(mockHookReturn.loadMoreMessages).toHaveBeenCalled();
    });
  });

  it('shows error message when present', () => {
    const errorMessage = 'Failed to load messages';
    useAssistantChat.mockReturnValue({
      ...mockHookReturn,
      error: errorMessage
    });

    renderWithProvider(<AssistantChat />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

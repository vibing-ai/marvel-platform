import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { useAssistantChat } from './useAssistantChat';
import { createAssistantSession, sendMessage } from '../services/assistants';

// Mock the assistants service
jest.mock('../services/assistants', () => ({
  createAssistantSession: jest.fn(),
  sendMessage: jest.fn()
}));

const mockStore = configureStore([thunk]);

describe('useAssistantChat', () => {
  const mockAssistantId = 'co_teacher';
  const mockSessionId = 'test-session';
  const mockUser = {
    displayName: 'Test User',
    age: 30,
    preference: 'Teacher'
  };

  const initialState = {
    user: {
      userData: mockUser
    },
    assistant: {
      sessions: {},
      activeAssistant: null,
      loading: false,
      error: null
    }
  };

  beforeEach(() => {
    createAssistantSession.mockResolvedValue({ 
      id: mockSessionId,
      assistantId: mockAssistantId,
      startTime: '2025-02-20T10:00:00Z'
    });
    
    sendMessage.mockResolvedValue({
      messages: [{
        id: '1',
        role: 'ai',
        type: 'text',
        timestamp: '2025-02-20T10:00:00Z',
        payload: { text: 'AI response' }
      }]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes chat session on mount', async () => {
    const store = mockStore(initialState);
    
    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useAssistantChat(mockAssistantId),
      { wrapper }
    );

    // Wait for the session to be created
    await waitForNextUpdate();

    expect(createAssistantSession).toHaveBeenCalledWith(
      mockAssistantId,
      mockUser.displayName,
      mockUser.age,
      mockUser.preference
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'assistant/addSession',
        payload: expect.objectContaining({
          sessionId: mockSessionId
        })
      })
    );
  });

  it('sends messages and handles responses', async () => {
    const stateWithSession = {
      ...initialState,
      assistant: {
        ...initialState.assistant,
        sessions: {
          [mockSessionId]: {
            assistantId: mockAssistantId,
            messages: [],
            hasMore: true,
            currentPage: 1,
            isLoadingMore: false
          }
        },
        activeAssistant: mockAssistantId
      }
    };

    const store = mockStore(stateWithSession);
    
    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useAssistantChat(mockAssistantId),
      { wrapper }
    );

    await act(async () => {
      await result.current.sendMessage('Hello AI');
    });

    expect(sendMessage).toHaveBeenCalledWith(
      mockAssistantId,
      mockSessionId,
      'Hello AI'
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'assistant/addMessages',
        payload: expect.objectContaining({
          sessionId: mockSessionId,
          messages: expect.any(Array)
        })
      })
    );
  });

  it('handles loading more messages', async () => {
    const stateWithSession = {
      ...initialState,
      assistant: {
        ...initialState.assistant,
        sessions: {
          [mockSessionId]: {
            assistantId: mockAssistantId,
            messages: [],
            hasMore: true,
            currentPage: 1,
            isLoadingMore: false
          }
        },
        activeAssistant: mockAssistantId
      }
    };

    const store = mockStore(stateWithSession);
    
    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { result } = renderHook(
      () => useAssistantChat(mockAssistantId),
      { wrapper }
    );

    await act(async () => {
      await result.current.loadMoreMessages();
    });

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'assistant/setLoadingMore',
        payload: expect.objectContaining({
          sessionId: mockSessionId,
          isLoading: true
        })
      })
    );
  });

  it('handles errors during session creation', async () => {
    const error = new Error('Failed to create session');
    createAssistantSession.mockRejectedValue(error);

    const store = mockStore(initialState);
    
    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { waitForNextUpdate } = renderHook(
      () => useAssistantChat(mockAssistantId),
      { wrapper }
    );

    await waitForNextUpdate();

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'assistant/setError',
        payload: error.message
      })
    );
  });

  it('handles errors during message sending', async () => {
    const error = new Error('Failed to send message');
    sendMessage.mockRejectedValue(error);

    const stateWithSession = {
      ...initialState,
      assistant: {
        ...initialState.assistant,
        sessions: {
          [mockSessionId]: {
            assistantId: mockAssistantId,
            messages: [],
            hasMore: true,
            currentPage: 1,
            isLoadingMore: false
          }
        },
        activeAssistant: mockAssistantId
      }
    };

    const store = mockStore(stateWithSession);
    
    const wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    const { result } = renderHook(
      () => useAssistantChat(mockAssistantId),
      { wrapper }
    );

    await act(async () => {
      await result.current.sendMessage('Hello AI');
    });

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'assistant/setError',
        payload: error.message
      })
    );
  });
});

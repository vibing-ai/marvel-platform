import assistantReducer, {
  setAssistants,
  setActiveAssistant,
  addSession,
  updateSession,
  addMessages,
  setHasMore,
  setCurrentPage,
  setLoadingMore,
  setLoading,
  setError,
  resetState
} from './assistantSlice';

describe('assistantSlice', () => {
  const initialState = {
    assistants: [],
    activeAssistant: null,
    sessions: {},
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      hasMore: true,
      messagesPerPage: 20,
      isLoadingMore: false
    }
  };

  it('should handle initial state', () => {
    expect(assistantReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAssistants', () => {
    const assistants = [
      { id: 'co_teacher', name: 'CoTeacher' }
    ];
    const actual = assistantReducer(initialState, setAssistants(assistants));
    expect(actual.assistants).toEqual(assistants);
    expect(actual.loading).toBeFalsy();
  });

  it('should handle setActiveAssistant', () => {
    const assistantId = 'co_teacher';
    const actual = assistantReducer(initialState, setActiveAssistant(assistantId));
    expect(actual.activeAssistant).toEqual(assistantId);
  });

  it('should handle addSession', () => {
    const sessionData = {
      sessionId: 'test-session',
      data: {
        assistantId: 'co_teacher',
        startTime: '2025-02-20T10:00:00Z'
      }
    };
    const actual = assistantReducer(initialState, addSession(sessionData));
    expect(actual.sessions[sessionData.sessionId]).toEqual({
      ...sessionData.data,
      messages: [],
      hasMore: true,
      currentPage: 1,
      isLoadingMore: false
    });
  });

  it('should handle updateSession', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          assistantId: 'co_teacher',
          messages: [],
          hasMore: true,
          currentPage: 1
        }
      }
    };
    const updateData = {
      sessionId: 'test-session',
      data: {
        lastActivity: '2025-02-20T11:00:00Z'
      }
    };
    const actual = assistantReducer(initialStateWithSession, updateSession(updateData));
    expect(actual.sessions[updateData.sessionId]).toEqual({
      assistantId: 'co_teacher',
      messages: [],
      hasMore: true,
      currentPage: 1,
      lastActivity: '2025-02-20T11:00:00Z'
    });
  });

  it('should handle addMessages', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          messages: [{ id: '1', text: 'Hello' }],
          hasMore: true,
          currentPage: 1
        }
      }
    };
    const newMessages = [{ id: '2', text: 'Hi there!' }];
    const actual = assistantReducer(
      initialStateWithSession,
      addMessages({
        sessionId: 'test-session',
        messages: newMessages
      })
    );
    expect(actual.sessions['test-session'].messages).toHaveLength(2);
    expect(actual.sessions['test-session'].messages[1]).toEqual(newMessages[0]);
  });

  it('should handle prepending messages', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          messages: [{ id: '2', text: 'Hi there!' }],
          hasMore: true,
          currentPage: 1
        }
      }
    };
    const oldMessages = [{ id: '1', text: 'Hello' }];
    const actual = assistantReducer(
      initialStateWithSession,
      addMessages({
        sessionId: 'test-session',
        messages: oldMessages,
        prepend: true
      })
    );
    expect(actual.sessions['test-session'].messages).toHaveLength(2);
    expect(actual.sessions['test-session'].messages[0]).toEqual(oldMessages[0]);
  });

  it('should handle setHasMore', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          messages: [],
          hasMore: true,
          currentPage: 1
        }
      }
    };
    const actual = assistantReducer(
      initialStateWithSession,
      setHasMore({
        sessionId: 'test-session',
        hasMore: false
      })
    );
    expect(actual.sessions['test-session'].hasMore).toBeFalsy();
  });

  it('should handle setCurrentPage', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          messages: [],
          hasMore: true,
          currentPage: 1
        }
      }
    };
    const actual = assistantReducer(
      initialStateWithSession,
      setCurrentPage({
        sessionId: 'test-session',
        page: 2
      })
    );
    expect(actual.sessions['test-session'].currentPage).toBe(2);
  });

  it('should handle setLoadingMore', () => {
    const initialStateWithSession = {
      ...initialState,
      sessions: {
        'test-session': {
          messages: [],
          hasMore: true,
          currentPage: 1,
          isLoadingMore: false
        }
      }
    };
    const actual = assistantReducer(
      initialStateWithSession,
      setLoadingMore({
        sessionId: 'test-session',
        isLoading: true
      })
    );
    expect(actual.sessions['test-session'].isLoadingMore).toBeTruthy();
  });

  it('should handle setLoading', () => {
    const actual = assistantReducer(initialState, setLoading(true));
    expect(actual.loading).toBeTruthy();
  });

  it('should handle setError', () => {
    const error = 'Test error message';
    const actual = assistantReducer(initialState, setError(error));
    expect(actual.error).toEqual(error);
    expect(actual.loading).toBeFalsy();
  });

  it('should handle resetState', () => {
    const modifiedState = {
      ...initialState,
      assistants: [{ id: 'co_teacher' }],
      activeAssistant: 'co_teacher',
      error: 'Some error'
    };
    const actual = assistantReducer(modifiedState, resetState());
    expect(actual).toEqual(initialState);
  });
});

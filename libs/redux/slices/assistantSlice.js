import { createSlice } from '@reduxjs/toolkit';

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

const assistantSlice = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    setAssistants: (state, action) => {
      state.assistants = action.payload;
    },
    setActiveAssistant: (state, action) => {
      state.activeAssistant = action.payload;
    },
    addSession: (state, action) => {
      const { sessionId, data } = action.payload;
      state.sessions[sessionId] = {
        ...data,
        messages: [],
        hasMore: true,
        currentPage: 1
      };
    },
    updateSession: (state, action) => {
      const { sessionId, data } = action.payload;
      state.sessions[sessionId] = {
        ...state.sessions[sessionId],
        ...data
      };
    },
    addMessages: (state, action) => {
      const { sessionId, messages, prepend = false } = action.payload;
      if (!state.sessions[sessionId]) return;
      
      if (prepend) {
        state.sessions[sessionId].messages = [
          ...messages,
          ...state.sessions[sessionId].messages
        ];
      } else {
        state.sessions[sessionId].messages = [
          ...state.sessions[sessionId].messages,
          ...messages
        ];
      }
    },
    setHasMore: (state, action) => {
      const { sessionId, hasMore } = action.payload;
      if (state.sessions[sessionId]) {
        state.sessions[sessionId].hasMore = hasMore;
      }
    },
    setCurrentPage: (state, action) => {
      const { sessionId, page } = action.payload;
      if (state.sessions[sessionId]) {
        state.sessions[sessionId].currentPage = page;
      }
    },
    setLoadingMore: (state, action) => {
      const { sessionId, isLoading } = action.payload;
      if (state.sessions[sessionId]) {
        state.sessions[sessionId].isLoadingMore = isLoading;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetState: () => initialState
  }
});

export const {
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
} = assistantSlice.actions;

export default assistantSlice.reducer;

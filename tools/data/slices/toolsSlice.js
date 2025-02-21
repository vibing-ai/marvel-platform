import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '@/libs/redux/thunks/tools';

const toolsState = {
  data: null,
  loading: true,
  error: null,
};

const communicator = {
  prompt: null,
  response: null,
  sessionId: null,
  editorState: {
    /*
      {
        "content": string
        "timestamp": timestamp,
        "type": "initial" | "auto-save" | "manual-save" | "restore"
      }
    */
    currentState: {
      content: null,
      timestamp: null,
      type: null,
    },
    editHistory: [], // Contains all changes including current
    undoStack: [],
    redoStack: [],
  },
  communicatorLoading: false,
  formOpen: true,
  popoutOpen: false,
};

const initialState = {
  ...toolsState,
  ...communicator,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCommunicator: (state) => ({ ...state, ...communicator }),
    setCommunicatorLoading: (state, action) => {
      state.communicatorLoading = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setFormOpen: (state, action) => {
      state.formOpen = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setTopic: (state, action) => {
      state.topic = action.payload;
    },
    addStateToEditHistory: (state, action) => {
      if (!state.editorState.currentState.content) {
        state.editorState.currentState = action.payload;
        state.editorState.editHistory = [action.payload];
        return;
      }

      if (action.payload.content === state.editorState.currentState.content) {
        return;
      }

      state.editorState.redoStack = [];
      state.editorState.undoStack.push(state.editorState.currentState);
      state.editorState.currentState = action.payload;

      // Update editHistory with all states
      state.editorState.editHistory = [
        ...state.editorState.undoStack,
        state.editorState.currentState,
      ].slice(-15);
    },
    undo: (state) => {
      if (state.editorState.undoStack.length > 0) {
        state.editorState.redoStack.push(state.editorState.currentState);
        state.editorState.currentState = state.editorState.undoStack.pop();
      }
    },
    redo: (state) => {
      if (state.editorState.redoStack.length > 0) {
        state.editorState.undoStack.push(state.editorState.currentState);
        state.editorState.currentState = state.editorState.redoStack.pop();
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPopoutOpen: (state, action) => {
      state.popoutOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTools.rejected, (state) => {
        state.error = 'Could not get tools';
        state.loading = false;
      });
  },
});

export default tools;

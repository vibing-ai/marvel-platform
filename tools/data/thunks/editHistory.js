// tools/data/thunks/editHistory.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';

import { firestore } from '@/libs/redux/store';

export const syncHistoryEntry = createAsyncThunk(
  'tools/syncHistoryEntry',
  async (historyEntry, { getState, rejectWithValue }) => {
    try {
      const { sessionId, editorState: { editHistory } } = getState().tools;
      if (!sessionId) throw new Error('Session ID is not available');

      const sessionRef = doc(firestore, 'toolSessions', sessionId);
      await updateDoc(sessionRef, {
        currentState: historyEntry,
        editHistory: editHistory.slice(-15),
        lastEditedAt: Timestamp.fromMillis(Date.now()),
      });

      return historyEntry;
    } catch (error) {
      throw rejectWithValue(error?.message || 'Unable to sync history with Firestore');
    }
  }
);

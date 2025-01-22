import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebaseSetup';

export const fetchAssistants = createAsyncThunk(
  'assistants/fetchAssistants',
  async () => {
    try {
      console.log('Fetching assistants...');
      const assistantsRef = collection(firestore, 'assistants');
      const assistantsSnapshot = await getDocs(assistantsRef);
      console.log('Assistants snapshot:', assistantsSnapshot.size);
      const assistants = assistantsSnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Assistant data:', { id: doc.id, ...data });
        return {
          id: doc.id,
          ...data
        };
      });
      console.log('Processed assistants:', assistants);
      return assistants;
    } catch (error) {
      console.error('Error fetching assistants:', error);
      throw error;
    }
  }
);

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Fetching assistants - pending');
      })
      .addCase(fetchAssistants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('Fetching assistants - fulfilled:', action.payload);
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('Fetching assistants - rejected:', action.error.message);
      });
  },
});

export default assistantsSlice.reducer;

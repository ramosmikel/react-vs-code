import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShowArgs } from './types';
import { RootState } from '@/lib/types';

const initialState: RootState['uiState'] = {
  isShown: false,
  uiStateName: null,
};

const slice = createSlice({
  name: 'uiStateReducer',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<ShowArgs>) => {
      state = { ...action.payload, isShown: true };
      return state;
    },
    hide: () => initialState,
  },
});

export default slice.reducer;
export const { show, hide } = slice.actions;

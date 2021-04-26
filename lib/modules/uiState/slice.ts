import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createFile, renameFile } from '../sharedActions';
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
  extraReducers: builder => {
    builder.addCase(createFile, state => {
      if (state.isShown && state.uiStateName === 'CREATE_FILE_INPUT') {
        return initialState;
      }
    });
    builder.addCase(renameFile, state => {
      if (state.isShown && state.uiStateName === 'RENAME_FILE_INPUT') {
        return initialState;
      }
    });
  },
});

export default slice.reducer;
export const { show, hide } = slice.actions;

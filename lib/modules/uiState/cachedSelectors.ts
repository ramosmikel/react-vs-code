import { createSelector } from 'reselect';
import { RootState, UIState } from '@/lib/types';

const getUiStateHandler = (state: RootState) => state.uiState;
const getCreateFileInputStateHandler = ({uiState}: RootState): UIState => {
  if (uiState.uiStateName === 'CREATE_FILE_INPUT') {
    return uiState;
  }
  return { uiStateName: 'CREATE_FILE_INPUT', isShown: false };
};
const getRenameFileInputStateHandler = ({ uiState }: RootState): UIState => {
  if (uiState.uiStateName === 'RENAME_FILE_INPUT') {
    return uiState;
  }
  return { uiStateName: 'RENAME_FILE_INPUT', isShown: false };
};

export const getCreateFileInputState = createSelector(
  [getCreateFileInputStateHandler],
  state => state
);
export const getRenameFileInputState = createSelector(
  [getRenameFileInputStateHandler],
  state => state
);
export const getUiState = createSelector([getUiStateHandler], state => state);

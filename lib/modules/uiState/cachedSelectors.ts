import { createSelector } from 'reselect';
import { RootState } from '@/lib/types';

const getUiStateHandler = ({ uiState }: RootState) => uiState;

export const getUiState = createSelector([getUiStateHandler], state => state);

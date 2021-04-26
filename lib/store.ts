import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import editorFiles from '@/lib/modules/editorFiles/slice';
import { RootState } from './types';

const persistConfig = {
  key: 'ReactVSCode',
  storage,
  whitelist: ['editorFiles'],
};

const persistentReducer = persistReducer(
  persistConfig,
  combineReducers({
    editorFiles,
  })
);

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: persistentReducer,
  middleware,
});

persistStore(store);

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

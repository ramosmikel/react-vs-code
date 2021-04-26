import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createFile, deleteFile, renameFile, saveFile, switchTab } from '../sharedActions';
import { CloseTabArgs, EditTabArgs } from './types';
import { Tabs } from '@/lib/types';

const initialState: Tabs = {
  activeTab: { index: -1 },
  tabs: [], 
};

export const slice = createSlice({
  name: 'openTabs',
  initialState,
  reducers: {
    closeTab: (state, action: PayloadAction<CloseTabArgs>) => {
      state.tabs = state.tabs.filter(file => file.fileName !== action.payload.fileName);

      if (!state.tabs?.length) {
        state.activeTab = { index: -1 };
        return state;
      }

      state.activeTab = {
        fileName: state.tabs[state.tabs.length - 1].fileName,
        index: state.tabs.length - 1,
      };

      return state;
    },
    editTab: (state, action: PayloadAction<EditTabArgs>) => {
      const tabIndex = state.activeTab.index;
      state.tabs[tabIndex].isUnsaved = !!action?.payload?.isUnsaved;

      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(switchTab, (state, action) => {
      if (state.activeTab.index === -1) {
        state.tabs.push({ fileName: action.payload.fileName, isUnsaved: false });
        state.activeTab.index = 0;
        state.activeTab.fileName = action.payload.fileName;

        return state;
      }

      const tabIndex = state.tabs.findIndex(tab => tab.fileName === action.payload.fileName);

      if (tabIndex < 0) {
        state.tabs.push({ fileName: action.payload.fileName, isUnsaved: false });
        state.activeTab.index = state.tabs.length - 1;
        state.activeTab.fileName = action.payload.fileName;

        return state;
      }

      state.activeTab.index = tabIndex;
      state.activeTab.fileName = action.payload.fileName;

      return state;
    });
    builder.addCase(saveFile, state => {
      state.tabs[state.activeTab.index].isUnsaved = false;
      return state;
    });
    builder.addCase(renameFile, (state, action) => {
      const tabIndex = state.tabs.findIndex(tab => tab.fileName === action.payload.fileName);

      if (tabIndex < 0) {
        return state;
      }

      state.tabs[tabIndex].fileName = action.payload.edits.fileName;

      if (state.activeTab.fileName === action.payload.fileName) {
        state.activeTab.fileName = action.payload.edits.fileName;
      }

      return state;
    });
    builder.addCase(createFile, (state, action) => {
      const { fileName } = action.payload;

      state.tabs.push({ fileName, isUnsaved: false });
      state.activeTab.fileName = fileName;
      state.activeTab.index = state.tabs.length - 1;

      return;
    });
    builder.addCase(deleteFile, (state, action) => {
      state.tabs = state.tabs.filter(file => file.fileName !== action.payload.fileName);

      if (!state.tabs?.length) {
        state.activeTab = { index: -1 };

        return state;
      }

      if (state.activeTab.fileName === action.payload.fileName) {
        state.activeTab = {
          fileName: state.tabs[state.tabs.length - 1].fileName,
          index: state.tabs.length - 1,
        };
      }

      return state;
    });
  },
});

export default slice.reducer;
export const { editTab, closeTab } = slice.actions;

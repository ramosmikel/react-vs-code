import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwitchTabArgs, CloseTabArgs, EditTabArgs } from './types';
import { Tabs } from '@/lib/types';

const initialState: Tabs = {
  activeTab: { index: -1 },
  tabs: [],
};

export const slice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<SwitchTabArgs>) => {
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
    },
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
});

export default slice.reducer;
export const { editTab, closeTab } = slice.actions;

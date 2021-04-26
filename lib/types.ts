export interface RootState {
  editorFiles: EditorFile[];
  openTabs: Tabs;
  uiState: UIState;
}

export interface EditorFile {
  fileName: string;
  value: string;
}

export interface Tabs {
  activeTab: ActiveTab;
  tabs: Tab[];
}

export interface Tab {
  fileName: string;
  isUnsaved: boolean;
}

export interface ActiveTab {
  index: number;
  fileName?: string;
}

export type UIState = {
  isShown: boolean;
  uiStateName: UIStateNames;
  extras?: UIStateExtras;
};

export type UIStateNames = 'CREATE_FILE_INPUT' | 'RENAME_FILE_INPUT';

export interface UIStateExtras {
  location?: string;
  message?: string;
  warningType?: WarningType;
}

export type WarningType = 'HIGH' | 'MEDIUM' | 'LOW';

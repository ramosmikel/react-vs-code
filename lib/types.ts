export interface RootState {
  editorFiles: EditorFile[];
  openTabs: Tabs;
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

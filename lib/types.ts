export interface RootState {
  editorFiles: EditorFile[];
}

export interface EditorFile {
  fileName: string;
  value: string;
}

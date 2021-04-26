import { createSelector } from 'reselect';
import { RootState } from '@/lib/types';

const getEditorFilesHandler = ({ editorFiles }: RootState) => editorFiles;
const getEditorFileHandler = (state: RootState) => {
  const { editorFiles, openTabs } = state;
  const fileIndex = editorFiles.findIndex(file => file.fileName === openTabs.activeTab.fileName);
  return editorFiles[fileIndex];
};

export const getEditorFiles = createSelector([getEditorFilesHandler], state => state);
export const getEditorFile = createSelector([getEditorFileHandler], state => state);

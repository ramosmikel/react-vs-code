import { createSelector } from 'reselect';
import { RootState } from '@/lib/types';

const getEditorFilesHandler = ({ editorFiles }: RootState) => editorFiles;

export const getEditorFiles = createSelector([getEditorFilesHandler], state => state);

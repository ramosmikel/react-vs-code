import { createAction } from '@reduxjs/toolkit';
import {
  CreateFileArgs,
  SwitchTabArgs,
  SaveFileArgs,
  DeleteFileArgs,
  RenameFileArgs,
} from './types';

export const switchTab = createAction<SwitchTabArgs>('switchTab');
export const createFile = createAction<CreateFileArgs>('createFile');
export const saveFile = createAction<SaveFileArgs>('saveFile');
export const renameFile = createAction<RenameFileArgs>('renameFile');
export const deleteFile = createAction<DeleteFileArgs>('deleteFile');

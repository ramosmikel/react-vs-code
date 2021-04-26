import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateFileArgs, SaveFileArgs, RenameFileArgs, DeleteFileArgs } from './types';
import { RootState } from '@/lib/types';

const initialState: RootState['editorFiles'] = [
  {
    fileName: 'example.js',
    value: `const TEST = true;\n if (TEST) {\n console.log(TEST)\n \n}`,
  },
];

export const slice = createSlice({
  name: 'editorFiles',
  initialState,
  reducers: {
    createFile: (state, action: PayloadAction<CreateFileArgs>) => {
      const { fileName, value } = action.payload;
      state.push({
        fileName,
        value: value ?? '',
      });

      return state;
    },
    saveFile: (state, action: PayloadAction<SaveFileArgs>) => {
      const fileIndex = state.findIndex(file => file.fileName === action.payload.fileName);
      state[fileIndex].value = action.payload.value;
      return state;
    },
    renameFile: (state, action: PayloadAction<RenameFileArgs>) => {
      const fileIndex = state.findIndex(file => file.fileName === action.payload.fileName);
      state[fileIndex].fileName = action.payload.edits.fileName;
      return state;
    },
    deleteFile: (state, action: PayloadAction<DeleteFileArgs>) => {
      state = state.filter(file => file.fileName !== action.payload.fileName);
      return state;
    },
  },
});

export default slice.reducer;
export const { createFile, saveFile, renameFile, deleteFile } = slice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { createFile, deleteFile, renameFile, saveFile } from '../sharedActions';
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createFile, (state, action) => {
      const { fileName, value } = action.payload;
      state.push({
        fileName,
        value: value ?? '',
      });

      return state;
    });
    builder.addCase(saveFile, (state, action) => {
      const fileIndex = state.findIndex(file => file.fileName === action.payload.fileName);
      state[fileIndex].value = action.payload.value;
      return state;
    });
    builder.addCase(renameFile, (state, action) => {
      const fileIndex = state.findIndex(file => file.fileName === action.payload.fileName);

      state[fileIndex].fileName = action.payload.edits.fileName;

      return state;
    });
    builder.addCase(deleteFile, (state, action) => {
      state = state.filter(file => file.fileName !== action.payload.fileName);
      return state;
    });
  },
});

export default slice.reducer;

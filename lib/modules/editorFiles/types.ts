import { EditorFile } from '../../types';

export interface CreateFileArgs {
  fileName: string;
  value?: string;
}

export interface SaveFileArgs {
  value: string;
  fileName: string;
}

export interface DeleteFileArgs {
  fileName: string;
}

export interface RenameFileArgs {
  edits: Partial<EditorFile>;
  fileName: string;
}

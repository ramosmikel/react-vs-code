import { EditorFile } from '../types';

const submitFiles = (files: EditorFile[]) => {
  console.log(JSON.stringify(files));
};

export default submitFiles;

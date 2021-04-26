import { useDispatch } from 'react-redux';
import { createFile, saveFile, deleteFile, renameFile } from '@/lib/modules/sharedActions';
import { EditorFile } from '@/lib/types';

type Actions = 'DELETE_FILE' | 'CREATE_FILE' | 'SAVE_FILE' | 'RENAME_FILE';

const useEditorFiles = () => {
  const dispatch = useDispatch();

  return (
    action: Actions,
    { fileName, value }: Partial<EditorFile>,
    edits?: Partial<EditorFile>
  ) => {
    switch (action) {
      case 'SAVE_FILE': {
        dispatch(saveFile({ fileName, value }));
        break;
      }
      case 'RENAME_FILE': {
        dispatch(renameFile({ fileName, edits }));
        break;
      }
      case 'CREATE_FILE': {
        dispatch(createFile({ fileName }));
        break;
      }
      case 'DELETE_FILE': {
        dispatch(deleteFile({ fileName }));
      }
    }
  };
};

export default useEditorFiles;

import { EditorFile, WarningType } from '../types';

interface InputWarning {
  isInvalid: boolean;
  message?: string;
  warningType?: WarningType;
}

const validateFileName = (fileName: string, files: EditorFile[]): InputWarning => {
  if (!fileName || fileName === '.') {
    return {
      isInvalid: true,
      message: `A file name must be provided.`,
      warningType: 'HIGH',
    };
  }

  const index = files.findIndex(file => file.fileName === fileName);

  if (index >= 0) {
    return {
      isInvalid: true,
      message: `A file ${fileName} already exists at this location. Please choose a different name.`,
      warningType: 'HIGH',
    };
  }

  if (fileName.trim() !== fileName) {
    return {
      isInvalid: true,
      message: `Leading or trailing whitespace detected in file name.`,
      warningType: 'MEDIUM',
    };
  }

  return { isInvalid: false };
};

export default validateFileName;

export interface CloseTabArgs {
  fileName: string;
}

export interface EditTabArgs {
  fileName: string;
  isUnsaved?: boolean;
}

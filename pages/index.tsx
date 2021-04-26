import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { useUiState, useEditorFiles, useTabs } from '@/lib/hooks';
import {
  CreateFileInput,
  RenameFileInput,
  Sidebar,
  SidebarItem,
  TabList,
  TabItem,
} from '@/components/index';
import { getEditorFile, getEditorFiles, getUiState, getOpenTabs } from '@/lib/modules';
import { RootState } from '@/lib/types';
import { validateFileName, theme, submitFiles } from '@/lib/utils';
import s from '@/styles/Home.module.css';

type Props = ConnectedProps<typeof connector>;

const Home = ({ currentFile, files, openTabs, uiState }: Props) => {
  const editorFilesHook = useEditorFiles();
  const tabsHook = useTabs();
  const uiStateHook = useUiState();
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const handleEditorBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('monokai', theme.editor.monokai);
  };
  const handleHideState = () => uiStateHook('HIDE');

  const handleOnSwitchTab = (fileName: string) => {
    if (fileName === openTabs.activeTab.fileName) {
      return;
    }

    tabsHook('SWITCH_TAB', { fileName });
  };
  const handleOnCloseTab = (fileName: string) => tabsHook('CLOSE_TAB', { fileName });

  const handleOnSubmitCreate = (fileName: string) => {
    const validate = validateFileName(fileName, files);
    if (validate.isInvalid && validate.warningType === 'HIGH') {
      return;
    }

    editorFilesHook('CREATE_FILE', { fileName });
  };
  const handleOnChangeCreate = (fileName: string) => {
    const { isInvalid, message, warningType } = validateFileName(fileName, files);
    const { extras } = uiState;

    if (!isInvalid) {
      if (!extras) {
        return;
      }

      uiStateHook('SHOW', 'CREATE_FILE_INPUT');
      return;
    }

    uiStateHook('SHOW', 'CREATE_FILE_INPUT', {
      message,
      warningType,
    });
  };

  const handleOnClickRename = (fileName: string) => {
    uiStateHook('SHOW', 'RENAME_FILE_INPUT', { location: fileName });
  };
  const handleOnChangeRename = (fileName: string, initialValue: string) => {
    if (fileName === initialValue) {
      uiStateHook('SHOW', 'RENAME_FILE_INPUT', {
        location: initialValue,
      });
      return;
    }

    const { isInvalid, message, warningType } = validateFileName(fileName, files);
    const { extras } = uiState;

    if (!isInvalid) {
      if (!extras) {
        return;
      }

      uiStateHook('SHOW', 'RENAME_FILE_INPUT', { location: initialValue });
      return;
    }

    uiStateHook('SHOW', 'RENAME_FILE_INPUT', {
      location: initialValue,
      message,
      warningType,
    });
  };
  const handleOnSubmitRename = (fileName: string, initialValue: string) => {
    if (fileName === initialValue) {
      uiStateHook('HIDE');
      return;
    }

    const validate = validateFileName(fileName, files);
    if (validate.isInvalid && validate.warningType === 'HIGH') {
      return;
    }

    editorFilesHook('RENAME_FILE', { fileName: initialValue }, { fileName });
  };

  const handleOnChangeFile = (value: string) => {
    const isUnsaved = currentFile.value !== value;

    if (openTabs.tabs[openTabs.activeTab.index].isUnsaved !== isUnsaved) {
      tabsHook('EDIT_TAB', { fileName: openTabs.activeTab.fileName, isUnsaved: isUnsaved });
    }
  };

  const handleOnSaveFile = () => {
    if (!editorRef.current) {
      return;
    }

    editorFilesHook('SAVE_FILE', {
      value: editorRef.current.getValue(),
      fileName: openTabs.activeTab.fileName,
    });
  };

  const handleOnDelete = (fileName: string) => editorFilesHook('DELETE_FILE', { fileName });

  const handleSubmitFiles = () => submitFiles(files);

  const isTabAvailable = openTabs.activeTab.index !== -1;
  const { isShown, uiStateName, extras } = uiState;
  const isRenameInput = uiStateName === 'RENAME_FILE_INPUT';
  const isCreateInput = uiStateName === 'CREATE_FILE_INPUT';

  return (
    <>
      <div className={s.Root}>
        <div className={s.SidebarContainer}>
          <Sidebar>
            {files.map(file => {
              const { fileName } = file;
              const isActive = isShown && isRenameInput && extras.location === fileName;

              return isActive ? (
                <div key={fileName} className={s.FileInputs}>
                  <RenameFileInput
                    initialValue={fileName}
                    onSubmitValue={handleOnSubmitRename}
                    onFocusOut={handleHideState}
                    onValueChange={handleOnChangeRename}
                  />
                </div>
              ) : (
                <div key={fileName}>
                  <SidebarItem
                    key={fileName}
                    fileName={fileName}
                    isSelected={fileName === openTabs.activeTab.fileName}
                    onItemClick={handleOnSwitchTab}
                    onDeleteClick={handleOnDelete}
                    onDoubleClick={handleOnClickRename}
                  />
                </div>
              );
            })}
            {isShown && isCreateInput && (
              <div className={s.FileInputs}>
                <CreateFileInput
                  onSubmitValue={handleOnSubmitCreate}
                  onFocusOut={handleHideState}
                  onValueChange={handleOnChangeCreate}
                />
              </div>
            )}
          </Sidebar>
        </div>

        {isTabAvailable ? (
          <div className={s.TabListContainer}>
            <TabList>
              {openTabs.tabs.map(tab => {
                const { fileName, isUnsaved } = tab;
                const isSelected = fileName === currentFile?.fileName;

                return (
                  <TabItem
                    key={fileName}
                    fileName={fileName}
                    isSelected={isSelected}
                    isUnsaved={isUnsaved}
                    onClickTab={handleOnSwitchTab}
                    onCloseTab={handleOnCloseTab}
                  />
                );
              })}
            </TabList>
            <Editor
              height="100%"
              theme="monokai"
              path={currentFile.fileName}
              onChange={handleOnChangeFile}
              defaultValue={currentFile.value}
              beforeMount={handleEditorBeforeMount}
              onMount={handleEditorDidMount}
            />
          </div>
        ) : (
          <div className={s.DefaultScreen} />
        )}
        <div className={s.UtilityButtonsContainer}>
          {isTabAvailable && openTabs.tabs[openTabs.activeTab.index]?.isUnsaved && (
            <button onClick={handleOnSaveFile} className={s.UtilityButton}>
              <div>
                <img src="./icons/save.svg" height={40} width={40} />
              </div>
            </button>
          )}
          <button onClick={handleSubmitFiles} className={s.UtilityButton}>
            <div>
              <img src="./icons/export.svg" height={40} width={40} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentFile: getEditorFile(state),
  uiState: getUiState(state),
  files: getEditorFiles(state),
  openTabs: getOpenTabs(state),
});

const connector = connect(mapStateToProps);

export default connector(Home);

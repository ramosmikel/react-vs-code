import React, { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { theme } from '@/lib/utils';
import s from '@/styles/Home.module.css';

const Home = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const handleEditorBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('monokai', theme.editor.monokai);
  };

  return (
    <>
      <div className={s.root}>
        <Editor
          height="100%"
          theme="monokai"
          beforeMount={handleEditorBeforeMount}
          onMount={handleEditorDidMount}
        />
      </div>
    </>
  );
};

export default Home;

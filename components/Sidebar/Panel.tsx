import React, { PropsWithChildren, useState } from 'react';
import cn from 'classnames';
import { useUiState } from '@/lib/hooks';
import s from './styles/Panel.module.css';

const Panel = ({ children }: PropsWithChildren<{}>) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const uiState = useUiState();

  const handlePanelStatus = () => setIsPanelOpen(prev => !prev);
  const handleFileInputShow = () => uiState('SHOW', 'CREATE_FILE_INPUT');

  return (
    <div className={s.Root}>
      <div className={s.QuickAccessPanelContainer}>
        <div
          className={cn(s.QuickAccessPanel, isPanelOpen ? 'border-white' : 'border-transparent')}
        >
          <button type="button" aria-label="Open Files Sidebar" onClick={handlePanelStatus}>
            <img src="./icons/files.svg" alt="Files Icon" height="25" width="25" className={s.QuickAccessIcon} />
          </button>
        </div>
      </div>

      {isPanelOpen && (
        <div className={s.PanelContainer}>
          <div>
            <div className={s.ExplorerContainer}>
              <span>EXPLORER</span>
              <span>...</span>
            </div>
            <div className={s.AddFileButtonContainer}>
              <button type="button" onClick={handleFileInputShow}>
                <img src="./icons/add-file.svg" alt="Add File Icon"  height="15" width="15" />
              </button>
            </div>
          </div>
          <div className={s.SidebarItems}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Panel;

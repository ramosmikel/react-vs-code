import React, { FC, useState } from 'react';
import cn from 'classnames';
import s from './styles/Item.module.css';

interface Props {
  fileName: string;
  isSelected: boolean;
  isUnsaved: boolean;
  onClickTab: (fileName: string) => void;
  onCloseTab: (fileName: string) => void;
}

const Tab: FC<Props> = ({ fileName, onClickTab, onCloseTab, isSelected, isUnsaved, ...rest }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleOnClick = () => onClickTab(fileName);
  const handleOnCloseTab = () => onCloseTab(fileName);
  const handleOnMouseEnter = () => setIsHovered(true);
  const handleOnMouseExit = () => setIsHovered(false);

  return (
    <div className={cn(s.Root, isSelected ? 'border-yellow-300' : 'border-transparent')}>
      <button onClick={handleOnClick} {...rest}>
        <span>
          {fileName}
        </span>
      </button>
      <div className={s.StatusIconContainer} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseExit}>
        {isUnsaved && !isHovered ? (
          <div className={s.UnSavedIconContainer}>
            <div className={s.UnSavedIcon} />
          </div>
        ) : (
          <button onClick={handleOnCloseTab}>
            <div className={s.CancelIconContainer} >
              <img src="./icons/cancel.svg" height="15" width="15" className={s.CancelIcon} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Tab;

import React from 'react';
import cn from 'classnames';
import s from './styles/Item.module.css';

interface Props {
  onItemClick: (fileName: string) => void;
  onDeleteClick: (fileName: string) => void;
  onDoubleClick: (fileName: string) => void;
  isSelected: boolean;
  fileName: string;
}

const Item = ({ onItemClick, onDeleteClick, onDoubleClick, isSelected, fileName }: Props) => {
  const handleOnItemClick = () => onItemClick(fileName);
  const handleOnDeleteClick = () => onDeleteClick(fileName);
  const handleDoubleClick = () => onDoubleClick(fileName);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(s.Root, isSelected ? 'bg-gray-light text-yellow-600' : 'text-white opacity-40')}
    >
      <button type="button" onClick={handleOnDeleteClick}>
        <div className={s.CancelIconContainer}>
          <img src="./icons/cancel.svg" alt="Cancel Icon" height="12" width="12" />
        </div>
      </button>
      <button type="button" onClick={handleOnItemClick}>
        <div className={s.FileNameContainer}>
          <span>{fileName}</span>
        </div>
      </button>
    </div>
  );
};

export default Item;

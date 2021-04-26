import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useClickAway } from 'react-use';
import cn from 'classnames';
import { getRenameFileInputState } from '@/lib/modules';
import { RootState } from '@/lib/types';
import s from './styles/Input.module.css';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  onSubmitValue: (name: string, initialValue: string) => void;
  onValueChange?: (value: string, initialValue: string) => void;
  initialValue?: string;
  onFocusOut: () => void;
}

const WARNING_COLORS = {
  HIGH: 'border-red-600 text-red-600',
  MEDIUM: 'border-yellow-600 text-yellow-600',
};

const RenameFileInput = ({
  onSubmitValue,
  onValueChange,
  initialValue,
  onFocusOut,
  inputState,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useClickAway(inputRef, () => onFocusOut());

  const message = inputState?.extras?.message;
  const warningType = inputState?.extras?.warningType;
  const warningColor = warningType ? WARNING_COLORS[warningType] : '';

  const handleOnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onValueChange && onValueChange(value, initialValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmitValue(inputRef?.current?.value ?? '', initialValue);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        spellCheck="false"
        autoFocus
        defaultValue={initialValue}
        onKeyDown={handleKeyDown}
        className={cn(s.Input, warningColor || 'border-transparent')}
        onChange={handleOnValueChange}
      />
      {message && (
        <div className={s.WarningMessageContainer}>
          <span className={cn(s.WarningMessage, warningColor || 'border-transparent')}>
            {message}
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  inputState: getRenameFileInputState(state),
});

const connector = connect(mapStateToProps);

export default connector(RenameFileInput);

import React, { PropsWithChildren } from 'react';
import s from './styles/List.module.css';

const List = ({ children }: PropsWithChildren<{}>) => {
  return <div className={s.List}>{children}</div>;
};

export default List;

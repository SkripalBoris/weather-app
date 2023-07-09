import React, { FC, ReactNode } from 'react';
import { ReactComponent as CalendarSvg } from '../../icons/calendar.svg';
import s from './SectionHeader.module.css';

type SectionHeaderProps = {
  children: ReactNode;
};

export const SectionHeader: FC<SectionHeaderProps> = ({ children }) => (
  <div className={s.title}>
    <CalendarSvg className={s.titleIcon} />
    {children}
  </div>
);

import React, { FC, ReactNode } from 'react';
import s from './MainPageLayout.module.css';

type MainPageLayoutProps = {
  firstSection: ReactNode;
  secondSection: ReactNode;
  thirdSection: ReactNode;
};

export const MainPageLayout: FC<MainPageLayoutProps> = ({
  firstSection,
  secondSection,
  thirdSection,
}) => (
  <div className={s.root}>
    <div className={s.first}>{firstSection}</div>
    <div className={s.second}>{secondSection}</div>
    <div className={s.third}>{thirdSection}</div>
  </div>
);

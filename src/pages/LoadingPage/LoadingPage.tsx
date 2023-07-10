import React, { FC, useEffect, useState } from 'react';
import { ReactComponent as PartlyCloudySvg } from '../../icons/partly-cloudy.svg';
import { ReactComponent as GlobeSvg } from '../../icons/globe.svg';
import { MainPageLayout } from '../../layouts/MainPageLayout';
import s from './LoadingPage.module.css';

type LoadingPageProps = {
  status: 'fetch-location' | 'fetch-forecast' | unknown;
};

export const LoadingPage: FC<LoadingPageProps> = ({ status }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      // Don't show loading screen after delay to avoid fast screen changing if data will be fetched from cache
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <MainPageLayout
      firstSection={
        <div className={s.header}>
          <div className={s.title}>Fetching</div>
          {status === 'fetch-forecast' ? (
            <PartlyCloudySvg className={s.icon} />
          ) : (
            <GlobeSvg className={s.icon} />
          )}
        </div>
      }
      secondSection={<div className={s.hourly} />}
      thirdSection={<div className={s.daily} />}
    />
  );
};

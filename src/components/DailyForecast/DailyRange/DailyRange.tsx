import React, { CSSProperties, FC, useMemo } from 'react';
import { getColorBetween } from './utils/getColorBetween';
import s from './DailyRange.module.css';

type DailyRangeProps = {
  min: number;
  max: number;
  highest: number;
  lowest: number;
  current: number | undefined;
};

export const DailyRange: FC<DailyRangeProps> = ({
  min,
  max,
  lowest,
  highest,
  current,
}) => {
  const rangeStyle = useMemo(() => {
    const tempDelta = highest - lowest;
    const start = (min - lowest) / tempDelta;
    const end = (highest - max) / tempDelta;
    const startColor = getColorBetween('#96d0a7', '#ef8734', start);
    const endColor = getColorBetween('#96d0a7', '#ef8734', 1 - end);

    return {
      '--left': start * 100 + '%',
      '--right': end * 100 + '%',
      '--left-color': startColor,
      '--end-color': endColor,
    } as CSSProperties;
  }, []);

  const currentTempPointerStyle = useMemo(() => {
    if (current === undefined) {
      return undefined;
    }

    return {
      '--offset': `${((current - lowest) / (highest - lowest)) * 100}%`,
    } as CSSProperties;
  }, [current, lowest]);

  return (
    <div className={s.dailyRange} style={rangeStyle}>
      <span className={s.dailyMin}>{min}°</span>
      <span className={s.range}>
        <span className={s.rangeMeter} />
        {current !== undefined && (
          <div className={s.currentTemp} style={currentTempPointerStyle} />
        )}
      </span>
      <span className={s.dailyMax}>{max}°</span>
    </div>
  );
};

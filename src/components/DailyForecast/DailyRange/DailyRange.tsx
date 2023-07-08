import React, { FC, useMemo } from 'react';
import s from './DailyRange.module.css'
import { getColorBetween } from './utils/getColorBetween';

type DailyRangeProps = {
    min: number,
    max: number,
    highest: number,
    lowest: number
    current: number | undefined
}

export const DailyRange: FC<DailyRangeProps> = ({min, max, lowest, highest, current}) => {
    const tempDelta = highest - lowest;
    const start = (min - lowest) / tempDelta;
    const end = (highest - max) / tempDelta;
    const startColor = getColorBetween('#96d0a7', '#ef8734', start)
    const endColor = getColorBetween('#96d0a7', '#ef8734', 1 - end)

    return <div className={s.dailyRange} style={{'--left': start * 100 + '%', '--right': end * 100 + '%', '--left-color': startColor, '--end-color': endColor} as React.CSSProperties}>
    <span className={s.dailyMin}>{min}°</span>
    <span className={s.range}>
      <span className={s.rangeMeter} />
      {/* TODO: fix borders */}
      {current !== undefined && <div className={s.currentTemp} style={{'--offset': `${(current - lowest) / tempDelta * 100}%`} as React.CSSProperties}/>}
    </span>
    <span className={s.dailyMax}>{max}°</span>
  </div>
}
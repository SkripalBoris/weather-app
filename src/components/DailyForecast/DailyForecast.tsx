import React, { FC } from 'react'
import { DailyForecastData } from '../../models/forecast'
import { Rain } from '../../weather/Rain'
import s from './DailyForecast.module.css'

type DailyForecast = {
    forecast: DailyForecastData[]
}

export const DailyForecast: FC<DailyForecast> = ({forecast}) => {
    return <div className={s.daily}>
    <div className={s.dailyTitle}>10-DAY FORECAST</div>
    <div>
      {forecast.map(
        ({
          datetime,
          temp,
          range: { min, max },
          periodRange: { min: lowest, max: highest },
        }) => (
          <div key={datetime} className={s.dailyRow}>
            <div>{datetime}</div>

            <div className={s.dailyConditions}>
              <Rain />
              <span className={s.probability}>60%</span>
            </div>

            <div className={s.dailyRange}>
              <span className={s.dailyMin}>{min}°</span>
              <span className={s.range}>
                <span className={s.rangeMeter} />
              </span>
              <span className={s.dailyMax}>{max}°</span>
            </div>
          </div>
        )
      )}
    </div>
  </div>
}
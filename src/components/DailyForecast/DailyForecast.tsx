import React, { FC } from 'react'
import { DailyForecastData } from '../../models/forecast'
import { Rain } from '../../weather/Rain'
import { DailyRange } from './DailyRange/DailyRange'
import s from './DailyForecast.module.css'

type DailyForecast = {
  currentTemp: number
  forecast: DailyForecastData[]
}

export const DailyForecast: FC<DailyForecast> = ({ forecast, currentTemp }) => {
  return <div className={s.daily}>
    <div className={s.dailyTitle}>10-DAY FORECAST</div>
    <div className={s.forecast}>
      {forecast.map(
        ({
          datetime,
          temp,
          range: { min, max },
          periodRange: { min: lowest, max: highest },
        }, index) => (
          <>
            <div className={s.datetimeContainer}>{datetime}</div>

            <div className={s.conditionsContainer}>
              <div className={s.dailyConditions}>
                <Rain />
                <span className={s.probability}>60%</span>
              </div>
            </div>
            <div className={s.dailyRangeContainer}>
              <DailyRange min={min} max={max} lowest={lowest} highest={highest} current={index === 0 ? currentTemp : undefined} />
            </div>
          </>
        )
      )}
    </div>
  </div>
}
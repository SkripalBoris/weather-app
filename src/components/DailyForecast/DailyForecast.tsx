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
  const lowest = Math.min(...forecast.map(data => data.temperatureRange.min))
  const highest = Math.max(...forecast.map(data => data.temperatureRange.max))

  return <div className={s.daily}>
    <div className={s.dailyTitle}>10-DAY FORECAST</div>
    <div className={s.forecast}>
      {forecast.map(
        ({
          datetime,
          temperatureRange: { min, max },
          precipitationProbability
        }, index) => (
          <>
            <div className={s.datetimeContainer}>{index === 0 ? 'Today' : datetime.toLocaleDateString('en-GB',{weekday: 'short'})}</div>

            <div className={s.conditionsContainer}>
              <div className={s.dailyConditions}>
                <Rain />
                {Boolean(precipitationProbability) && <span className={s.probability}>{precipitationProbability}%</span>}
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
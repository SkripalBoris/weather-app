import React, { FC } from 'react'
import { HourlyForecastData } from '../../models/forecast'
import { Thunder } from '../../weather/Thunder'
import s from './HourlyForecast.module.css'

type HourlyForecastProps = {
    forecast: HourlyForecastData[]
}

export const HourlyForecast: FC<HourlyForecastProps> = ({forecast}) => {
    return <div className={s.forecast}>
    <div className={s.title}>HOURLY FORECAST</div>
      <div className={s.forecastList}>
        {forecast.map(({ datetime, temperature }, index) => (
          <div key={datetime.getTime()} className={s.forecastItem}>
            <span>{index === 0 ? 'Now' : datetime.toLocaleString('en-GB', { hour: 'numeric', hour12: true })}</span>
            <span>
              <Thunder />
            </span>
            <span>{temperature}</span>
          </div>
        ))}
      </div>
  </div>
}
import React, { FC } from 'react'
import { HourlyForecastData } from '../../models/forecast'
import { Thunder } from '../../weather/Thunder'
import s from './HourlyForecast.module.css'

type HourleForecatsProps = {
    forecast: HourlyForecastData[]
}

export const HourlyForecast: FC<HourleForecatsProps> = ({forecast}) => {
    return <div className={s.forecast}>
    <div className={s.title}>HOURLY FORECAST</div>
      <div className={s.forecastList}>
        {forecast.map(({ datetime, temperature }) => (
          <div key={datetime} className={s.forecastItem}>
            <span>{datetime}</span>
            <span>
              <Thunder />
            </span>
            <span>{temperature}</span>
          </div>
        ))}
      </div>
  </div>
}
import React, { FC } from 'react'
import { HourlyForecastData } from '../../models/forecast'
import { WeatherConditionIcon } from '../WeatherConditionIcon/WeatherConditionIcon'
import s from './HourlyForecast.module.css'

type HourlyForecastProps = {
    forecast: HourlyForecastData[]
}

export const HourlyForecast: FC<HourlyForecastProps> = ({forecast}) => {
    return <div className={s.forecast}>
    <div className={s.title}>HOURLY FORECAST</div>
      <div className={s.forecastList}>
        {forecast.map(({ datetime, temperature, conditions }, index) => (
          <div key={datetime.getTime()} className={s.forecastItem}>
            <span>{index === 0 ? 'Now' : datetime.toLocaleString('en-GB', { hour: 'numeric', hour12: true }).toUpperCase()}</span>
            <WeatherConditionIcon condition={conditions} allowNight size='m' className={s.forecastIcon}/>
            <span>{temperature}°</span>
          </div>
        ))}
      </div>
  </div>
}
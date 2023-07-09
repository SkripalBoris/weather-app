import React, { FC } from 'react'
import { CurrentConditionsData, HourlyForecastData } from '../../models/forecast'
import { WeatherConditionIcon } from '../WeatherConditionIcon/WeatherConditionIcon'
import s from './HourlyForecast.module.css'

type HourlyForecastProps = {
    current: CurrentConditionsData
    forecast: HourlyForecastData[]
}

export const HourlyForecast: FC<HourlyForecastProps> = ({current, forecast}) => {
    return <div className={s.forecast}>
    <div className={s.title}>HOURLY FORECAST</div>
      <div className={s.forecastList}>
        <div className={s.forecastItem}>
            <span>Now</span>
            <WeatherConditionIcon condition={current.condition} allowNight size='m' className={s.forecastIcon}/>
            <span>{current.temperature}°</span>
          </div>
        {forecast.map(({ datetime, temperature, conditions }) => (
          <div key={datetime.getTime()} className={s.forecastItem}>
            <span>{datetime.toLocaleString('en-GB', { hour: 'numeric', hour12: true }).toUpperCase()}</span>
            <WeatherConditionIcon condition={conditions} allowNight size='m' className={s.forecastIcon}/>
            <span>{temperature}°</span>
          </div>
        ))}
      </div>
  </div>
}
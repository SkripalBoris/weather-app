import React, { FC } from 'react'
import { WeatherConditionIcon } from '../../WeatherConditionIcon/WeatherConditionIcon'
import { WeatherConditions } from '../../../models/weather-conditions'
import s from './HourlyForecastItem.module.css'

type HourlyForecastItemProps = {
    title: string,
    temperature: number,
    condition: WeatherConditions
}

export const HourlyForecastItem: FC<HourlyForecastItemProps> = ({ title, temperature, condition }) => (
    <div className={s.forecastItem}>
        <span className={s.forecastItemTitle}>{title}</span>
        <WeatherConditionIcon condition={condition} allowNight size='m' className={s.forecastIcon} />
        <span className={s.forecastTemperature}>{temperature}°</span>
    </div>
)
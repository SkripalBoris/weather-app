import React, { FC, useMemo } from 'react'
import { LocationData } from '../../models/location'
import { CurrentConditionsData, TemperatureRange } from '../../models/forecast'
import { getWeatherConditionName } from './utils/getWeatherConditionName'
import classNames from 'classnames'
import s from './CurrentConditions.module.css'

type CurrentConditionsProps = {
    className?: string
    locationData: LocationData
    forecast: CurrentConditionsData
    temperatureRange: TemperatureRange
}

export const CurrentConditions: FC<CurrentConditionsProps> = ({
    locationData,
    forecast,
    temperatureRange,
    className
}) => {
    const weatherName = useMemo(() => getWeatherConditionName(forecast.condition), [forecast.condition])

    return <div className={classNames(s.root, className)}>
        <div className={s.location}>{locationData.name}</div>
        <div className={s.temp}>{forecast.temperature}</div>
        <div className={s.weatherName}>{weatherName}</div>
        <div className={s.weatherRange}>H:{temperatureRange.max}°&ensp;L:{temperatureRange.min}°</div>
    </div>
}
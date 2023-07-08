import React, { FC, useMemo } from 'react'
import { LocationData } from '../../models/location'
import { CurrentForecastData } from '../../models/forecast'

import s from './CurrentConditions.module.css'
import { getWeatherConditionName } from './utils/getWeatherConditionName'

type CurrentConditionsProps = {
    locationData: LocationData
    forecast: CurrentForecastData
}

export const CurrentConditions: FC<CurrentConditionsProps> = ({
    locationData,
    forecast
}) => {
    const weatherName = useMemo(() => getWeatherConditionName(forecast.cond), [forecast.cond])

    return <div className={s.header}>
        <div className={s.location}>{locationData.name}</div>
        <div className={s.temp}>{forecast.temp}°</div>
        <div className={s.conditions}>
            {weatherName}
            <br />
            H:{forecast.range.max} L:{forecast.range.min}
        </div>
    </div>
}
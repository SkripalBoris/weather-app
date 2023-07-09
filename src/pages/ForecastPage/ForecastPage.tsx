import React, { FC } from 'react'
import { CurrentConditions } from '../../components/CurrentConditions/CurrentConditions'
import { DailyForecast } from '../../components/DailyForecast/DailyForecast'
import { HourlyForecast } from '../../components/HourlyForecast/HourlyForecast'
import { CurrentConditionsData, HourlyForecastData, DailyForecastData } from '../../models/forecast'
import { LocationData } from '../../models/location'
import s from './ForecastPage.module.css'

type ForecastPageProps = {
    current: CurrentConditionsData,
    hourly: HourlyForecastData[],
    daily: DailyForecastData[],
    currentLocation: LocationData
}

export const ForecastPage: FC<ForecastPageProps> = ({ current, hourly, daily, currentLocation }) => {
    return <div className={s.root}>
        <CurrentConditions
            className={s.current}
            forecast={current}
            locationData={currentLocation}
            temperatureRange={daily[0].temperatureRange}
        />
        <HourlyForecast className={s.hourly} current={current} forecast={hourly} />
        <DailyForecast className={s.daily} forecast={daily} currentTemp={current.temperature} />
    </div>
}
import React, { FC } from 'react'
import { CurrentConditions } from '../../components/CurrentConditions/CurrentConditions'
import { DailyForecast } from '../../components/DailyForecast/DailyForecast'
import { HourlyForecast } from '../../components/HourlyForecast/HourlyForecast'
import { CurrentConditionsData, HourlyForecastData, DailyForecastData } from '../../models/forecast'
import { LocationData } from '../../models/location'

type ForecastPageProps = {
    current: CurrentConditionsData,
    hourly: HourlyForecastData[],
    daily: DailyForecastData[],
    currentLocation: LocationData
}

export const ForecastPage: FC<ForecastPageProps> = ({current, hourly, daily, currentLocation }) => {
    return <>
    <CurrentConditions forecast={current} locationData={currentLocation} temperatureRange={daily[0].temperatureRange}/>
        <HourlyForecast current={current} forecast={hourly} />
        <DailyForecast forecast={daily} currentTemp={current.temperature} />
        </>
}
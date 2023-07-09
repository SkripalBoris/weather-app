import { useEffect, useState } from 'react'
import { CurrentConditionsData, DailyForecastData, HourlyForecastData } from '../models/forecast'
import { getHourlyForecastData } from '../services/hourly-forecast-service'
import { getDailyForecastData } from '../services/daily-forecast-service'
import { getCurrentConditionsData } from '../services/current-conditions-service'

export type ForecastData = {
    current: CurrentConditionsData,
    hourly: HourlyForecastData[],
    daily: DailyForecastData[],
}

export function useForecastData(locationKey: string | undefined): ForecastData | undefined {
    const [forecastData, setForecastData] = useState<ForecastData | undefined>()

    useEffect(() => {
        if (locationKey) {
            Promise.all([
                getCurrentConditionsData(locationKey),
                getHourlyForecastData(locationKey),
                getDailyForecastData(locationKey)
            ]).then(([currentConditions, hourlyForecast, dailyForecast]) => {
                setForecastData({
                    current: currentConditions,
                    daily: dailyForecast,
                    hourly: hourlyForecast
                })
            })
            //TODO: add catch
        }
    }, [locationKey])


    return forecastData
}

// function generateCurrentForecast(hourlyForecast: HourlyForecastData[], dailyForecast: DailyForecastData[]): CurrentConditionsData {
//     const currentTime = new Date();

//     const currentHourlyData = hourlyForecast.find(({datetime}) => datetime.getHours() === currentTime.getHours() || datetime.getHours() === currentTime.getHours() + 1) as HourlyForecastData //TODO: add comment
//     const currentDailyData = dailyForecast.find(({datetime}) => datetime.getDate() === currentTime.getDate()) as DailyForecastData

//     return {
//         temperature: currentHourlyData.temperature,
//         condition: currentHourlyData.conditions,
//         temperatureRange: currentDailyData.temperatureRange
//     }
// }
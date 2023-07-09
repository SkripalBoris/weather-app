import { useEffect, useState } from 'react'
import { CurrentConditionsData, DailyForecastData, HourlyForecastData } from '../models/forecast'
import { getHourlyForecastData } from '../services/hourly-forecast-service'
import { getDailyForecastData } from '../services/daily-forecast-service'
import { getCurrentConditionsData } from '../services/current-conditions-service'
import { DataWithStatus } from '../types/data-wrappets'
import { DataStatuses } from '../models/data-statuses'
import { getTimePeriod } from '../utils/getTimePeriod'

export type ForecastData = {
    current: DataWithStatus<CurrentConditionsData>,
    hourly: DataWithStatus<HourlyForecastData[]>,
    daily: DataWithStatus<DailyForecastData[]>,
}

export function useForecastData(locationKey: string | undefined): ForecastData | undefined {
    const [forecastData, setForecastData] = useState<ForecastData | undefined>()

    useEffect(() => {
        if (locationKey) {
            Promise.all([
                getCurrentConditionsData(locationKey),
                getHourlyForecastData(locationKey),
                getDailyForecastData(locationKey)
            ]).then((result) => {
                const preparedData = prepareForecastData(...result)

                setForecastData(preparedData)
            })
        }
    }, [locationKey])


    return forecastData
}

function prepareForecastData(
    currentConditions: DataWithStatus<CurrentConditionsData>,
    hourlyForecast: DataWithStatus<HourlyForecastData[]>,
    dailyForecast: DataWithStatus<DailyForecastData[]>
): ForecastData {
    const currentTime = new Date();

    const preparedDaily = prepareDailyForecast(dailyForecast, currentTime);
    const preparedHourly = prepareHourlyForecast(hourlyForecast, currentTime);
    const preparedCurrent = preparedCurrentConditions(currentConditions, preparedHourly, preparedDaily, currentTime)

    if (
        preparedCurrent.status === DataStatuses.CACHE_FALLBACK
        && preparedHourly.status !== DataStatuses.EMPTY_FALLBACK
        && preparedHourly.data.length
        && preparedHourly.data[0].datetime === preparedCurrent.data.datetime
    ) {
        preparedHourly.data.shift()
    }

    return {
        current: preparedCurrent,
        hourly: preparedHourly,
        daily: preparedDaily
    }
}

function prepareDailyForecast(
    dailyForecast: DataWithStatus<DailyForecastData[]>,
    currentTime: Date
): DataWithStatus<DailyForecastData[]> {
    if (dailyForecast.status === DataStatuses.CACHE_FALLBACK) {
        const startTime = new Date(currentTime);
        startTime.setHours(0, 0, 0, 0);

        return {
            status: DataStatuses.CACHE_FALLBACK,
            data: dailyForecast.data.filter(({ datetime }) => datetime >= startTime)
        }
    }

    return dailyForecast
}

function prepareHourlyForecast(
    hourlyForecast: DataWithStatus<HourlyForecastData[]>,
    currentTime: Date
): DataWithStatus<HourlyForecastData[]> {
    if (hourlyForecast.status === DataStatuses.CACHE_FALLBACK) {
        const startTime = new Date(currentTime);
        startTime.setMinutes(0, 0, 0);

        return {
            status: DataStatuses.CACHE_FALLBACK,
            data: hourlyForecast.data.filter(({ datetime }) => datetime >= startTime)
        }
    }

    return hourlyForecast
}

function preparedCurrentConditions(
    currentConditions: DataWithStatus<CurrentConditionsData>,
    hourlyForecast: DataWithStatus<HourlyForecastData[]>,
    dailyForecast: DataWithStatus<DailyForecastData[]>,
    currentTime: Date
): DataWithStatus<CurrentConditionsData> {
    if (currentConditions.status === DataStatuses.FETCHED || currentConditions.status === DataStatuses.FROM_CACHE) {
        return currentConditions
    }

    const startTime = new Date(currentTime);
    startTime.setMinutes(0, 0, 0);

    if (hourlyForecast.status !== DataStatuses.EMPTY_FALLBACK) {
        const startTime = new Date(currentTime);
        startTime.setMinutes(0, 0, 0);

        const targetHourlyData = hourlyForecast.data.find(({ datetime }) => {
            return datetime.getTime() === startTime.getTime()
        })

        if (targetHourlyData) {
            return {
                status: DataStatuses.CACHE_FALLBACK,
                data: {
                    temperature: targetHourlyData.temperature,
                    condition: targetHourlyData.conditions,
                    datetime: targetHourlyData.datetime
                }
            }
        }
    }

    if (dailyForecast.status !== DataStatuses.EMPTY_FALLBACK) {
        const startTime = new Date(currentTime);
        startTime.setHours(0, 0, 0, 0);

        const targetHourlyData = dailyForecast.data.find(({ datetime }) => {
            return datetime.getTime() === startTime.getTime()
        })

        if (targetHourlyData) {
            const timePeriod = getTimePeriod(currentTime)

            return {
                status: DataStatuses.CACHE_FALLBACK,
                data: {
                    temperature: timePeriod === 'night'
                        ? targetHourlyData.temperatureRange.min
                        : targetHourlyData.temperatureRange.max,
                    condition: targetHourlyData.conditions,
                    datetime: targetHourlyData.datetime
                }
            }
        }
    }

    return {
        status: DataStatuses.EMPTY_FALLBACK
    }
}

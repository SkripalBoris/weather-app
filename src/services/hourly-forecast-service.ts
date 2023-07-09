import { fetchHourlyForecast } from '../api/weather-api';
import { DataStatuses } from '../models/data-statuses';
import { HourlyForecastData } from '../models/forecast';
import { DataWithStatus } from '../types/data-wrappets';

export async function getHourlyForecastData(locationKey: string): Promise<DataWithStatus<HourlyForecastData[]>> {
    const cacheData = getCacheData(locationKey)

    if (cacheData?.length && cacheData[0].datetime > new Date()) {
        return {
            status: DataStatuses.FROM_CACHE,
            data: cacheData
        }
    }

    try {
        const data = await fetchHourlyForecast(locationKey);
        saveDataToCache(locationKey, data)
        return {
            status: DataStatuses.FETCHED,
            data
        }
    } catch {
        if (cacheData) {
            return {
                status: DataStatuses.CACHE_FALLBACK,
                data: cacheData
            }
        }

        return {
            status: DataStatuses.EMPTY_FALLBACK
        }
    }
}

// key - location
type ForecastCacheType = Record<string, Array<Omit<HourlyForecastData, 'datetime'> & { datetime: string }>>
const HOURLY_FORECAST_CACHE_KEY = 'hourlyForecastCache'

function getCacheData(locationKey: string): HourlyForecastData[] | undefined {
    const rawCacheData = localStorage.getItem(HOURLY_FORECAST_CACHE_KEY);
    if (!rawCacheData) {
        return undefined
    }

    const cacheData: ForecastCacheType = JSON.parse(rawCacheData);

    if (locationKey in cacheData) {
        const targetData = cacheData[locationKey];
        return targetData.map(({ datetime, ...rest }) => ({
            datetime: new Date(datetime),
            ...rest,
        }))
    }

    return undefined
}

function saveDataToCache(locationKey: string, data: HourlyForecastData[]): void {
    const rawCacheData = localStorage.getItem(HOURLY_FORECAST_CACHE_KEY);
    const cacheData: ForecastCacheType = rawCacheData ? JSON.parse(rawCacheData) : {}

    localStorage.setItem(HOURLY_FORECAST_CACHE_KEY, JSON.stringify({ ...cacheData, [locationKey]: data }))
}
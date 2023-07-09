import { fetchDailyForecast } from '../api/weather-api';
import { DataStatuses } from '../models/data-statuses';
import { DailyForecastData } from '../models/forecast';
import { DataWithStatus } from '../types/data-wrappets';

export async function getDailyForecastData(locationKey: string): Promise<DataWithStatus<DailyForecastData[]>> {
    const cacheData = getCacheData(locationKey)

    if (cacheData?.length) {
        const firstPreparedData = new Date(cacheData[0].datetime)
        firstPreparedData.setHours(0, 0, 0, 0)
        const targetTime = new Date()
        targetTime.setHours(0, 0, 0, 0)

        if (firstPreparedData.getTime() === targetTime.getTime()) {
            return {
                status: DataStatuses.FROM_CACHE,
                data: cacheData
            }
        }
    }

    try {
        const data = await fetchDailyForecast(locationKey);
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
type ForecastCacheType = Record<string, Array<Omit<DailyForecastData, 'datetime'> & { datetime: string }>>
const DAILY_FORECAST_CACHE_KEY = 'dailyForecastCache'

function getCacheData(locationKey: string): DailyForecastData[] | undefined {
    const rawCacheData = localStorage.getItem(DAILY_FORECAST_CACHE_KEY);
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

function saveDataToCache(locationKey: string, data: DailyForecastData[]): void {
    const rawCacheData = localStorage.getItem(DAILY_FORECAST_CACHE_KEY);
    const cacheData: ForecastCacheType = rawCacheData ? JSON.parse(rawCacheData) : {}

    localStorage.setItem(DAILY_FORECAST_CACHE_KEY, JSON.stringify({ ...cacheData, [locationKey]: data }))
}

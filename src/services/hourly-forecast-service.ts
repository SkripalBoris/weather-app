import { fetchHourlyForecast } from '../api/weather-api';
import { HourlyForecastData } from '../models/forecast';

export async function getHourlyForecastData(locationKey: string): Promise<HourlyForecastData[]> {
    const cacheData = getCacheData(locationKey)

    if (cacheData?.length && cacheData[0].datetime > new Date()) {
        return cacheData
    }

    try {
    const data = await fetchHourlyForecast(locationKey);
    //TODO: add catch

    saveDataToCache(locationKey, data)
    return data
} catch {
    return cacheData as HourlyForecastData[]
}
}

// key - location
type ForecastCacheType = Record<string, Array<Omit<HourlyForecastData, 'datetime'> & {datetime: string}>>
const HOURLY_FORECAST_CACHE_KEY = 'hourlyForecastCache'

function getCacheData(locationKey: string): HourlyForecastData[] | undefined {
    const rawCacheData = localStorage.getItem(HOURLY_FORECAST_CACHE_KEY);
    if (!rawCacheData) {
        return undefined
    }

    const cacheData: ForecastCacheType = JSON.parse(rawCacheData);

    if (locationKey in cacheData) {
        const targetData = cacheData[locationKey];
        return targetData.map(({datetime, ...rest}) => ({
            datetime: new Date(datetime),
            ...rest,
        }))
    }

    return undefined
}

function saveDataToCache(locationKey: string, data: HourlyForecastData[]): void {
    const rawCacheData = localStorage.getItem(HOURLY_FORECAST_CACHE_KEY);
    const cacheData: ForecastCacheType = rawCacheData ? JSON.parse(rawCacheData) : {}
    
    localStorage.setItem(HOURLY_FORECAST_CACHE_KEY, JSON.stringify({...cacheData, [locationKey]: data}))

}
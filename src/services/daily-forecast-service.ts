import { fetchDailyForecast } from '../api/weather-api';
import { DailyForecastData } from '../models/forecast';


export async function getDailyForecastData(locationKey: string): Promise<DailyForecastData[]> {
    const cacheData = getCacheData(locationKey)

    if (cacheData?.length) {
        const firstPreparedData = new Date(cacheData[0].datetime)
        firstPreparedData.setHours(0,0,0,0)
        const targetTime = new Date()
        targetTime.setHours(0,0,0,0)

        if (firstPreparedData.getTime() === targetTime.getTime()) {
            return cacheData
        }
    }

    try {
        const data = await fetchDailyForecast(locationKey);
        //TODO: add catch
    
        saveDataToCache(locationKey, data)
        return data
    } catch {
        return cacheData as DailyForecastData[]
    }
    
}

// key - location
type ForecastCacheType = Record<string, Array<Omit<DailyForecastData, 'datetime'> & {datetime: string}>>
const DAILY_FORECAST_CACHE_KEY = 'dailyForecastCache'

function getCacheData(locationKey: string): DailyForecastData[] | undefined {
    const rawCacheData = localStorage.getItem(DAILY_FORECAST_CACHE_KEY);
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

function saveDataToCache(locationKey: string, data: DailyForecastData[]): void {
    const rawCacheData = localStorage.getItem(DAILY_FORECAST_CACHE_KEY);
    const cacheData: ForecastCacheType = rawCacheData ? JSON.parse(rawCacheData) : {}
    
    localStorage.setItem(DAILY_FORECAST_CACHE_KEY, JSON.stringify({...cacheData, [locationKey]: data}))

}
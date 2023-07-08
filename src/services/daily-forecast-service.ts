import { fetchDailyForecast } from '../api/weather-api';
import { DailyForecastData } from '../models/forecast';

const DAILY_FORECAST_CACHE_KEY = 'dailyForecastCache'

type ForecastCacheType = Omit<DailyForecastData, 'datetime'> & {datetime: string}

export async function getDailyForecastData(locationKey: string): Promise<DailyForecastData[]> {
    const cacheData: DailyForecastData[] =
        JSON.parse(localStorage.getItem(DAILY_FORECAST_CACHE_KEY) || '[]')
            .map(({datetime, ...rest}: ForecastCacheType) => ({
                datetime: new Date(datetime),
                ...rest,
            }))


    if (cacheData.length) {
        const firstPreparedData = new Date(cacheData[0].datetime)
        firstPreparedData.setHours(0,0,0,0)
        const targetTime = new Date()
        targetTime.setHours(0,0,0,0)

        if (firstPreparedData.getTime() === targetTime.getTime()) {
            return cacheData
        }
    }

    const data = await fetchDailyForecast(locationKey);
    //TODO: add catch

    localStorage.setItem(DAILY_FORECAST_CACHE_KEY, JSON.stringify(data))
    return data
}
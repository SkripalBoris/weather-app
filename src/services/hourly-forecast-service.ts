import { fetchHourlyForecast } from '../api/weather-api';
import { HourlyForecastData } from '../models/forecast';

const HOURLY_FORECAST_CACHE_KEY = 'hourlyForecastCache'

type ForecastCacheType = Omit<HourlyForecastData, 'datetime'> & {datetime: string}

export async function getHourlyForecastData(locationKey: string): Promise<HourlyForecastData[]> {
    const cacheData: HourlyForecastData[] =
        JSON.parse(localStorage.getItem(HOURLY_FORECAST_CACHE_KEY) || '[]')
            .map(({datetime, ...rest}: ForecastCacheType) => ({
                datetime: new Date(datetime),
                ...rest,
            }))

    if (cacheData.length && cacheData[0].datetime > new Date()) {
        return cacheData
    }

    const data = await fetchHourlyForecast(locationKey);
    //TODO: add catch

    localStorage.setItem(HOURLY_FORECAST_CACHE_KEY, JSON.stringify(data))
    return data
}
import { fetchCurrentConditions } from '../api/weather-api';
import { CurrentConditionsData } from '../models/forecast';


export async function getCurrentConditionsData(locationKey: string): Promise<CurrentConditionsData> {
    const cacheData = getCacheData(locationKey);

    if (cacheData) {
        const cacheDatetime = cacheData.datetime;
        const currentTime = new Date();
        const diffMilliseconds = currentTime.getTime() - cacheDatetime.getTime()

        // 10 minutes in milliseconds
        if (diffMilliseconds < 100 * 60 * 1000 && currentTime.getHours() === cacheDatetime.getHours()) {
            return cacheData
        }
    }

    try {
        //TODO: add catch
        const data = await fetchCurrentConditions(locationKey);
        saveDataToCache(locationKey, data)
        return data
    } catch {
        return cacheData as CurrentConditionsData
    }

}

// key - location
type CurrentConditionsCacheType = Record<string, Omit<CurrentConditionsData, 'datetime'> & {datetime: string}>
const CURRENT_CONDITIONS_CACHE_KEY = 'currentConditionsCache'

function getCacheData(locationKey: string): CurrentConditionsData | undefined {
    const rawCacheData = localStorage.getItem(CURRENT_CONDITIONS_CACHE_KEY);
    if (!rawCacheData) {
        return undefined
    }

    const cacheData: CurrentConditionsCacheType = JSON.parse(rawCacheData);

    if (locationKey in cacheData) {
        const targetData = cacheData[locationKey];
        return {
            ...targetData,
            datetime: new Date(targetData.datetime)
        }
    }

    return undefined
}

function saveDataToCache(locationKey: string, data: CurrentConditionsData): void {
    const rawCacheData = localStorage.getItem(CURRENT_CONDITIONS_CACHE_KEY);
    const cacheData: CurrentConditionsCacheType = rawCacheData ? JSON.parse(rawCacheData) : {}
    
    localStorage.setItem(CURRENT_CONDITIONS_CACHE_KEY, JSON.stringify({...cacheData, [locationKey]: data}))

}
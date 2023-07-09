import { fetchLocationInfo } from '../api/location-api';
import { DataStatuses } from '../models/data-statuses';
import { DataWithStatus } from '../types/data-wrappets';

type LocationInfo = {
    name: string, code: string
}

const LOCATIONS_INFO_CACHE_KEY = 'locationsInfoCache'

export async function getLocationInfo(lat: number, lon: number): Promise<DataWithStatus<LocationInfo>> {
    const cachedData = getDataFromCache(lat, lon)

    if (cachedData) {
        return {
            status: DataStatuses.FROM_CACHE,
            data: cachedData
        }
    }

    try {
        const locationData = await fetchLocationInfo(lat, lon)
        saveDataToCache(lat, lon, locationData)
        return {
            status: DataStatuses.FETCHED,
            data: locationData
        }
    } catch {
        return {
            status: DataStatuses.EMPTY_FALLBACK
        }
    }
}

function generateCacheKey(lat: number, lon: number): string {
    return `${lat}_${lon}`
}

function getDataFromCache(lat: number, lon: number): LocationInfo | undefined {
    const locationFromCache = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY) || '{}'
    const parsedLocation: Record<string, LocationInfo> = JSON.parse(locationFromCache)
    const locationKey = generateCacheKey(lat, lon)

    return parsedLocation[locationKey]
}

function saveDataToCache(lat: number, lon: number, data: LocationInfo): void {
    const locationKey = generateCacheKey(lat, lon)
    const rawCacheData = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY)
    const cacheData = rawCacheData ? JSON.parse(rawCacheData) : {}

    localStorage.setItem(LOCATIONS_INFO_CACHE_KEY, JSON.stringify({ ...cacheData, [locationKey]: data }))
}
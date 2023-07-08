import { fetchLocationInfo } from '../api/location-api';

type LocationInfo = {
    name: string, code: string
}

const LOCATIONS_INFO_CACHE_KEY = 'locationsInfoCache'

export async function getLocationInfo(lat: number, lon: number) {
    const locationFromCache = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY) || '{}'
    const parsedLocation: Record<string, LocationInfo> = JSON.parse(locationFromCache)
    const locationKey = `${lat}_${lon}`

    if (locationKey in parsedLocation) {
        return parsedLocation[locationKey]
    }

    //TODO: add catch
    const locationData = await fetchLocationInfo(lat, lon)
    localStorage.setItem(LOCATIONS_INFO_CACHE_KEY, JSON.stringify({...parsedLocation, [locationKey]: locationData}))
    return locationData

}
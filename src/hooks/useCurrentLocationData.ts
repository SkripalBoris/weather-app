import { useEffect, useState } from 'react'
import { LocationData } from '../models/location';
import { fetchLocationInfo } from '../api/location-api';

const LOCATIONS_INFO_CACHE_KEY = 'locationsInfoCache'

export function useCurrentLocationData(): LocationData | undefined {
    const [locationData, setLocationData] = useState<LocationData>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;

          getCurrentLocationData(lat, lon).then(data => setLocationData(data))
        }, () => {
          setLocationData(
            {
              lat: 59,
              lon: 17,
              name: 'Stockholm',
              code: '314785'
            },
          );
        });
      }, []);

    return locationData
}

async function getCurrentLocationData(lat: number, lon: number): Promise<LocationData> {
  const locationFromCache = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY)

  if (locationFromCache) {
    const parsedLocation: LocationData = JSON.parse(locationFromCache)

    if (parsedLocation.lat === lat && parsedLocation.lon === lon) {
      return parsedLocation
    }
  }

  //TODO: add catch
  const locationData = await fetchLocationInfo(lat, lon)
  const result = {...locationData, lat, lon}
  localStorage.setItem(LOCATIONS_INFO_CACHE_KEY, JSON.stringify(result))
  return result
}
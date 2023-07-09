import { useEffect, useState } from 'react'
import { LocationDataWithStatus } from '../models/location';
import { getLocationInfo } from '../services/location-service';
import { DataStatuses } from '../models/data-statuses';

const FALLBACK_DATA = {
  lat: 59,
  lon: 17,
  name: 'Stockholm',
  code: '314785',
}

export function useCurrentLocationData(): LocationDataWithStatus | undefined {
    const [locationData, setLocationData] = useState<LocationDataWithStatus>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;

          const locationData = await getLocationInfo(lat, lon)
          if (locationData.status === DataStatuses.EMPTY_FALLBACK) {
            setLocationData({status: DataStatuses.EMPTY_FALLBACK})
          } else {
            setLocationData({status: locationData.status, data: {...locationData.data, lat, lon}})
          }
        }, () => {
          setLocationData({
            status: DataStatuses.CACHE_FALLBACK,
            data: FALLBACK_DATA
          });
        });
      }, []);

    return locationData
}

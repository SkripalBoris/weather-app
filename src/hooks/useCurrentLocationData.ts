import { useEffect, useState } from 'react';
import { LocationDataWithStatus } from '../models/location';
import { getLocationInfo } from '../services/location-service';
import { DataStatuses } from '../models/data-statuses';

export function useCurrentLocationData(): LocationDataWithStatus | undefined {
  const [locationData, setLocationData] = useState<LocationDataWithStatus>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;

        const locationData = await getLocationInfo(lat, lon);
        if (locationData.status === DataStatuses.EMPTY_FALLBACK) {
          setLocationData({ status: DataStatuses.EMPTY_FALLBACK });
        } else {
          setLocationData({
            status: locationData.status,
            data: { ...locationData.data, lat, lon },
          });
        }
      },
      () => {
        setLocationData({
          status: DataStatuses.EMPTY_FALLBACK,
        });
      }
    );
  }, []);

  return locationData;
}

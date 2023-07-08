import { useEffect, useState } from 'react'
import { LocationData } from '../models/location';
import { getLocationInfo } from '../services/location-service';

export function useCurrentLocationData(): LocationData | undefined {
    const [locationData, setLocationData] = useState<LocationData>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;

          const locationData = await getLocationInfo(lat, lon)
          setLocationData({...locationData, lat, lon})
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

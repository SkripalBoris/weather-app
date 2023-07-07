import { useEffect, useState } from 'react'
import { LocationData } from '../models/location';

export function useCurrentLocationData(): LocationData | undefined {
    const [locationData, setLocationData] = useState<LocationData>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
    
          // TODO: fix name
          setLocationData(
            { name: 'Current Location', lat, lon },
          );
        }, () => {
          setLocationData(
            {
              lat: 59,
              lon: 17,
              name: 'Stockholm',
            },
          );
        });
      }, []);

    return locationData
}
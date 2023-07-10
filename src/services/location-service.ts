import { fetchLocationInfo } from '../api/location-api';
import { DataStatuses } from '../models/data-statuses';
import { DataWithStatus } from '../types/data-wrappets';

type LocationInfo = {
  name: string;
  code: string;
};

const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

export async function getLocationInfo(
  lat: number,
  lon: number
): Promise<DataWithStatus<LocationInfo>> {
  const cachedData = getDataFromCache(lat, lon);

  if (cachedData) {
    const currentTime = new Date();

    if (
      currentTime.getTime() - cachedData.cachingTime.getTime() <
      WEEK_IN_MILLISECONDS
    ) {
      return {
        status: DataStatuses.FROM_CACHE,
        data: cachedData.data,
      };
    }
  }

  try {
    const locationData = await fetchLocationInfo(lat, lon);
    saveDataToCache(lat, lon, locationData);
    return {
      status: DataStatuses.FETCHED,
      data: locationData,
    };
  } catch {
    if (cachedData) {
      return {
        data: cachedData.data,
        status: DataStatuses.CACHE_FALLBACK,
      };
    }

    return {
      status: DataStatuses.EMPTY_FALLBACK,
    };
  }
}

function generateCacheKey(lat: number, lon: number): string {
  return `${lat}_${lon}`;
}

type LocationInfoCachedData = {
  cachingTime: string;
  data: LocationInfo;
};

type ForecastCacheType = Record<string, LocationInfoCachedData>;

const LOCATIONS_INFO_CACHE_KEY = 'locationsDataCache';

function getDataFromCache(
  lat: number,
  lon: number
):
  | {
      data: LocationInfo;
      cachingTime: Date;
    }
  | undefined {
  const locationFromCache = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY);

  if (!locationFromCache) {
    return undefined;
  }

  const parsedLocation: ForecastCacheType = JSON.parse(locationFromCache);
  const locationKey = generateCacheKey(lat, lon);
  const locationCachedData = parsedLocation[locationKey];

  return {
    cachingTime: new Date(locationCachedData.cachingTime),
    data: locationCachedData.data,
  };
}

function saveDataToCache(lat: number, lon: number, data: LocationInfo): void {
  const locationKey = generateCacheKey(lat, lon);
  const rawCacheData = localStorage.getItem(LOCATIONS_INFO_CACHE_KEY);
  const cacheData = rawCacheData ? JSON.parse(rawCacheData) : {};

  localStorage.setItem(
    LOCATIONS_INFO_CACHE_KEY,
    JSON.stringify({
      ...cacheData,
      [locationKey]: {
        data,
        cachingTime: new Date(),
      },
    })
  );
}

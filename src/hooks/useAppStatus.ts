import { useMemo } from 'react';
import { DataStatuses } from '../models/data-statuses';
import { LocationDataWithStatus } from '../models/location';
import { ForecastData } from './useForecastData';

export type DetailedAppStatus = 'fetch-location' | 'fetch-forecast' | 'ready' | 'cache-fallback' | 'error'

type AppStatus = {
    ready: boolean,
    detailedStatus: DetailedAppStatus
}

export function useAppStatus(locationData: LocationDataWithStatus | undefined, forecastData: ForecastData | undefined): AppStatus {
    const generalDataStatus = useMemo<AppStatus>(() => {
        if (!locationData) {
            return {
                ready: false,
                detailedStatus: 'fetch-forecast'
            }
        }

        if (locationData.status === DataStatuses.EMPTY_FALLBACK) {
            return {
                ready: false,
                detailedStatus: 'error'
            }
        }


        if (!forecastData) {
            return {
                ready: false,
                detailedStatus: 'fetch-forecast'
            }
        }

        const worstStatus = Math.min(...[
            locationData,
            forecastData.current,
            forecastData.hourly,
            forecastData.daily
        ].map(({status}) => status))

        if (worstStatus === DataStatuses.EMPTY_FALLBACK) {
            return {
                ready: false,
                detailedStatus: 'error'
            }
        }

        return {
            ready: true,
            detailedStatus: worstStatus === DataStatuses.CACHE_FALLBACK ? 'cache-fallback' : 'ready'
        }
    }, [locationData, forecastData])

    return generalDataStatus
}
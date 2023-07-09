import React, { ComponentProps, useMemo } from 'react';
import { useCurrentLocationData } from './hooks/useCurrentLocationData';
import { LoadingPage } from './pages/LoadingPage/LoadingPage';
import { ForecastPage } from './pages/ForecastPage/ForecastPage';
import { Notification } from './components/Notification/Notification';
import { useCurrentTimePeriod } from './hooks/useCurrentTimePeriod';
import { useForecastData } from './hooks/useForecastData';
import { DataStatuses } from './models/data-statuses';
import { useAppStatus } from './hooks/useAppStatus';
import s from './App.module.css';

export default function App() {
  const currentLocation = useCurrentLocationData()
  const forecast = useForecastData(
    currentLocation?.status !== DataStatuses.EMPTY_FALLBACK ? currentLocation?.data.code : undefined
  )
  const timePeriod = useCurrentTimePeriod();
  const { ready, detailedStatus } = useAppStatus(currentLocation, forecast)

  // use this because TS can't resolve right types using "ready" flag
  const forecastPreparedProps = useMemo<ComponentProps<typeof ForecastPage> | undefined>(() => {
    if (!ready || !currentLocation || !forecast) {
      return undefined
    }

    const { current, daily, hourly } = forecast;

    if (
      currentLocation.status === DataStatuses.EMPTY_FALLBACK
      || current.status === DataStatuses.EMPTY_FALLBACK
      || hourly.status === DataStatuses.EMPTY_FALLBACK
      || daily.status === DataStatuses.EMPTY_FALLBACK
    ) {
      return undefined
    }

    return {
      currentLocation: currentLocation.data,
      current: current.data,
      hourly: hourly.data,
      daily: daily.data
    }

  }, [currentLocation, forecast, ready])

  return (
    <div className={s.app} data-period={timePeriod}>
      {detailedStatus === 'cache-fallback' && <Notification status='warning'>Data can be outdated</Notification>}
      {detailedStatus === 'error' && <Notification status='error'>Cannot fetch data</Notification>}
      {!ready && <LoadingPage status={detailedStatus} />}
      {ready && !!forecastPreparedProps &&
        <ForecastPage {...forecastPreparedProps} />
      }
    </div>
  );
}

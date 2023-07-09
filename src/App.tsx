import React from 'react';
import { useCurrentLocationData } from './hooks/useCurrentLocationData';
import { LoadingPage } from './pages/LoadingPage/LoadingPage';
import { ForecastPage } from './pages/ForecastPage/ForecastPage';
import { useCurrentTimePeriod } from './hooks/useCurrentTimePeriod';
import { useForecastData } from './hooks/useForecastData';
import s from './App.module.css';
import './style.css';

export default function App() {
  const currentLocation = useCurrentLocationData()
  const forecast = useForecastData(currentLocation?.code)
  const timePeriod = useCurrentTimePeriod();

  return (
    <div className={s.app} data-period={timePeriod}>
      <div className={s.container}>
        {(!currentLocation || !forecast) ?
          <LoadingPage positionLoading={!currentLocation} />
          : <ForecastPage currentLocation={currentLocation} {...forecast} />
        }
      </div>
    </div>
  );
}

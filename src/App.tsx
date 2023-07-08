import React from 'react';
import { useCurrentLocationData } from './hooks/useCurrentLocationData';
import { CurrentConditions } from './components/CurrentConditions/CurrentConditions';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { DailyForecast } from './components/DailyForecast/DailyForecast';
import { useCurrentTimePeriod } from './hooks/useCurrentTimePeriod';
import { useForecastData } from './hooks/useForecastData';
import s from './App.module.css';
import './style.css';

export default function App() {
  const currentLocation = useCurrentLocationData()
  const forecast = useForecastData(currentLocation?.code)
  const timePeriod = useCurrentTimePeriod();

  if (!forecast || !currentLocation) {
    return <div className={s.app} data-period={timePeriod}><div>Loading</div></div>
  }

  const {current, daily, hourly} = forecast

  return (
    <div className={s.app} data-period={timePeriod}>
      <div className={s.container}>
        <CurrentConditions forecast={current} locationData={currentLocation}/>
        <HourlyForecast forecast={hourly} />
        <DailyForecast forecast={daily} currentTemp={current.temperature} />
      </div>
    </div>
  );
}

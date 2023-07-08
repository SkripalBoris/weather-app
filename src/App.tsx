import React, { useEffect, useState } from 'react';
import { CurrentForecastData, HourlyForecastData, DailyForecastData } from './models/forecast';
import { fetchWeatherData } from './api/weather-api';
import { useCurrentLocationData } from './hooks/useCurrentLocationData';
import { CurrentConditions } from './components/CurrentConditions/CurrentConditions';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { DailyForecast } from './components/DailyForecast/DailyForecast';
import s from './App.module.css';
import './style.css';
import { useCurrentTimePeriod } from './hooks/useCurrentTimePeriod';

type WeatherData = {
  current: CurrentForecastData,
  hourly: HourlyForecastData[],
  daily: DailyForecastData[],
}

export default function App() {
  const [forecast, setForecast] = useState<WeatherData>();
  const currentLocation = useCurrentLocationData()

  useEffect(() => {
    fetchWeatherData().then((forecast) => {
      setForecast(forecast);
    })
      // localStorage.setItem('forecast', JSON.stringify(data.hourly));
  }, []);

  const timePeriod = useCurrentTimePeriod();

  if (!forecast || !currentLocation) {
    return <div className={s.app} data-period={timePeriod}><div>Loading</div></div>
  }

  const {current, daily, hourly} = forecast

  console.log(timePeriod)

  return (
    <div className={s.app} data-period={timePeriod}>
      <div className={s.container}>
        <CurrentConditions forecast={current} locationData={currentLocation}/>
        <HourlyForecast forecast={hourly} />
        <DailyForecast forecast={daily} currentTemp={current.temp} />
      </div>
    </div>
  );
}

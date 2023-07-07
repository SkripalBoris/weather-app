import React, { useEffect, useState } from 'react';
import { CurrentForecastData, HourlyForecastData, DailyForecastData } from './models/forecast';
import { fetchWeatherData } from './api/weather-api';
import { useCurrentLocationData } from './hooks/useCurrentLocationData';
import { CurrentConditions } from './components/CurrentConditions/CurrentConditions';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { DailyForecast } from './components/DailyForecast/DailyForecast';
import './style.css';

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

  if (!forecast || !currentLocation) {
    return <div>Loading</div>
  }

  const {current, daily, hourly} = forecast

  return (
    <div>
      <CurrentConditions forecast={current} locationData={currentLocation}/>
      <HourlyForecast forecast={hourly} />
      <DailyForecast forecast={daily} />
    </div>
  );
}

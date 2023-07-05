import React, { useEffect, useState } from 'react';
import './style.css';

import { Thunder } from './weather/Thunder';
import { Rain } from './weather/Rain';

import { currentWeather, hourly, dailyForecast } from './data';

export default function App() {
  const [current, setCurrent] = useState(currentWeather);
  const [forecast, setForecast] = useState(hourly);
  const [daily, setDaily] = useState(dailyForecast);

  if (!forecast.length || !daily.length) {
    const forecast = localStorage.getItem('forecast');
    const daily = localStorage.getItem('daily');

    try {
      const forecastData = JSON.parse(forecast);
      if (forecastData) setForecast(forecastData);

      const dailyData = JSON.parse(daily);
      if (dailyData) setDaily(dailyData);
    } finally {
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;

      setCurrent({
        ...current,
        location: { name: 'Current Location', lat, lon },
      });
    });
  }, []);

  useEffect(() => {
    async function getWeather() {
      const apiKey = '';
      const apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setCurrent(data.current);
      setForecast(data.hourly);

      localStorage.setItem('forecast', JSON.stringify(data.hourly));
    }
  }, []);

  return (
    <div>
      <div className="header">
        <div className="location">{current.location.name}</div>
        <div className="temp">{current.temp}</div>
        <div className="conditions">
          {current.cond == 0
            ? 'Sunny'
            : current.cond == 1
            ? 'Partly Cloudy'
            : current.cond == 2
            ? 'Cloudy'
            : current.cond == 3
            ? 'Light Rain'
            : current.cond == 4
            ? 'Rain'
            : current.cond == 5
            ? 'Heavy Rain'
            : current.cond == 6
            ? 'Thunder'
            : ''}
          <br />
          H:{current.range.max} L:{current.range.min}
        </div>
      </div>

      <div className="forecast">
        <div className="forecast-title">HOURLY FORECAST</div>
        <div className="scroller">
          <div className="forecast-list">
            {forecast.map(({ datetime, temperature }) => (
              <div className="forecast-item">
                <span>{datetime}</span>
                <span>
                  <Thunder />
                </span>
                <span>{temperature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="daily">
        <div className="daily-title">10-DAY FORECAST</div>
        <div className="daily-list">
          {daily.map(
            ({
              datetime,
              temp,
              range: { min, max },
              periodRange: { min: lowest, max: highest },
            }) => (
              <div className="daily-row">
                <div className="daily-time">{datetime}</div>

                <div className="daily-conditions">
                  <Rain />
                  <span className="probability">60%</span>
                </div>

                <div className="daily-range">
                  <span className="daily-min">{min}°</span>
                  <span className="range">
                    <span className="range-meter" />
                    <span className="range-current" />
                  </span>
                  <span className="daily-max">{max}°</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

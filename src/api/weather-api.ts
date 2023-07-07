import { CurrentForecastData, DailyForecastData, HourlyForecastData } from '../models/forecast';
import { currentWeather, dailyForecast, hourly } from './data';

type WeatherData = {
    current: CurrentForecastData,
    hourly: HourlyForecastData[],
    daily: DailyForecastData[],
}

export async function fetchWeatherData(): Promise<WeatherData> {
    // TODO: fix this

    // const apiKey = '';
    // const locationKey = '';
    // const apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

    // const response = await fetch(apiUrl);
    // const data = await response.json();


//   if (!forecast.length || !daily.length) {
//     const forecast = localStorage.getItem('forecast');
//     const daily = localStorage.getItem('daily');

//     try {
//       const forecastData = JSON.parse(forecast as string);
//       if (forecastData) setForecast(forecastData);

//       const dailyData = JSON.parse(daily as string);
//       if (dailyData) setDaily(dailyData);
//       // TODO fix it
//     } finally { /* empty */ }
//   }

    // TODO: return mocked data. fix types when real fetching data will be implemented
    return {
        current: currentWeather as unknown as CurrentForecastData,
        hourly: hourly as unknown as HourlyForecastData[],
        daily: dailyForecast as unknown as DailyForecastData[]
    }
}
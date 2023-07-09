import axios from 'axios';
import { DailyForecastData } from '../../models/forecast';
import { ACCU_WEATHER_API_KEY } from '../constants';
import { prepareWeatherCondition } from './utils/prepare-weather-condition';

type AccuWeatherDayData = {
  DailyForecasts: [
    {
      Temperature: {
        Minimum: {
          Value: number;
        };
        Maximum: {
          Value: number;
        };
      };
      // current weather conditions
      Day: {
        IconPhrase: string;
        PrecipitationProbability: number;
      };
      Date: string;
    },
  ];
};

const DAILY_FORECAST_API_BASE_URL =
  'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

export async function fetchDailyForecast(
  locationKey: string
): Promise<DailyForecastData[]> {
  const data = await axios.get<AccuWeatherDayData>(
    `${DAILY_FORECAST_API_BASE_URL}/${locationKey}`,
    {
      params: {
        apikey: ACCU_WEATHER_API_KEY,
        metric: true,
        details: true,
      },
    }
  );

  return data.data.DailyForecasts.map(({ Day, Temperature, Date: date }) => ({
    datetime: new Date(date),
    temperatureRange: {
      max: Math.round(Temperature.Maximum.Value),
      min: Math.round(Temperature.Minimum.Value),
    },
    conditions: prepareWeatherCondition(Day.IconPhrase),
    precipitationProbability: Day.PrecipitationProbability || undefined, // to avoid empty values
  }));
}

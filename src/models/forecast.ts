import { WeatherConditions } from './weather-conditions';

export type TemperatureRange = {
  min: number;
  max: number;
};

export type CurrentConditionsData = {
  datetime: Date;
  temperature: number;
  condition: WeatherConditions;
};

export type HourlyForecastData = {
  datetime: Date;
  temperature: number;
  conditions: WeatherConditions;
};

export type DailyForecastData = {
  datetime: Date;
  conditions: WeatherConditions;
  temperatureRange: TemperatureRange;
  precipitationProbability?: number;
};

import { WeatherConditions } from '../../../models/weather-conditions';

/*
    Prepare condition's name because AccuWeather support a lot of different weather conditions but app shows only 6
*/
export function prepareWeatherCondition(
  conditionName: string
): WeatherConditions {
  const preparedName = conditionName.toLowerCase();

  if (preparedName.includes('thunder')) {
    return WeatherConditions.THUNDER;
  }

  if (preparedName.includes('partly cloudy')) {
    return WeatherConditions.PARTLY_CLOUDY;
  }

  if (preparedName.includes('cloudy')) {
    return WeatherConditions.CLOUDY;
  }

  if (preparedName.includes('light rain')) {
    return WeatherConditions.LIGHT_RAIN;
  }

  if (preparedName.includes('heavy rain')) {
    return WeatherConditions.HEAVY_RAIN;
  }

  if (preparedName.includes('rain')) {
    return WeatherConditions.RAIN;
  }

  return WeatherConditions.SUNNY;
}

import { WeatherConditions } from '../../../models/weather-conditions';

export function getWeatherConditionName(condition: WeatherConditions): string {
  switch (condition) {
    case WeatherConditions.CLOUDY:
      return 'Cloudy';
    case WeatherConditions.THUNDER:
      return 'Thunder';
    case WeatherConditions.HEAVY_RAIN:
      return 'Heavy Rain';
    case WeatherConditions.LIGHT_RAIN:
      return 'Light Rain';
    case WeatherConditions.RAIN:
      return 'Rain';
    case WeatherConditions.SUNNY:
      return 'Sunny';
    case WeatherConditions.PARTLY_CLOUDY:
      return 'Partly Cloudy';
    default:
      return '';
  }
}

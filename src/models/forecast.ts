import { WeatherConditions } from './weather-conditions'

export type TemperatureRange = {
    min: number,
    max: number
}

export type CurrentForecastData = {
    temp: string,
    cond: WeatherConditions,
    range: TemperatureRange
}

export type HourlyForecastData = {
    datetime: string,
    temperature: string,
    conditions: WeatherConditions
}

export type DailyForecastData = {
    datetime: string, // TODO add types
    conditions: WeatherConditions,
    temp: number,
    range: TemperatureRange,
    periodRange: TemperatureRange
}
import axios from 'axios';
import { CurrentConditionsData, DailyForecastData, HourlyForecastData } from '../models/forecast';
import { ACCU_WEATHER_API_KEY } from './constants';
import { WeatherConditions } from '../models/weather-conditions';

type AccuWeatherCurrentConditionsData = {
    // current weather conditions
    WeatherText: string,
    Temperature: {
        Metric: {
            Value: number
        }
    },
    LocalObservationDateTime: string,
}

const CURRENT_CONDITIONS_API_BASE_URL = 'http://dataservice.accuweather.com/currentconditions/v1/'

export async function fetchCurrentConditions(locationKey: string): Promise<CurrentConditionsData> {
    const data = await axios.get<AccuWeatherCurrentConditionsData[]>(`${CURRENT_CONDITIONS_API_BASE_URL}/${locationKey}`, {params: {
        'apikey': ACCU_WEATHER_API_KEY,
        'metric': true
    }})

    const {LocalObservationDateTime, Temperature, WeatherText} = data.data[0];

    return {
        datetime: new Date(LocalObservationDateTime),
        temperature: Math.round(Temperature.Metric.Value),
        condition: prepareCondition(WeatherText),
    }
}

type AccuWeather1HourData = {
    // current weather conditions
    IconPhrase: string,
    Temperature: {
        Value: number
    },
    DateTime: string,
}

const HOURLY_FORECAST_API_BASE_URL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'

export async function fetchHourlyForecast(locationKey: string): Promise<HourlyForecastData[]> {
    const data = await axios.get<AccuWeather1HourData[]>(`${HOURLY_FORECAST_API_BASE_URL}/${locationKey}`, {params: {
        'apikey': ACCU_WEATHER_API_KEY,
        'metric': true
    }})

    return data.data.map(({IconPhrase, Temperature, DateTime}) => ({
        datetime: new Date(DateTime),
        temperature: Math.round(Temperature.Value),
        conditions: prepareCondition(IconPhrase),
    }))
}

type AccuWeatherDayData = {DailyForecasts: [{
    Temperature: {
        Minimum: {
            Value: number
        },
        Maximum: {
            Value: number
        }
    },
    // current weather conditions
    Day: {
        IconPhrase: string,
        PrecipitationProbability: number
    }
    Date: string
}]}

const DAILY_FORECAST_API_BASE_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'

export async function fetchDailyForecast(locationKey: string): Promise<DailyForecastData[]> {
    const data = await axios.get<AccuWeatherDayData>(`${DAILY_FORECAST_API_BASE_URL}/${locationKey}`, {params: {
        'apikey': ACCU_WEATHER_API_KEY,
        'metric': true,
        'details': true
    }})

    return data.data.DailyForecasts.map(({Day, Temperature, Date: date}) => ({
        datetime: new Date(date),
        temperatureRange: {
            max: Math.round(Temperature.Maximum.Value),
            min: Math.round(Temperature.Minimum.Value)
        },
        conditions: prepareCondition(Day.IconPhrase),
        precipitationProbability: Day.PrecipitationProbability || undefined, // to avoid empty values
    }))
}

/*
    Prepare condition's name because AccuWeather support a lot of different weather conditions but app shows only 6 conditions
*/
function prepareCondition(conditionName: string): WeatherConditions {
    const preparedName = conditionName.toLowerCase();

    if (preparedName.includes('thunder')) {
        return WeatherConditions.THUNDER
    }

    if (preparedName.includes('partly cloudy')) {
        return WeatherConditions.PARTLY_CLOUDY
    }

    if (preparedName.includes('cloudy')) {
        return WeatherConditions.CLOUDY
    }

    if (preparedName.includes('light rain')) {
        return WeatherConditions.LIGHT_RAIN
    }

    if (preparedName.includes('heavy rain')) {
        return WeatherConditions.HEAVY_RAIN
    }

    if (preparedName.includes('rain')) {
        return WeatherConditions.RAIN
    }

    return WeatherConditions.SUNNY
}

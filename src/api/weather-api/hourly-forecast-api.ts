import axios from 'axios'
import { HourlyForecastData } from '../../models/forecast'
import { ACCU_WEATHER_API_KEY } from '../constants'
import { prepareWeatherCondition } from './utils/prepare-weather-condition'

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
        conditions: prepareWeatherCondition(IconPhrase),
    }))
}

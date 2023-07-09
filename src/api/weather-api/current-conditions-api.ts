import axios from 'axios'
import { prepareWeatherCondition } from './utils/prepare-weather-condition'
import { ACCU_WEATHER_API_KEY } from '../constants'
import { CurrentConditionsData } from '../../models/forecast'

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
    const url = `${CURRENT_CONDITIONS_API_BASE_URL}/${locationKey}`
    const data = await axios.get<AccuWeatherCurrentConditionsData[]>(url, {
        params: {
            'apikey': ACCU_WEATHER_API_KEY,
            'metric': true
        }
    })

    const { LocalObservationDateTime, Temperature, WeatherText } = data.data[0];

    return {
        datetime: new Date(LocalObservationDateTime),
        temperature: Math.round(Temperature.Metric.Value),
        condition: prepareWeatherCondition(WeatherText),
    }
}
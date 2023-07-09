import axios from 'axios'
import { ACCU_WEATHER_API_KEY } from './constants'

type AccuWeatherLocationData = {
    Key: string,
    EnglishName: string
}

const LOCATION_API_BASE_URL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'

export async function fetchLocationInfo(lat: number, lon: number): Promise<{ name: string, code: string }> {
    const data = await axios.get<AccuWeatherLocationData>(LOCATION_API_BASE_URL, {
        params: {
            'apikey': ACCU_WEATHER_API_KEY,
            'q': `${lat},${lon}`
        }
    })

    return {
        name: data.data.EnglishName,
        code: data.data.Key
    }
}
import React, { FC, useMemo } from 'react'
import { DailyForecastData } from '../../models/forecast'
import { DailyRange } from './DailyRange/DailyRange'
import { WeatherConditionIcon } from '../WeatherConditionIcon/WeatherConditionIcon'
import { WeatherConditions } from '../../models/weather-conditions'
import classNames from 'classnames'
import { ReactComponent as CalendarSvg } from '../../icons/calendar.svg'
import s from './DailyForecast.module.css'

type DailyForecast = {
  className?: string
  currentTemp: number
  forecast: DailyForecastData[]
}

const CONDITIONS_WITH_RAIN = new Set([
  WeatherConditions.HEAVY_RAIN,
  WeatherConditions.LIGHT_RAIN,
  WeatherConditions.THUNDER,
  WeatherConditions.RAIN
])

export const DailyForecast: FC<DailyForecast> = ({ forecast, currentTemp, className }) => {
  const [lowest, highest] = useMemo(() => [
    Math.min(...forecast.map(data => data.temperatureRange.min)),
    Math.max(...forecast.map(data => data.temperatureRange.max))
  ], [forecast])

  return <div className={classNames(s.daily, className)}>
    <div className={s.dailyTitle}>
      <CalendarSvg className={s.titleIcon} />
      {forecast.length}-DAY FORECAST
    </div>
    <div className={s.forecast}>
      {forecast.map(
        ({
          datetime,
          conditions,
          temperatureRange: { min, max },
          precipitationProbability
        }, index) => (
          <>
            <div className={s.datetimeContainer}>
              {index === 0 ? 'Today' : datetime.toLocaleDateString('en-GB', { weekday: 'short' })}
            </div>
            <div className={s.conditionsContainer}>
              <div className={s.dailyConditions}>
                <WeatherConditionIcon condition={conditions} size='s' />
                {Boolean(precipitationProbability) && CONDITIONS_WITH_RAIN.has(conditions) &&
                  <span className={s.probability}>{precipitationProbability}%</span>
                }
              </div>
            </div>
            <div className={s.dailyRangeContainer}>
              <DailyRange
                min={min}
                max={max}
                lowest={lowest}
                highest={highest}
                current={index === 0 ? currentTemp : undefined}
              />
            </div>
          </>
        )
      )}
    </div>
  </div>
}
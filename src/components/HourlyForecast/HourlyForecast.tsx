import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { CurrentConditionsData, HourlyForecastData } from '../../models/forecast'
import classNames from 'classnames'
import { checkLeftScroll, checkRightScroll } from './utils/check-scrolls'
import { DESKTOP_MIN_WIDTH_PX } from '../../constants/media'
import { HourlyForecastItem } from './HourlyForecastItem/HourlyForecastItem'
import { SectionHeader } from '../SectionHeader/SectionHeader'
import s from './HourlyForecast.module.css'

type HourlyForecastProps = {
    className?: string
    current: CurrentConditionsData
    forecast: HourlyForecastData[]
}

const SCROLL_DELTA = 60;

export const HourlyForecast: FC<HourlyForecastProps> = ({ current, forecast, className }) => {
    const [areScrollControlsVisible, setAreScrollControlsVisible] = useState({ left: false, right: false })
    const listRef = useRef<HTMLDivElement>(null);

    const updateScrollsViewIfNeeded = useCallback((offset: number) => {
        if (
            window.innerWidth >= DESKTOP_MIN_WIDTH_PX
            && listRef.current
            && listRef.current.clientWidth < listRef.current.scrollWidth
        ) {
            setAreScrollControlsVisible({
                left: checkLeftScroll(listRef.current, offset),
                right: checkRightScroll(listRef.current, offset)
            })
        }
    }, [])

    useEffect(() => {
        updateScrollsViewIfNeeded(0)
    }, [])

    const onLeftClick = useCallback(() => {
        listRef.current?.scrollTo({ left: listRef.current.scrollLeft - SCROLL_DELTA, behavior: 'smooth' })
        updateScrollsViewIfNeeded(-SCROLL_DELTA)
    }, [])

    const onRightClick = useCallback(() => {
        listRef.current?.scrollTo({ left: listRef.current.scrollLeft + SCROLL_DELTA, behavior: 'smooth' })
        updateScrollsViewIfNeeded(SCROLL_DELTA)
    }, [])

    return <div className={classNames(s.forecast, className)}>
        <SectionHeader>HOURLY FORECAST</SectionHeader>
        <div className={s.forecastList} ref={listRef}>
            <HourlyForecastItem title='Now' condition={current.condition} temperature={current.temperature} />
            {forecast.map(({ datetime, temperature, conditions }) => (
                <HourlyForecastItem
                    key={datetime.getTime()}
                    title={datetime.toLocaleString('en-GB', { hour: 'numeric', hour12: true }).toUpperCase()}
                    condition={conditions}
                    temperature={temperature}
                />
            ))}
        </div>
        {areScrollControlsVisible.left && (
            <div className={classNames(s.scrollControl, s.scrollControlLeft)} onClick={onLeftClick}>{'<'}</div>
        )}
        {areScrollControlsVisible.right && (
            <div className={classNames(s.scrollControl, s.scrollControlRight)} onClick={onRightClick}>{'>'}</div>
        )}
    </div>
}
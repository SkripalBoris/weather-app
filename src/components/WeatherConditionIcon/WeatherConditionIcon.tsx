import React, { ComponentType, FC } from 'react';
import classNames from 'classnames'
import { WeatherConditions } from '../../models/weather-conditions';
import {ReactComponent as CloudySvg} from '../../icons/cloudy.svg'
import {ReactComponent as HeavyRainSvg} from '../../icons/heavy-rain.svg'
import {ReactComponent as LightRainSvg} from '../../icons/light-rain.svg'
import {ReactComponent as NightCloudySvg} from '../../icons/night-cloudy.svg'
import {ReactComponent as PartlyCloudySvg} from '../../icons/partly-cloudy.svg'
import {ReactComponent as RainSvg} from '../../icons/rain.svg'
import {ReactComponent as SunnySvg} from '../../icons/sunny.svg'
import {ReactComponent as ThunderSvg} from '../../icons/thunder.svg'
import { getTimePeriod } from '../../utils/getTimePeriod';
import s from './WeatherConditionIcon.module.css'

type WeatherConditionIconProps = {
    condition: WeatherConditions,
    size: 's' | 'm',
    allowNight?: boolean
    className?: string
}

export const WeatherConditionIcon: FC<WeatherConditionIconProps> = ({className, condition, size, allowNight}) => {
    let Component: ComponentType<{className?: string, 'data-size'?: string}>

    switch(condition) {
        case WeatherConditions.CLOUDY: {
            if (allowNight && getTimePeriod(new Date()) === 'night') {
                Component = NightCloudySvg
            } else {
                Component = CloudySvg
            }
            break
        }
        case WeatherConditions.HEAVY_RAIN:
            Component = HeavyRainSvg
            break
        case WeatherConditions.LIGHT_RAIN:
            Component = LightRainSvg
            break
        case WeatherConditions.PARTLY_CLOUDY:
            Component = PartlyCloudySvg
            break
        case WeatherConditions.RAIN:
            Component = RainSvg
            break
        case WeatherConditions.SUNNY:
            Component = SunnySvg
            break
        case WeatherConditions.THUNDER:
            Component = ThunderSvg
            break
    }


    return <Component className={classNames(s.icon, className)} data-size={size} />
}
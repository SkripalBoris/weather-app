import React, { FC, useEffect, useState } from 'react';
import {ReactComponent as PartlyCloudySvg} from '../../icons/partly-cloudy.svg'
import {ReactComponent as GlobeSvg} from '../../icons/globe.svg'
import s from './LoadingPage.module.css'
import { LoadingStages } from './constants';

type LoadingPageProps = {
    positionLoading: boolean
}

export const LoadingPage: FC<LoadingPageProps> = ({positionLoading}) => {
    const [stage, setStage] = useState(LoadingStages.EMPTY)

    useEffect(() => {
        const timeout = setTimeout(() => {
            let nextStage: LoadingStages

            if (!positionLoading) {
                nextStage = LoadingStages.LOCATION
            } else {
                nextStage = LoadingStages.WEATHER
            }

            if (stage !== nextStage) {
                setStage(nextStage)
            }
        }, 50)

        return () => clearTimeout(timeout)
    }, [positionLoading])

    if (stage === LoadingStages.EMPTY) {
        return null
    }

    return <>
        <div className={s.header}>
            <div className={s.title}>Fetching</div>
            {positionLoading ? <GlobeSvg className={s.icon} /> : <PartlyCloudySvg className={s.icon} />}
        </div>
        
        <div className={s.hourly}></div>
        <div className={s.daily}></div>
    </>
}
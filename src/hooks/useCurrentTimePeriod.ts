import { useEffect, useState } from 'react'
import { TimePeriod, getTimePeriod } from '../utils/getTimePeriod';


export function useCurrentTimePeriod(): TimePeriod {
    const [timePeriod, setCurrentTimePeriod] = useState(getTimePeriod(new Date()));

    useEffect(() => {
        const periodInterval = setInterval(() => {
            const newPeriod = getTimePeriod(new Date());

            if (newPeriod !== timePeriod) {
                setCurrentTimePeriod(newPeriod)
            }
        }, 60 * 1000);

        return () => clearInterval(periodInterval)
    }, [timePeriod])

    return timePeriod;
}

import { useEffect, useState } from 'react'

export type TimePeriod = 'morning' | 'day' | 'evening' | 'night'

export function useCurrentTimePeriod(): TimePeriod {
    const [timePeriod, setCurrentTimePeriod] = useState(getCurrentTimePeriod());

    useEffect(() => {
        const periodInterval = setInterval(() => {
            const newPeriod = getCurrentTimePeriod();

            if (newPeriod !== timePeriod) {
                setCurrentTimePeriod(newPeriod)
            }
        }, 60 * 1000);

        return () => clearInterval(periodInterval)
    }, [timePeriod])

    return timePeriod;
}

function getCurrentTimePeriod(): TimePeriod {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();

    if (currentHours >= 5 && currentHours < 11) {
        return 'morning'
    }

    if (currentHours >= 11 && currentHours < 17) {
        return 'day'
    }

    if (currentHours >= 17 && currentHours < 21) {
        return 'evening'
    }

    return 'night'
}
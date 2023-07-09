import React, { FC } from 'react';
import { CurrentConditions } from '../../components/CurrentConditions/CurrentConditions';
import { DailyForecast } from '../../components/DailyForecast/DailyForecast';
import { HourlyForecast } from '../../components/HourlyForecast/HourlyForecast';
import {
  CurrentConditionsData,
  HourlyForecastData,
  DailyForecastData,
} from '../../models/forecast';
import { LocationData } from '../../models/location';
import { MainPageLayout } from '../../layouts/MainPageLayout';

type ForecastPageProps = {
  current: CurrentConditionsData;
  hourly: HourlyForecastData[];
  daily: DailyForecastData[];
  currentLocation: LocationData;
};

export const ForecastPage: FC<ForecastPageProps> = ({
  current,
  hourly,
  daily,
  currentLocation,
}) => {
  return (
    <MainPageLayout
      firstSection={
        <CurrentConditions
          forecast={current}
          locationData={currentLocation}
          temperatureRange={daily[0].temperatureRange}
        />
      }
      secondSection={<HourlyForecast current={current} forecast={hourly} />}
      thirdSection={
        <DailyForecast forecast={daily} currentTemp={current.temperature} />
      }
    />
  );
};

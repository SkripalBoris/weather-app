import { DataWithStatus } from '../types/data-wrappets';

export type LocationData = {
  lat: number;
  lon: number;
  name: string;
  code: string;
};

export type LocationDataWithStatus = DataWithStatus<LocationData>;

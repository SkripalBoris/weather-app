import { DataStatuses } from '../models/data-statuses'

export type DataWithStatus<T> = {
    status: DataStatuses,
    data: T
} | {status: DataStatuses.EMPTY_FALLBACK}
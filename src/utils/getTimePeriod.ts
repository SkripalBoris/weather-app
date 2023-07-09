export type TimePeriod = 'morning' | 'day' | 'evening' | 'night';

export function getTimePeriod(date: Date): TimePeriod {
  const currentHours = date.getHours();

  if (currentHours >= 5 && currentHours < 11) {
    return 'morning';
  }

  if (currentHours >= 11 && currentHours < 17) {
    return 'day';
  }

  if (currentHours >= 17 && currentHours < 21) {
    return 'evening';
  }

  return 'night';
}

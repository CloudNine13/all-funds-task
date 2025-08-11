import { LOCALE_ES_ES, TIME_ZONE_EUROPE_MADRID } from './constants';

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const options = {
    timeZone: TIME_ZONE_EUROPE_MADRID,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const
  };
  const formattedDate = new Intl.DateTimeFormat(LOCALE_ES_ES, options).format(date);
  return formattedDate;
};

export { formatTimestamp };

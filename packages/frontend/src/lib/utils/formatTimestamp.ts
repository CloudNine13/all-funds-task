const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const options = {
    timeZone: 'Europe/Madrid' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate;
};

export { formatTimestamp };

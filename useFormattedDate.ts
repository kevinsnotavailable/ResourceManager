import { format } from 'date-fns';
import { useStore } from '../store';

export function useFormattedDate() {
  const dateFormat = useStore((state) => state.settings.dateFormat);

  const getDateFormat = (includeTime: boolean = false) => {
    const timeFormat = includeTime ? ' h:mm aa' : '';
    return dateFormat === 'US' 
      ? `MM/dd/yyyy${timeFormat}`  // US: MM/DD/YYYY
      : `dd/MM/yyyy${timeFormat}`; // UK: DD/MM/YYYY
  };

  const getFullDateFormat = (includeTime: boolean = false) => {
    const timeFormat = includeTime ? ' h:mm aa' : '';
    return dateFormat === 'US'
      ? `MMMM d, yyyy${timeFormat}`  // US: Month Day, Year
      : `d MMMM yyyy${timeFormat}`;  // UK: Day Month Year
  };

  return {
    format: (date: Date, includeTime: boolean = false) => {
      return format(date, getDateFormat(includeTime));
    },
    formatFull: (date: Date, includeTime: boolean = false) => {
      return format(date, getFullDateFormat(includeTime));
    }
  };
}
import { format, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Formats the date and time in the Kyiv time zone.
 * @param {string} [time] - The date in 'dd.MM.yyyy' format. If not provided, the current date is used.
 * @returns {string} - The date and time in 'dd.MM.yyyy-HH:mm' format.
 */
export const timeNowFormat = (time?: `${number}.${number}.${number}`): string => {
    const timeZone = 'Europe/Kyiv';
    
    // If time is provided, parse it, otherwise use the current date
    let date: Date;
    if (time) {
        // Parse the string in 'dd.MM.yyyy' format
        date = parse(time, 'dd.MM.yyyy', new Date());
    } else {
        date = new Date(); // Current date
    }
    
    // Convert to the appropriate time zone
    const zonedDate = toZonedTime(date, timeZone);
    
    // Format the date along with the time
    const formattedDate = format(zonedDate, 'dd.MM.yyyy-HH:mm');
    
    return formattedDate;
};

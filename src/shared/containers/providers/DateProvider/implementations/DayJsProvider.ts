import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../models/IDateProvider';

dayjs.extend(utc);

export class DayJsProvider implements IDateProvider {
  compareDateInHours(startDate: Date, endDate: Date): number {
    const endDateFormatToUtc = this.convertDateToUtc(endDate);
    const startDateFormatToUtc = this.convertDateToUtc(startDate);

    return dayjs(endDateFormatToUtc).diff(startDateFormatToUtc, 'hours');
  }

  convertDateToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  currentDate(): Date {
    return dayjs().toDate();
  }
}

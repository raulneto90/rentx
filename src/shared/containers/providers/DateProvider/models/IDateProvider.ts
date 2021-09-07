export interface IDateProvider {
  compareDateInHours(startDate: Date, endDate: Date): number;
  convertDateToUtc(date: Date): string;
  currentDate(): Date;
}

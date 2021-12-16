export enum TimePeriod {
  Day,
  Month,
  Week,
  Year,
}

export interface ChainDateType {
  add(value: number, period: TimePeriod, restrictToMonth?: boolean): this;
  clone(): ChainDateType;
  date: Date;
  endOfMonth(): ChainDateType;
  endOfYear(): ChainDateType;
  format(): string;
  getDate(): number;
  getDay(): number;
  getFullYear(): number;
  getMonth(): number;
  regenDate(): void;
  setDay(day: number): this;
  setFullDate(year: number, month: number, day: number): this;
  setMonth(month: number, restrictToMonth?: boolean): this;
  setYear(year: number, restrictToMonth?: boolean): this;
  startOfMonth(): ChainDateType;
  startOfYear(): ChainDateType;
}

export const ChainDate = class implements ChainDateType {
  public date;

  constructor(date?: Date | string) {
    this.date = date && date instanceof Date ? new Date(date) : new Date();
    if (date && !(date instanceof Date)) {
      let dateParts;
      if (typeof date === 'string' && date.length === 10) {
        // String should be in YYYY-MM-DD format
        dateParts = date.split('-');
        if (dateParts.length === 3) {
          // Array should be in ['YYYY', 'MM', 'DD'] format
          this.setFullDate(+dateParts[0], +dateParts[1], +dateParts[2]);
          this.date.setHours(0, 0, 0, 0);
          this.regenDate();
        }
      }
    }
  }

  add = (value: number, period: TimePeriod, restrictToMonth = false): this => {
    switch (period) {
      case TimePeriod.Year:
        this.setYear(this.date.getFullYear() + value, restrictToMonth);
        break;
      case TimePeriod.Month:
        this.setMonth(this.date.getMonth() + 1 + value, restrictToMonth);
        break;
      case TimePeriod.Week:
        this.date.setDate(this.date.getDate() + value * 7);
        break;
      case TimePeriod.Day:
        this.date.setDate(this.date.getDate() + value);
        break;
    }
    this.regenDate();
    return this;
  };

  clone = (): ChainDateType => {
    return new ChainDate(this.date);
  };

  endOfMonth = () => {
    this.date.setFullYear(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    this.regenDate();
    return this;
  };

  endOfYear = () => {
    this.date.setFullYear(this.date.getFullYear(), 12, 0);
    this.regenDate();
    return this;
  };

  format = () => {
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    return [this.date.getFullYear(), month < 10 ? '0' + month : month, day < 10 ? '0' + day : day].join('-');
  };

  getDate = () => {
    return this.date.getDate();
  };

  getDay = () => {
    return this.date.getDay();
  };

  getFullYear = () => {
    return this.date.getFullYear();
  };

  getMonth = () => {
    return this.date.getMonth() + 1;
  };

  regenDate = () => {
    this.date = new Date(this.date);
  };

  setDay = (day: number) => {
    this.date.setDate(day);
    this.regenDate();
    return this;
  };

  setFullDate = (year: number, month: number, day: number) => {
    this.date.setFullYear.apply(this.date, [year, month - 1, day]);
    this.regenDate();
    return this;
  };

  setMonth = (month: number, restrictToMonth = false) => {
    let endOfMonth;
    if (restrictToMonth && this.getDate() > 28) {
      endOfMonth = this.clone().setFullDate(this.getFullYear(), month + 1, 0);
    }
    this.date.setMonth(month - 1);
    this.regenDate();
    if (restrictToMonth && endOfMonth && this.getMonth() !== month) {
      this.date = endOfMonth.date;
    }
    return this;
  };

  setYear = (year: number, restrictToMonth = false) => {
    let endOfMonth;
    if (restrictToMonth && this.getDate() > 28) {
      endOfMonth = this.clone().setFullDate(year, this.getMonth() + 1, 0);
    }
    this.date.setFullYear(year);
    this.regenDate();
    if (restrictToMonth && endOfMonth && this.getMonth() !== endOfMonth.getMonth()) {
      this.date = endOfMonth.date;
    }
    return this;
  };

  startOfMonth = () => {
    this.date.setFullYear(this.getFullYear(), this.date.getMonth(), 1);
    this.regenDate();
    return this;
  };

  startOfYear = () => {
    this.date.setFullYear(this.getFullYear(), 0, 1);
    this.regenDate();
    return this;
  };
};

export default ChainDate;

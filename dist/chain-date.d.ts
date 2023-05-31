export declare enum TimePeriod {
    Day = 0,
    Month = 1,
    Week = 2,
    Year = 3
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
export declare const ChainDate: {
    new (date?: Date | string): {
        date: Date;
        add: (value: number, period: TimePeriod, restrictToMonth?: boolean) => this;
        clone: () => ChainDateType;
        endOfMonth: () => any;
        endOfYear: () => any;
        format: () => string;
        getDate: () => number;
        getDay: () => number;
        getFullYear: () => number;
        getMonth: () => number;
        regenDate: () => void;
        setDay: (day: number) => any;
        setFullDate: (year: number, month: number, day: number) => any;
        setMonth: (month: number, restrictToMonth?: boolean) => any;
        setYear: (year: number, restrictToMonth?: boolean) => any;
        startOfMonth: () => any;
        startOfYear: () => any;
    };
};
export default ChainDate;

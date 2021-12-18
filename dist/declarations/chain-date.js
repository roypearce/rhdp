export var TimePeriod;
(function (TimePeriod) {
    TimePeriod[TimePeriod["Day"] = 0] = "Day";
    TimePeriod[TimePeriod["Month"] = 1] = "Month";
    TimePeriod[TimePeriod["Week"] = 2] = "Week";
    TimePeriod[TimePeriod["Year"] = 3] = "Year";
})(TimePeriod || (TimePeriod = {}));
export const ChainDate = class {
    date;
    constructor(date) {
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
    add = (value, period, restrictToMonth = false) => {
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
    clone = () => {
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
    setDay = (day) => {
        this.date.setDate(day);
        this.regenDate();
        return this;
    };
    setFullDate = (year, month, day) => {
        this.date.setFullYear.apply(this.date, [year, month - 1, day]);
        this.regenDate();
        return this;
    };
    setMonth = (month, restrictToMonth = false) => {
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
    setYear = (year, restrictToMonth = false) => {
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
//# sourceMappingURL=chain-date.js.map
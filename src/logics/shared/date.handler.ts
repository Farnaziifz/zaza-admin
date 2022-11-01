// eslint-disable-next-file @typescript-eslint/ban-ts-comment
import pd from 'persian-date'
import _ from 'lodash'
import {reportPeriodType} from "@/core/enums/reportType.enum";
import momentJalali, {unitOfTime} from 'jalali-moment'


export const getPersianNameOfMonth = (date: string, format:string) => {
    return momentJalali(date, format).locale("fa").format("jMMMM")
}

export const getAllDaysInPeriodQuery = (type: reportPeriodType) => {
    let stepCount = 0;
    let step: unitOfTime.StartOf = "jDay";
    switch (type) {
        case 'WEEKLY':
            stepCount = 7;
            break
        case 'MONTHLY':
            stepCount = 30;
            break
        case 'ANNUAL':
            stepCount = 12;
            step = "jMonth";
            break
    }

    const currentDate = momentJalali().clone()
    const range = []

    const format = 'YYYY/MM/DDTHH:mm:ss'
    for (let i = 0; i < stepCount; i++) {
        range.push({
            from: currentDate.utc().startOf(step).format(format),
            to: currentDate.utc().endOf(step).format(format),
        })
        currentDate.add(-1, step)
    }

    return range.reduce((previousValue, currentValue, index) => previousValue + `Ranges[${index}].From=${currentValue.from}&Ranges[${index}].To=${currentValue.to}&`, `?Format=yyyy/MM/ddTHH:mm:ss&`)
}


export const convertDateFromPersianToGeorgian = (
    date: string
): Date | undefined =>
    new pd(date.split('/').map((x: string) => _.toNumber(x))).toDate()

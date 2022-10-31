// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'
import _ from 'lodash'
import {reportPeriodType} from "@/core/enums/reportType.enum";
import momentJalali, {unitOfTime} from 'jalali-moment'
import moment from 'moment'


export const getAllDaysInPeriodQuery = (type: reportPeriodType) => {
    let momentStartOfType: unitOfTime.StartOf = 'weeks'
    let step: unitOfTime.DurationConstructor = 'jD'
    let diffUnit: unitOfTime.Diff = 'days'
    switch (type) {
        case 'WEEKLY':
            momentStartOfType = 'jw'
            break
        case 'MONTHLY':
            momentStartOfType = 'jMonth'
            break
        case 'ANNUAL':
            momentStartOfType = 'jYear'
            step = 'jMonth'
            diffUnit = 'month'
            break
    }

    const format = 'yyyy/MM/DD-hh:mm:ss'
    const startOfRange = momentJalali().utc().startOf(momentStartOfType)
    const today = momentJalali().utc().startOf(step)
    const startOfRangeDiffUntilNow = today.diff(startOfRange, diffUnit)

    const range: { from: Date; to: Date }[] = []
    const currentDate = startOfRange.clone()

    //TODO MAHDI
    for (let i = 0; i <= startOfRangeDiffUntilNow; i++) {
        range.push({
            from: currentDate.startOf(step).startOf('jDay').toDate(),
            to: currentDate.endOf(step).startOf('jDay').toDate(),
        })
        currentDate.add(1, step)
    }


    let q = `?Format=${format}&`
    range.forEach((el, index) => {
        q += `Ranges[${index}].From=${moment(el.from).format(
            format
        )}&Ranges[${index}].To=${moment(el.to).format(format)}&`
    })
    return q
}


export const convertDateFromPersianToGeorgian = (
    date: string
): Date | undefined =>
    new pd(date.split('/').map((x: string) => _.toNumber(x))).toDate()

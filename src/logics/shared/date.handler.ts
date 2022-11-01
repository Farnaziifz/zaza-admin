// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'
import _ from 'lodash'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import momentJalali from 'jalali-moment'

export const getAllDaysInPeriodQuery = (type: reportPeriodType) => {
  let stepCount = 0
  let step = 'd'
  switch (type) {
    case 'WEEKLY':
      stepCount = ((momentJalali().isoWeekday() + 2) % 7) - 1
      break
    case 'MONTHLY':
      stepCount = momentJalali().jDate() - 1
      break
    case 'ANNUAL':
      stepCount = momentJalali().jMonth()
      step = 'jMonth'
      break
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const startOfRange = momentJalali().add(-stepCount, step)
  const currentDate = startOfRange.clone()
  const range = []

  const format = 'yyyy/MM/DD-HH:mm:ss'
  for (let i = 0; i < stepCount; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    range.push({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      from: currentDate.startOf(step).utc().startOf('days').format(format),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      to: currentDate.endOf(step).utc().endOf('days').format(format),
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentDate.add(1, step)
  }

  return range.reduce(
    (previousValue, currentValue, index) =>
      previousValue +
      `Ranges[${index}].From=${currentValue.from}&Ranges[${index}].To=${currentValue.to}&`,
    `?Format=${format}&`
  )
}

export const convertDateFromPersianToGeorgian = (
  date: string
): Date | undefined =>
  new pd(date.split('/').map((x: string) => _.toNumber(x))).toDate()

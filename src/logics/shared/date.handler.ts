// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'
import _ from 'lodash'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import momentJalali, { unitOfTime } from 'jalali-moment'
import { getSelectedLanguage } from 'vui18n'
import {
  queryDateClientFormat,
  queryDateServerFormat,
} from '@/core/constants/date.options'

export const getPersianNameOfMonth = (date: string, format: string) =>
  momentJalali(date, format).locale(getSelectedLanguage().code).format('jMMMM')

export const convertDateArrayToDateString = (dateArray: Date[] | string[]) => {
  if (!_.isEmpty(dateArray)) {
    if (dateArray[0] instanceof Date) {
      return `${new pd(dateArray[0])
        .toLocale('fa')
        .format('YYYY/MM/DD')}, ${new pd(dateArray[1])
        .toLocale('fa')
        .format('YYYY/MM/DD')}`
    }

    return `${new pd(convertDateFromPersianToGeorgian(dateArray[0]))
      .toLocale('fa')
      .format('YYYY/MM/DD')}, ${new pd(
      convertDateFromPersianToGeorgian(dateArray[1] as string)
    )
      .toLocale('fa')
      .format('YYYY/MM/DD')}`
  }

  return ``
}

export const convertDateFromPersianToGeorgian = (
  date: string
): Date | undefined =>
  new pd(date.split('/').map((x: string) => _.toNumber(x))).toDate()

export const getAllDaysInPeriodQuery = (type: reportPeriodType) => {
  let stepCount = 0
  let step: unitOfTime.StartOf = 'jDay'
  switch (type) {
    case reportPeriodType.WEEKLY:
      stepCount = 7
      break
    case reportPeriodType.MONTHLY:
      stepCount = 30
      break
    case reportPeriodType.ANNUAL:
      stepCount = 12
      step = 'jMonth'
      break
  }

  const currentDate = momentJalali().clone()
  const range = []

  for (let i = 0; i < stepCount; i++) {
    range.push({
      from: currentDate.utc().startOf(step).format(queryDateClientFormat),
      to: currentDate.utc().endOf(step).format(queryDateClientFormat),
    })
    currentDate.add(-1, step)
  }

  return range.reduce(
    (previousValue, currentValue, index) =>
      previousValue +
      `Ranges[${index}].From=${currentValue.from}&Ranges[${index}].To=${currentValue.to}&`,
    `?Format=${queryDateServerFormat}&`
  )
}

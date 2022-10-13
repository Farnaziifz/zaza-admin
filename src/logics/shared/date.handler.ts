// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'
import _ from 'lodash'

export const convertDateFromPersianToGeorgian = (date: string): Date | undefined =>
    new pd(date.split('/').map((x: string) => _.toNumber(x))).toDate()

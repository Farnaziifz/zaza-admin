import _ from 'lodash'

export const convertFieldToNumber = <T extends object>(
  fieldName: string,
  data: T[]
): void => {
  data.forEach((el) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[fieldName] = _.toNumber(el[fieldName])
  })
}

import { filter } from '@/core/types/filter.type'

export const filterQueryBuilder = (filters: filter[]) => {
  let q = ''
  filters.forEach((el, index) => {
    q += `FilterModels[${index}].field=${el.field}&FilterModels[${index}].operand=${el.operand}&FilterModels[${index}].value=${el.value}&`
  })
  return q
}
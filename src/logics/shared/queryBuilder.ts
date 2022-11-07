export type queryFilter = {
  field: string
  operand: '==' | '>=' | '<=' | '<' | '>'
  value: string
}

export type querySearch = {
  keyword: string
  field: string
}

export type querySort = {
  field: string
  order: 'ASC' | 'DESC'
}

export enum queryType {
  SORT = 'SORT',
  SEARCH = 'SEARCH',
  FILTER = 'FILTER',
}

export type queryList = {
  type: queryType
  data: querySort | queryFilter | querySearch
}[]

export const createFilterQuery = (model: queryFilter, index = 0) =>
  `FilterModels[${index}].value=${model.value}&FilterModels[${index}].operand=${model.operand}&FilterModels[${index}].field=${model.field}&`

export const createSearchQuery = (model: querySearch, index = 0) =>
  `SearchModels[${index}].field=${model.field}&SearchModels[${index}].keyword=${model.keyword}&`

export const createSortQuery = (model: querySort, index = 0) =>
  `SortModels[${index}].field=${model.field}&SortModels[${index}}.order=${model.order}&`

export const createFilterQueryString = (filterArray: queryFilter[]) =>
  filterArray.reduce(
    (acc, cur, index) => (acc += createFilterQuery(cur, index)),
    ''
  )

export const createSearchQueryString = (searchArray: querySearch[]) =>
  searchArray.reduce(
    (acc, cur, index) => (acc += createSearchQuery(cur, index)),
    ''
  )

export const createSortQueryString = (sortArray: querySort[]) =>
  sortArray.reduce(
    (acc, cur, index) => (acc += createSortQuery(cur, index)),
    ''
  )

export const createQueryString = (queryArray: queryList) => {
  const sortArray: querySort[] = queryArray
    .filter((el) => el.type === queryType.SORT)
    .map((el) => el.data) as querySort[]
  const searchArray: querySearch[] = queryArray
    .filter((el) => el.type === queryType.SEARCH)
    .map((el) => el.data) as querySearch[]
  const filterArray: queryFilter[] = queryArray
    .filter((el) => el.type === queryType.FILTER)
    .map((el) => el.data) as queryFilter[]

  let q = ``
  if (sortArray) q += createSortQueryString(sortArray)
  if (searchArray) q += createSearchQueryString(searchArray)
  if (filterArray) q += createFilterQueryString(filterArray)

  return q
}

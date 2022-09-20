type filterModel = {
  field: string
  operand: '==' | '>=' | '<=' | '<' | '>'
  value: string
}

type searchModel = {
  keyword: string
  field: string
}

type sortModel = {
  field: string
  order: 'ASC' | 'DESC'
}

export const createFilterModel = (model: filterModel, index = 0) => {
  let queryString = ''
  let i = 0
  for (const key in model) {
    queryString += `FilterModels[${index}].${key}=${model[key]}`
    if (i < 2) {
      queryString += '&'
      i++
    }
  }
  return queryString
}

export const createSearchModel = (model: searchModel, index = 0) => {
  let queryString = ''
  let i = 0
  for (const key in model) {
    queryString += `SearchModels[${index}].${key}=${model[key]}`
    if (i < 1) {
      queryString += '&'
      i++
    }
  }
  return queryString
}

//SortModels[0].field=CreatedAt&SortModels[0].order=ASC
export const createSortModel = (model: sortModel, index = 0) => {
  let queryString = ''
  let i = 0
  for (const key in model) {
    queryString += `SortModels${index}.${key}=${model[key]}`
    if (i < 1) {
      queryString += '&'
      i++
    }
  }

  return queryString
}

// const arr = [
//     { field: 'test1', order: 'test2', type: 'SortModels' },
//     { field: 'test3', keyword: 'test4', type: 'SearchModels' },
//     {
//       field: 'test5',
//       operand: 'test6',
//       value: 'test7',
//       type: 'FilterModels',
//     },
//   ]
//
//let qS = ''
//
// arr.forEach((el, index) => {
//     if (!(index === 0 || index < arr.length - 1)) qS += '&'
//     let i = 0
//     let sortM = 0
//     let searchM = 0
//     let filterM = 0
//     for (const key in el) {
//       if (key !== 'type') {
//         qS += `${el.type}[${index}].${key}=${el[key]}`

//         if (i < Object.keys(el).length) {
//           qS += '&'
//           i++
//         }
//       }
//     }
//   })

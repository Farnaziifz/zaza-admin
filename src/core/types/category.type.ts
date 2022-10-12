export type category = {
  id: string
  parentId?: null
  title: string
  level: number
  description?: null
  isLeaf?: true
  host?: null
  path?: null
  imageId?: null
  children?: []
  key?: string
}

export type categoryList = {
  items: category[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

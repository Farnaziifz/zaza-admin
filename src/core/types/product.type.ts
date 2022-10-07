export type products = {
  id: string
  title: string
  price: number
  discount: number
  host?: string
  path?: string
  imageId?: string
}

export type productsList = {
  items: products[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

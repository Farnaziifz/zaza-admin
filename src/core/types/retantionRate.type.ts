export type retantionRate = {
  fullName: string
  numberOfOrder: number
  totalExpenses: number
  customerType: string
}

export type retantionRateCustomerList = {
  items: retantionRate[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

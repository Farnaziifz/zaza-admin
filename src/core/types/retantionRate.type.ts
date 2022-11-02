export type retantionRate = {
  fullName: string
  numberOfOrder: number
  totalExpenses: number
  customerType: string
}

export type retantionRateSetting = {
  type?: string
  weekCount?: number
  heroValueCount?: number
  loyalValueCount?: number
}

export type retantionRateCustomerList = {
  items: retantionRate[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

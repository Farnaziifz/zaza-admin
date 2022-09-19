export type copouns = {
  fullName: string
  createdAt: number
  numberOfOrder: number
  totalExpenses: number
  value: number
  orderLabel: string
  DegreeLabel: string
  isActive: boolean
}

export type copounsList = {
  items: copouns[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

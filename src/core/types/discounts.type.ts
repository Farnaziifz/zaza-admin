export type discounts = {
  title: string
  type: string
  consumeType: string
  stateType: string
  amount: number
  startAt: string
  expireAt: string
  customersCount: number
  groupIds: []
  promotionSteps?: {
    order?: number
    amount?: number
  }
  isActive: boolean
}

export type discountsList = {
  items: discounts[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

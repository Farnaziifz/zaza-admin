type group = {
  groupId: ''
  groupTitle: ''
}

export type credit = {
  amount: number
  startAt?: Date | string
  expireAt?: Date | string
  creditGroups?: { groupId: string }[]
}

export type credits = {
  amount: number
  startAt: string
  expireAt: string
  groups: group[]
  fullName: string
  mobileNumber: number
}

export type creditsList = {
  items: credits[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type creditCustomer = {
  fullName: string
  mobileNumber: number
}
export type creditCustomerGroup = {
  items: creditCustomer[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

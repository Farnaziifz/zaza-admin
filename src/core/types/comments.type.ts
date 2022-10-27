export type comments = {
  id?: string
  fullName: string
  trackingCode: string
  orderId: string
  rate: number
  comment: string
}
export type commentList = {
  items: comments[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type commnetProduct = {
  title: string
  price: number
  count: number
  id: string
}

export type comments = {
  id?: string
  fullName?: string
  trackingCode?: string
  orderId?: string
  rate?: number
  comment?: string
  createdAt?: string
  finalPrice?: number
  products?: commnetProduct[]
}
export type commentList = {
  items: comments[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
export type detailComment = {
  id: string
  parentId?: string
  rate?: number
  comment?: string
  productTitle?: string
  createdAt?: string
}
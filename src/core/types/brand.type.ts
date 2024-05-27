export type brandItem = {
  id: number
  created_at: string
  updated_at: string
  title: string
  description: string
  image: string
  seo_title: string
  seo_description: string
}

export type brandList = {
  count: number
  total_pages: number | undefined
  next: boolean | null
  previous: boolean | null
  current_page: number
  results: brandItem[]
}

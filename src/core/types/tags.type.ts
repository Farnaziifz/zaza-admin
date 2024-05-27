export type tag = {
  id: number
  created_at: string
  updated_at: string
  title: string
  seo_slug: string
  seo_title: string
  seo_description: string
}

export type tagList = {
  count: number
  total_pages: number | undefined
  next: boolean | null
  previous: boolean | null
  current_page: number
  results: tag[]
}

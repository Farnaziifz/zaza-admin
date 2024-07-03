export type blog = {
  id: number
  all_comments_count: number
  approved_comments_count: number
  not_approved_comments_count: number
  aggregate_rate: number
  persian_created_at: string
  persian_updated_at: string
  created_at: string
  updated_at: string
  title: string
  blog: string
  thumbnail: string
  status: string
  publish_at: string
  seo_slug: string
  seo_title: string
  seo_description: string
}

export type blogList = {
  count: number
  total_pages: number | undefined
  next: boolean | null
  previous: boolean | null
  current_page: number
  results: blog[]
}

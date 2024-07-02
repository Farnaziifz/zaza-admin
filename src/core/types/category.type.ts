type banner = {
  title: string
  url: string
  image: string
}

export type category = {
  id: 10
  created_at: string
  updated_at: string
  title_main: string
  short_description_main: string
  description_main: string
  thumbnail_main: string
  title_blog: string
  title_service: string
  title_product: string
  is_special: false
  seo_slug: string
  seo_title: string
  seo_description: string
  banner_main: banner[]
  children: category[]
}

export type categoryList = {
  count: number
  total_pages: number
  next: number
  previous: number
  current_page: number
  results: category[]
}

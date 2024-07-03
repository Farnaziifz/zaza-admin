export type banner = {
  title: string
  url: string
  image: string
  id?: number
}

export type category = {
  id?: number
  title_main: string
  short_description_main: string
  description_main: string
  thumbnail_main: string
  title_blog: string
  title_service: string
  title_product: string
  is_special: boolean
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
export type bannerList = {
  count: number
  total_pages: number
  next: number
  previous: number
  current_page: number
  results: banner[]
}

import Banner from '@/presentation/pages/Banner/banner.vue'
import BannerList from '@/presentation/pages/Banner/list.vue'

export const bannerConfig = {
  name: 'banner',
  path: 'banner',
  component: Banner,
  redirect: '/dashboard/banner/list',
  children: [
    {
      name: 'banner-list',
      path: 'list',
      component: BannerList,
    },
  ],
}

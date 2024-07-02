import Banner from '@/presentation/pages/Banner/banner.vue'
import BannerList from '@/presentation/pages/Banner/list.vue'
import BannerAdd from '@/presentation/pages/Banner/add.vue'

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
    {
      name: 'banner-add',
      path: 'add',
      component: BannerAdd,
    },
  ],
}

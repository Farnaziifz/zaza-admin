import Report from '@/presentation/pages/Report/Report.vue'
import ReportDiscountList from '@/presentation/pages/Report/ReportDiscountList.vue'
import ReportCouponList from '@/presentation/pages/Report/ReportCouponList.vue'
import ReportCachBackList from '../../presentation/pages/Report/CacheBack.vue'

export const reportConfig = {
  name: 'report',
  path: 'report',
  component: Report,
  redirect: '/report/discount-list',
  children: [
    {
      name: 'report-discount-list',
      path: 'discount-list',
      component: ReportDiscountList,
    },
    {
      name: 'report-coupon-list',
      path: 'coupon-list',
      component: ReportCouponList,
    },
    {
      name: 'cashback-list',
      path: 'cashback-list',
      component: ReportCachBackList,
    },
  ],
}

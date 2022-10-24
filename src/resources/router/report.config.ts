import Report from '@/presentation/pages/Report/Report.vue'
import ReportDiscountList from '@/presentation/pages/Report/ReportDiscountList.vue'

export const reportConfig = {
  name: 'report',
  path: 'report',
  component: Report,
  redirect: '/report/discount-list',
  children: [
    {
      name: 'discount-list',
      path: 'discount-list',
      component: ReportDiscountList,
    },
  ],
}

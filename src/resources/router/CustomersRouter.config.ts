import Customers from '/src/presentation/pages/Customers.vue'
import CustomersList from '/src/presentation/pages/CustomersList.vue'

export const customerRouterConfig = {
  path: 'customers',
  name: 'customers',
  component: Customers,
  redirect: '/customers/list',
  children: [
    {
      path: 'list',
      name: 'list',
      component: CustomersList,
    },
  ],
}

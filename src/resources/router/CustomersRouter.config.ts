import Customers from '/src/presentation/pages/Customers.vue'
import CustomersList from '/src/presentation/pages/CustomersList.vue'
import CustomerDetails from '/src/presentation/pages/CustomerDetails.vue'

export const customerRouterConfig = {
  path: 'customers',
  name: 'customers',
  component: Customers,
  redirect: '/customers/list',
  children: [
    {
      path: 'list',
      name: 'customer-list',
      component: CustomersList,
    },
    {
      path: 'details/:id',
      name: 'customer-details',
      component: CustomerDetails,
    },
  ],
}

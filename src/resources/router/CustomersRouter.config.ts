import Customers from '/src/presentation/pages/Customer/Customers.vue'
import CustomersList from '/src/presentation/pages/Customer/CustomersList.vue'
import CustomerDetails from '/src/presentation/pages/Customer/CustomerDetails.vue'
import CustomerCommentDetails from '/src/presentation/pages/Customer/CustomerCommentDetails.vue'

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
    {
      path: 'comment/details/:orderName/:cId/:fId/:oId',
      name: 'comment-details',
      component: CustomerCommentDetails,
    },
  ],
}

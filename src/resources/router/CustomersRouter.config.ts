import Customers from '/src/presentation/pages/Customers.vue'
import CustomersList from '/src/presentation/pages/CustomersList.vue'
import CustomerDetails from '/src/presentation/pages/CustomerDetails.vue'
import CustomerCommentDetails from '/src/presentation/pages/CustomerCommentDetails.vue'

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

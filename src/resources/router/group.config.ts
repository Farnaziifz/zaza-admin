import Group from '/src/presentation/pages/group/group.vue'
import GroupList from '/src/presentation/pages/group/GroupList.vue'
import GroupDetails from '/src/presentation/pages/group/GroupDetails.vue'

export const groupsRouterConfig = {
  path: 'group',
  name: 'group',
  component: Group,
  redirect: '/group/list',
  children: [
    {
      path: 'list',
      name: 'group-list',
      component: GroupList,
    },
    {
      path: 'details/:id',
      name: 'group-details',
      component: GroupDetails,
    },
  ],
}

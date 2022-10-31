import Group from '/src/presentation/pages/group/group.vue'
import GroupList from '/src/presentation/pages/group/GroupList.vue'

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
  ],
}

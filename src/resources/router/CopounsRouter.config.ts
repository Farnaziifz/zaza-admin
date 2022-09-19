import Copouns from '/src/presentation/pages/Copouns.vue'
import CopounsList from '/src/presentation/pages/CopounsList.vue'

export const copounsRouterConfig = {
  path: 'copouns',
  name: 'copouns',
  component: Copouns,
  redirect: '/copouns/list',
  children: [
    {
      path: 'list',
      name: 'list',
      component: CopounsList,
    },
  ],
}

import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import Test from '../../presentation/pages/Test.vue'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          name: 'Test',
          path: 'Test',
          component: Test,
        },
      ],
    },
  ],
  history: createWebHistory(),
}

export default config
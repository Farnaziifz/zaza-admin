import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { labelSettingsRouterConfig } from './labelSettingsRouter.config'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [labelSettingsRouterConfig],
    },
  ],
  history: createWebHistory(),
}

export default config

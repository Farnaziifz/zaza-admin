import { createWebHistory, RouterOptions } from 'vue-router'
import Main from "../../presentation/pages/Main.vue";

const config: RouterOptions = {
  routes: [
    { 
      path: "/", 
      component: Main
    }
  ],
  history: createWebHistory(),
}

export default config
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

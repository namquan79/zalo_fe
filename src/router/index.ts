import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from "@/pages/RegisterPage.vue";
import Home from "@/pages/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    props: true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

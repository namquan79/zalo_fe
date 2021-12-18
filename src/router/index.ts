import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from "@/pages/RegisterPage.vue";
import Home from "@/pages/Home.vue";
import Statistical from "@/pages/Statistical.vue";
import ShowListInfo from "@/pages/ShowListInfo.vue";
import AddInfo from "@/pages/AddInfo.vue";
import UpdateInfo from "@/pages/UpdateInfo.vue";
import DownloadInfo from "@/pages/DownloadInfo.vue";
import RegisterUserPage from "@/pages/RegisterUserPage.vue";
import AddPersionInfo from "@/pages/AddPersionInfo.vue";

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
  {
    path: '/statistical',
    name: 'statistical',
    component: Statistical,
    props: true
  },
  {
    path: '/showlistinfo/:id',
    name: 'showlistinfo',
    component: ShowListInfo,
    props: true
  },
  {
    path: '/addinfo',
    name: 'addinfo',
    component: AddInfo,
    props: true
  },
  {
    path: '/updateinfo/:id',
    name: 'updateinfo',
    component: UpdateInfo,
    props: true
  },
  {
    path: '/downloadinfo',
    name: 'downloadinfo',
    component: DownloadInfo,
    props: true
  },
  {
    path: '/registeruser',
    name: 'registeruser',
    component: RegisterUserPage,
    props: true
  },
  {
    path: '/addpersioninfo',
    name: 'addpersioninfo',
    component: AddPersionInfo,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

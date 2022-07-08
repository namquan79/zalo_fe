import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue';
import Home from "@/pages/Home.vue";
import SendMessagePage from "@/pages/SendMessagePage.vue";
import UploadImage from "@/pages/UploadImage.vue";
import ShowListRegisterService from "@/pages/ShowListRegisterService.vue";
import UpdateRegisterService from "@/pages/UpdateRegisterService.vue";
import RegisterUserPage from "@/pages/RegisterUserPage.vue";
import UpdateInfo from "@/pages/UpdateInfo.vue";
import ketQuaCLS from "@/pages/KetQuaCLS.vue";
import AddEmployeePage from "@/pages/AddEmployeePage.vue";
import showListEmployee from "@/pages/ShowListEmployee.vue";
import updateEmployeePage from "@/pages/UpdateEmployeePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    props: true
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: RegisterPage,
  //   props: true
  // },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/updateinfo/:id',
    name: 'updateinfo',
    component: UpdateInfo,
    props: true
  },
  // {
  //   path: '/downloadinfo',
  //   name: 'downloadinfo',
  //   component: DownloadInfo,
  //   props: true
  // },
  {
    path: '/registeruser',
    name: 'registeruser',
    component: RegisterUserPage,
    props: true
  },
  {
    path: '/ketQuaCLS/:svv/:sdt',
    name: 'ketQuaCLS',
    component: ketQuaCLS,
    props: true
  },
  // {
  //   path: '/addpersioninfo',
  //   name: 'addpersioninfo',
  //   component: AddPersionInfo,
  //   props: true
  // },
  {
    path: '/sendmessage',
    name: 'sendmessage',
    component: SendMessagePage,
    props: true
  },
  {
    path: '/uploadImage',
    name: 'uploadImage',
    component: UploadImage,
    props: true
  },
  {
    path: '/listRegisterService',
    name: 'listRegisterService',
    component: ShowListRegisterService,
    props: true
  },
  {
    path: '/updateregisterservice/:id',
    name: 'updateregisterservice',
    component: UpdateRegisterService,
    props: true
  },
  {
    path: '/addemployee',
    name: 'addemployee',
    component: AddEmployeePage,
    props: true
  },
  {
    path: '/showlistemployee',
    name: 'showlistemployee',
    component: showListEmployee,
    props: true
  },
  {
    path: '/updateemployee/:id',
    name: 'updateemployee',
    component: updateEmployeePage,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

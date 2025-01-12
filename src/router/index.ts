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
import reLoginPage from "@/pages/ReLoginPage.vue";
import userList from "@/pages/UserList.vue";
import userUpdatePage from "@/pages/UserUpdatePage.vue";
import ManagerGroupPage from "@/pages/ManagerGroupPage.vue";
import showListStatistical from "@/pages/ShowListStatistical.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Home,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    props: true
  },
  {
    path: '/relogin',
    name: 'relogin',
    component: reLoginPage,
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
    path: '/registerUser',
    name: 'registerUser',
    component: RegisterUserPage,
    props: true
  },
  {
    path: '/userUpdate',
    name: 'userUpdate',
    component: userUpdatePage,
    props: true
  },
  {
    path: '/userList',
    name: 'userList',
    component: userList,
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
  {
    path: '/managerGroup',
    name: 'managerGroup',
    component: ManagerGroupPage,
    props: true,
  },
  {
    path: '/showListStatistical',
    name: 'showListStatistical',
    component: showListStatistical,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

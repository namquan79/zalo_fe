<template>

  <div v-if="isLoggedIn" id="header" :model="appMenu">
    
    <div class="wrap_header">
      <div class="menubar" v-if="!permission">
          <ul>
<!--            <li><RouterLink to ='/sendmessage'><span class="p-menuitem-icon pi pi-fw pi-send" data-pc-section="icon"></span>Gởi tin nhắn</RouterLink></li>-->
<!--            <li><RouterLink to ='/uploadImage'><span class="p-menuitem-icon pi pi-fw pi-upload" data-pc-section="icon"></span>Đăng hình ảnh</RouterLink></li>-->
            <li><RouterLink to ='/listRegisterService'><span class="p-menuitem-icon pi pi-fw pi-list" data-pc-section="icon"></span>Danh sách đăng ký</RouterLink></li>
            <li><RouterLink to ='/addemployee'><span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Thêm nhân viên</RouterLink></li>
            <li><RouterLink to ='/showlistemployee'><span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Danh sách nhân viên</RouterLink></li>
            <li><RouterLink to ='/showListStatistical'><span class="p-menuitem-icon pi pi-fw pi-ellipsis-h" data-pc-section="icon"></span>Thống kê thông tin</RouterLink></li>
          </ul>
      </div>
      <div class="menubar" v-else>
        <ul>
          <li><RouterLink to ='/sendmessage'><span class="p-menuitem-icon pi pi-fw pi-send" data-pc-section="icon"></span>Gởi tin nhắn</RouterLink></li>
          <li><RouterLink to ='/uploadImage'><span class="p-menuitem-icon pi pi-fw pi-upload" data-pc-section="icon"></span>Đăng hình ảnh</RouterLink></li>
          <li><RouterLink to ='/managerGroup'><span class="p-menuitem-icon pi pi-fw pi-sitemap" data-pc-section="icon"></span>Quản lý nhóm</RouterLink></li>
          <li><RouterLink to ='/listRegisterService'><span class="p-menuitem-icon pi pi-fw pi-list" data-pc-section="icon"></span>Danh sách đăng ký</RouterLink></li>
          <li><RouterLink to ='/addemployee'><span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Thêm nhân viên</RouterLink></li>
          <li><RouterLink to ='/showlistemployee'><span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Danh sách nhân viên</RouterLink></li>
          <li><RouterLink to ='/showListStatistical'><span class="p-menuitem-icon pi pi-fw pi-ellipsis-h" data-pc-section="icon"></span>Thống kê thông tin</RouterLink></li>
          <li><RouterLink to ='/registerUser'><span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Đăng ký tài khoản</RouterLink></li>
          <li><RouterLink to ='/userList'><span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Quản lý tài khoản</RouterLink></li>
        </ul>
      </div>
<!--      {-->
<!--      label:'Đăng ký tài khoản',-->
<!--      icon:'pi pi-fw pi-user-plus',-->
<!--      to: '/register'-->
<!--      },-->
<!--      {-->
<!--      label:'Quản lý tài khoản',-->
<!--      icon:'pi pi-fw pi-users',-->
<!--      to: '/userlist'-->
<!--      },-->
      <div class="logouts">
        <Button label="Đăng xuất" @click="logout" icon="pi pi-sign-out" iconPos="right" class="p-button-secondary"/>
      </div>
    </div>
  </div>
  <div v-if="isLoggedIn" id="fotter">
    
    <div class="wrap_header">
      <p class="coppyi">© Copyright 2024 - Bệnh viện Ung Bướu Đà Nẵng- Designed by voontv@gmail.com</p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ref} from 'vue'
import { useStore } from 'vuex'
import { useToast } from "primevue/usetoast";
import router from "@/router";

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const permission = ref(false);
    const appMenu = computed(() => {
      console.log("@@@@@#############$$$$$$$$$$$$$ check appMenu: ");
      const menu = ref([
        // {
        //   label:'Gởii tin nhắn',
        //   icon:'pi pi-fw pi-send',
        //   href: '/sendmessage'
        // },
        // {
        //   label:'Đăng hình ảnh',
        //   icon:'pi pi-fw pi-upload',
        //   to: '/uploadImage'
        // },
        {
          label:'Danh sách bệnh nhân đăng ký khám bệnh',
          icon:'pi pi-fw pi-list',
          to: '/listRegisterService'
        },
        {
          label:'Thêm nhân viên hỗ trợ',
          icon:'pi pi-fw pi-user-plus',
          to: '/addemployee'
        },
        {
          label:'Danh sách nhân viên',
          icon:'pi pi-fw pi-users',
          to: '/showlistemployee'
        },
      ]);
      const menuDefault = ref([
      ]);
      console.log("@@@@@#############$$$$$$$$$$$$$ check appMenu 222222222: ");
      // if(!!store.state.token)
      //   return menu.value;
      // else
      //   return menuDefault.value;
      console.log("@@@@@#############$$$$$$$$$$$$$ check appMenu 333333333333: ");
console.log("@@@@@#############$$$$$$$$$$$$$ check permission: " + permission.value);

      if(store.state.permission == "admin")
      {
        console.log("@@@@@#############$$$$$$$$$$$$$ check permission admin: " );
        permission.value = true;
      }
      else
      {
        console.log("@@@@@#############$$$$$$$$$$$$$ check permission user: " );
        permission.value = false;
      }
    });
    const logout = () => {
      store.dispatch('clearToken');
      store.dispatch('clearPermission');
      router.push({
        name: 'login',
      });
      toast.add({
        severity:'success',
        summary: 'Đăng xuất',
        detail:'Đã xóa thông tin đăng nhập thành công',
        life: 1000
      });
    }
    const gotoLoginPage = () => {
      router.push({
        name: 'login',
      });
    }

    return {
      appMenu,
      logout,
      gotoLoginPage,
      permission
    }
  }
}
</script>

<style scoped lang="scss">
.p-menubar{
  width: 100%;
  background: white;
  border-radius: 0;
}
a{
  text-decoration: none;
}
</style>

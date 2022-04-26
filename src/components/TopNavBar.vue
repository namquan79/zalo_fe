<template>
  <div class="layout-topbar p-d-flex p-jc-between">
    <Menubar :model="appMenu" >
      <template #start>
        <a href="/">
          <img alt="logo" src="../assets/Zalo.png" height="40" class="p-mr-2">
        </a>
      </template>
      <template #end>
        <div v-if="!isLoggedIn">
          <Button label="Đăng nhập" icon="pi pi-sign-in" iconPos="right" @click="gotoLoginPage"/>
        </div>

        <Button label="Đăng xuất" @click="logout" icon="pi pi-sign-out" iconPos="right" class="p-button-secondary"  v-else/>
      </template>
    </Menubar>
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
    // const defaultMenu = [
    //   {
    //     label:'Hệ thống nhắn tin Zalo OA',
    //     icon:'pi pi-fw pi-list',
    //     url: '/home'
    //   },
    //   {
    //     label:'Gởi tin nhắn',
    //     icon:'pi pi-fw pi-send',
    //     url: '/sendmessage'
    //   },
    //   {
    //     label:'Đăng hình ảnh',
    //     icon:'pi pi-fw pi-upload',
    //     url: '/uploadImage'
    //   },
    // ];
    const homeMenu = computed(() => {
      const menu = ref([
          {
            label:'Hệ thống nhắn tin Zalo OA',
            icon:'pi pi-fw pi-list',
            url: '/home'
          },
          {
            label:'Gởi tin nhắn',
            icon:'pi pi-fw pi-send',
            url: '/sendmessage'
          },
          {
            label:'Đăng hình ảnh',
            icon:'pi pi-fw pi-upload',
            url: '/uploadImage'
          },
      ]);
      return menu.value;
    })
    const userMenu = [
      // {
      //   label:'Đăng ký',
      //   icon:'pi pi-fw pi-user-plus',
      //   url: '/register'
      // },
      {
        label:'Thống kê',
        icon:'pi pi-fw pi-list',
        url: '/statistical'
      },
      {
        label:'Thêm thông tin',
        icon:'pi pi-fw pi-plus-circle',
        url: '/addinfo'
      },
      {
        label:'Thêm đối tượng',
        icon:'pi pi-fw pi-user-plus',
        url: '/addpersioninfo'
      },
      {
        label:'Xuất tập tin',
        icon:'pi pi-fw pi-download',
        url: '/downloadinfo'
      },
    ];
    const adminMenu = [
      // {
      //   label:'Đăng ký',
      //   icon:'pi pi-fw pi-user-plus',
      //   url: '/register'
      // },
      {
        label:'Thống kê',
        icon:'pi pi-fw pi-list',
        url: '/statistical'
      },
      {
        label:'Thêm thông tin',
        icon:'pi pi-fw pi-plus-circle',
        url: '/addinfo'
      },
      {
        label:'Thêm đối tượng',
        icon:'pi pi-fw pi-user-plus',
        url: '/addpersioninfo'
      },
      {
        label:'Xuất tập tin',
        icon:'pi pi-fw pi-download',
        url: '/downloadinfo'
      },
      {
        label:'Thêm tài khoản',
        icon:'pi pi-fw pi-users',
        url: '/registeruser'
      },
    ];
    const appMenu = computed(() => {
      const menu = ref([
        {
          label:'Gởi tin nhắn',
          icon:'pi pi-fw pi-send',
          url: '/sendmessage'
        },
        {
          label:'Đăng hình ảnh',
          icon:'pi pi-fw pi-upload',
          url: '/uploadImage'
        },
        {
          label:'Danh sách bệnh nhân đăng ký khám bệnh',
          icon:'pi pi-fw pi-list',
          url: '/listRegisterService'
        },
      ]);
      const menuDefault = ref([
      ]);
      if(!!store.state.token)
        return menu.value;
      else
        return menuDefault.value;
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
      gotoLoginPage
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

<template>
  <div class="layout-topbar p-d-flex p-jc-between">
    <Menubar :model="appMenu" >
      <template #start>
        <a href="/">
          <img alt="logo" src="../assets/Icon.jpg" height="40" class="p-mr-2">
        </a>
      </template>
      <template #end>
        <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">
          <Button label="Đăng nhập" icon="pi pi-sign-in" iconPos="right" />
        </router-link>

        <Button label="Đăng xuất" @click="logout" icon="pi pi-sign-out" iconPos="right" class="p-button-secondary"  v-else/>
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
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
    const defaultMenu = [
      {
        label:'Quản lý xét nghiệm cộng đồng Đà Nẵng',
        icon:'pi pi-fw pi-list',
        url: '/login'
      },
    ];
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
      if(props.isLoggedIn)
      {
        if(store.state.permission == "admin") return adminMenu;
        else return userMenu;
      }
      else
      {
        return defaultMenu;
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

    return {
      appMenu,
      logout
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

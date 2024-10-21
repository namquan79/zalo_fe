<template>

  <div v-if="isLoggedIn" id="header">
    
    <div class="wrap_header">
      <div class="menubar">
          <ul>
            <li><RouterLink to ='/sendmessage'><span class="p-menuitem-icon pi pi-fw pi-send" data-pc-section="icon"></span>Gởi tin nhắn</RouterLink></li>
            <li><RouterLink to ='/uploadImage'><span class="p-menuitem-icon pi pi-fw pi-upload" data-pc-section="icon"></span>Đăng hình ảnh</RouterLink></li>
            <li><RouterLink to ='/listRegisterService'><span class="p-menuitem-icon pi pi-fw pi-list" data-pc-section="icon"></span>Danh sách đăng ký</RouterLink></li>
            <li><RouterLink to ='/addemployee'><span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Thêm nhân viên</RouterLink></li>
            <li><RouterLink to ='/showlistemployee'><span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Danh sách nhân viên</RouterLink></li>
          </ul>
      </div>
      <div class="logouts">
        <Button label="Đăng xuất" @click="logout" icon="pi pi-sign-out" iconPos="right" class="p-button-secondary"/>
      </div>
    </div>
  </div>
  <div v-if="isLoggedIn" id="fotter">
    
    <div class="wrap_header">
      <p class="coppyi">© Copyright 2024 - Bệnh viện Ung Bướu Đà Nẵng- Designed by KCL Group</p>
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
    const appMenu = computed(() => {
      const menu = ref([
        {
          label:'Gởii tin nhắn',
          icon:'pi pi-fw pi-send',
          href: '/sendmessage'
        },
        {
          label:'Đăng hình ảnh',
          icon:'pi pi-fw pi-upload',
          to: '/uploadImage'
        },
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

<template>
  <Card>
    <template #header>
      <img alt="user header" src="../assets/Zaloicon.jpeg">
    </template>
    <template #title>
      Đăng nhập
    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label for="firstname">Tên đăng nhập</label>
          <InputText id="firstname" type="text" v-model="userName" />
        </div>
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label for="lastname">Mật khẩu</label>
          <InputText id="lastname" type="password" v-model="password" />
        </div>
      </div>
    </template>
    <template #footer>
      <Button v-if="valid" label="Đăng nhập" icon="pi pi-sign-in" iconPos="left" @click="doLogin()" />
      <Button v-else label="Đăng nhập" icon="pi pi-sign-in" iconPos="left" disabled="disabled" />
    </template>
  </Card>
</template>

<script lang="ts">

import { Login } from '../models/login'
import { computed} from 'vue'
import { ref } from 'vue'
import AuthRepository from '../services/AuthRepository'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {

  setup (props) {
    const router = useRouter();
    const login = ref({} as Login);
    const store = useStore();
    const toast = useToast();
    const userName = ref("");
    const password = ref("");

    const valid = computed(() => password.value && userName.value)

      console.log('############################## loginpage 11111');
    const doLogin = () => {
      console.log('############################## loginpage');
        var md5 = require("md5");
        login.value.username = userName.value;
        login.value.password = md5(password.value);
        console.log('############################## loginpage login: ' + JSON.stringify(login));
        AuthRepository.auth(login.value)
        .then((response) => {
          store.dispatch('setToken', response.data.token)
          toast.add({
            severity: 'success',
            summary: 'Đăng nhập',
            detail: 'Đăng nhập thành công vào hệ thống',
            life: 1000
          });
          AuthRepository.userPermission(login.value)
                  .then((response) => {
                    store.dispatch('setPermission', response.data.permission);
                  })
                  .catch(() => {
                    toast.add({
                      severity: 'error',
                      summary: 'Đăng nhập',
                      detail: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập',
                      life: 1000
                    })
                  })
          router.push({
            name: 'home'
          });
        })
        .catch(() => {
          toast.add({
            severity: 'error',
            summary: 'Đăng nhập',
            detail: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập',
            life: 1000
          })
        })
    }

    return {
      login,
      doLogin,
      valid,
      password,
      userName,
    }
  }
}

</script>
<style lang="scss">
  #template {
    background-color: #2196F3;
  }
</style>

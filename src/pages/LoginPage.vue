<template>


  <div id="login_page">
    <div class="wraplogin">
        <div class="main_login">
            <div class="img_lg">
              <img src="../assets/logo_vinh.png" width="70" class="img_l" alt="logo cong ty">
<!--              <img src="../assets/logo_kcl.jpg" width="70" class="img_r" alt="logo don vi">-->
            </div>    
              <h4>Bệnh viện Đa khoa Thành phố Vinh</h4>
              <h5>Đăng nhập hệ thống</h5>
              <div class="it_lg">
                <InputText id="firstname" type="text" v-model="userName" placeholder="Tên đăng nhập"/>
              </div>
              <div class="it_lg">
                <InputText id="lastname" type="password" v-model="password" v-on:keyup.enter="doLogin()" placeholder="Mật khẩu"/>
              </div>
              <div class="it_lg it_lgbt">
                <Button v-if="valid" label="Đăng nhập" icon="pi pi-sign-in" iconPos="left" @click="doLogin()" />
                <Button v-else label="Đăng nhập" icon="pi pi-sign-in" iconPos="left" disabled="disabled" />
              </div>
          
        </div>
    </div>
    
  </div>

</template>


<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const toast = useToast()

    const userName = ref('')
    const password = ref('')

    // vẫn kiểm tra có nhập user & pass thì mới cho bấm login
    const valid = computed(() => !!userName.value && !!password.value)

    const doLogin = () => {
      console.log('######## FAKE LOGIN – bỏ qua backend ########')
      console.log('userName =', userName.value)

      // === FAKE TOKEN & PERMISSION ===
      // Sau này nối backend thật thì bỏ đoạn này, dùng lại AuthRepository như cũ
      store.dispatch('setToken', 'dummy-token')
      store.dispatch('setPermission', 'admin') // hoặc 'user' tùy bạn muốn test quyền gì
      // ================================

      toast.add({
        severity: 'success',
        summary: 'Đăng nhập',
        detail: 'Đăng nhập giả để test giao diện (không gọi backend)',
        life: 1000
      })

      router.push({
        name: 'home'   // route sau khi đăng nhập
      })
    }

    return {
      doLogin,
      valid,
      password,
      userName
    }
  }
}
</script>


<style lang="scss">
  #template {
    background-color: #2196F3;
  }
</style>

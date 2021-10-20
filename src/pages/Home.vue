<template>
  <RegisterPage v-if="isLoggedIn" />
  <LoginPage v-else />
</template>

<script lang="ts">
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    LoginPage,
    RegisterPage,
  },
  setup(){
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.token);

    return {
      isLoggedIn
    }
  }
}
</script>

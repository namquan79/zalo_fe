<template>
  <showListRegisterService v-if="isLoggedIn" />
  <LoginPage v-else />
</template>

<script lang="ts">
import LoginPage from "@/pages/LoginPage.vue";
import SendMessagePage from "@/pages/SendMessagePage.vue";
import showListRegisterService from "@/pages/ShowListRegisterService.vue";

import { useStore } from 'vuex'
import { computed } from 'vue'
import {useRouter} from "vue-router";

export default {
  components: {
    LoginPage,
    showListRegisterService
  },
  setup(){
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.token);
    const router = useRouter();

    console.log("isLoggedIn: " + isLoggedIn);
    // router.push({
    //   name: 'sendmessage'
    // });
    return {
      isLoggedIn
    }
  }
}
</script>

<template>
<!--  <AddInfo v-if="isLoggedIn" />-->
<!--  <LoginPage v-else />-->
  <SendMessagePage/>
</template>

<script lang="ts">
// import LoginPage from "@/pages/LoginPage.vue";
// import AddInfo from "@/pages/AddInfo.vue";
import SendMessagePage from "@/pages/SendMessagePage.vue";

import { useStore } from 'vuex'
import { computed } from 'vue'
import {useRouter} from "vue-router";

export default {
  components: {
    // LoginPage,
    // AddInfo,
    SendMessagePage
  },
  setup(){
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.token);
    const router = useRouter();

    // router.push({
    //   name: 'sendmessage'
    // });
    return {
      isLoggedIn
    }
  }
}
</script>

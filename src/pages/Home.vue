<template>
  <AddInfo v-if="isLoggedIn" />
  <LoginPage v-else />
</template>

<script lang="ts">
import LoginPage from "@/pages/LoginPage.vue";
import AddInfo from "@/pages/AddInfo.vue";

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    LoginPage,
    AddInfo,
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

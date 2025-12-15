<template>
  <div class="on_page">
    <Toast />

    <div class="layout">
      <TopNavBar class="layout-sidebar" :isLoggedIn="isLoggedIn" />

      <div class="layout-main">
        <div class="main-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.app-container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: inherit;
  background: #F7F8F9;
  .app-content {
    margin: 8px;
  }
}
</style>
<script>
import TopNavBar from "@/components/TopNavBar";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  components: {TopNavBar},
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.token);

    return {
      isLoggedIn
    }
  }
}
</script>

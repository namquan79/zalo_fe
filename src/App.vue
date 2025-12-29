<template>
  <div class="on_page">
    <Toast />

    <TopNavBar :isLoggedIn="isLoggedIn" />

    <div class="layout-main">
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.on_page {
  width: 100%;
  min-height: 100vh;
}

.layout-main {
  margin-left: 220px;
  margin-top: 56px;
  margin-bottom: 44px;
  padding: 16px;
  min-height: calc(100vh - 56px - 44px);
  background: #f9fafb;
  transition: margin-left 0.2s ease;
}

/* When sidebar is collapsed (controlled by TopNavBar toggling class on root .on_page) */
.on_page.sidebar-collapsed .layout-main {
  margin-left: 60px;
}

.main-content {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  min-height: 100%;
}

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
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { TopNavBar },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.token);

    return {
      isLoggedIn
    }
  }
}
</script>

<template>
  <div v-if="isLoggedIn" class="layout">
    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <button class="sidebar-toggle" type="button" @click="toggleSidebar" aria-label="Toggle sidebar">
        <i class="pi pi-bars"></i>
      </button>

      <div v-if="!isSidebarCollapsed" class="sidebar-profile">
        <img class="avatar" :src="avatarUrl" alt="avatar" />
        <div class="profile-name">{{ userDisplayName }}</div>
      </div>

      <nav class="sidebar-body">
        <ul v-if="!isAdmin">
          <li>
            <RouterLink to="/listRegisterService">
              <i class="pi pi-list"></i>
              <span class="sidebar-text">Danh sách đăng ký</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/addemployee">
              <i class="pi pi-user-plus"></i>
              <span class="sidebar-text">Thêm nhân viên</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/showlistemployee">
              <i class="pi pi-users"></i>
              <span class="sidebar-text">Danh sách nhân viên</span>
            </RouterLink>
          </li>
        </ul>

        <ul v-else>
          <li>
            <RouterLink to="/sendmessage">
              <i class="pi pi-send"></i>
              <span class="sidebar-text">Gửi tin nhắn</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/uploadImage">
              <i class="pi pi-upload"></i>
              <span class="sidebar-text">Đăng hình ảnh</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/managerGroup">
              <i class="pi pi-sitemap"></i>
              <span class="sidebar-text">Quản lý nhóm</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/registerUser">
              <i class="pi pi-user-plus"></i>
              <span class="sidebar-text">Đăng ký tài khoản</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/userList">
              <i class="pi pi-users"></i>
              <span class="sidebar-text">Quản lý tài khoản</span>
            </RouterLink>
          </li>
        </ul>

        <div class="sidebar-footer">
          <button class="sidebar-logout" type="button" @click="logout">
            <i class="pi pi-sign-out"></i>
            <span class="sidebar-text">Đăng xuất</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- HEADER -->
    <header class="topbar" :class="{ 'topbar-expanded': !isSidebarCollapsed }">
      <div class="topbar-left">
        <div class="hospital-title">Bệnh viện đa khoa thành phố Vinh</div>
      </div>

      <div class="topbar-right">
        <button class="icon-btn" type="button" title="Tìm kiếm" aria-label="Search">
          <i class="pi pi-search"></i>
        </button>
        <button class="icon-btn" type="button" title="Thông báo" aria-label="Notifications">
          <i class="pi pi-bell"></i>
        </button>

        <!-- ✅ NEW: SETTINGS (gear) -->
        <button class="icon-btn gear-btn" type="button" title="Cài đặt giao diện" aria-label="Settings"
          @click="toggleSettings">
          <i class="pi pi-cog" :class="{ 'spin': isSettingsOpen }"></i>
        </button>
      </div>
    </header>

    <!-- ✅ SETTINGS OVERLAY -->
    <div v-if="isSettingsOpen" class="settings-overlay" @click="closeSettings"></div>

    <!-- ✅ SETTINGS PANEL (slide from right) -->
    <aside class="settings-panel" :class="{ open: isSettingsOpen }" aria-label="Settings panel">
      <div class="settings-header">
        <div class="settings-tabs">
          <button class="tab-btn active" type="button" title="Settings">
            <i class="pi pi-cog"></i>
          </button>
          <button class="tab-btn" type="button" title="Chat">
            <i class="pi pi-comment"></i>
          </button>
          <button class="tab-btn" type="button" title="Checklist">
            <i class="pi pi-check-square"></i>
          </button>
        </div>

        <button class="close-btn" type="button" aria-label="Close settings" @click="closeSettings">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="settings-body">
        <div class="section">
          <div class="section-title">Theme Colors</div>
          <div class="colors">
            <button v-for="c in themeColors" :key="c" class="color-dot" :style="{ background: c }" type="button"
              @click="setThemeColor(c)" :aria-label="'Theme color ' + c" />
          </div>
        </div>

        <div class="section">
          <div class="row">
            <div class="row-left">
              <div class="row-title">Dark or Light Skin</div>
              <div class="row-sub">Light On/Off</div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isLightMode" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="section">
          <div class="row">
            <div class="row-left">
              <div class="row-title">RTL or LTR</div>
              <div class="row-sub">Turn RTL/LTR</div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isRTL" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Layout Options</div>

          <div class="row">
            <div class="row-left">
              <div class="row-title">Fixed layout</div>
              <div class="row-sub"></div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isFixedLayout" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="row">
            <div class="row-left">
              <div class="row-title">Boxed Layout</div>
              <div class="row-sub"></div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isBoxed" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="row">
            <div class="row-left">
              <div class="row-title">Toggle Sidebar</div>
              <div class="row-sub"></div>
            </div>
            <label class="switch">
              <input type="checkbox" :checked="!isSidebarCollapsed" @change="toggleSidebar" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <!-- FOOTER -->
    <footer class="footer" :class="{ 'footer-expanded': !isSidebarCollapsed }">
      <p class="copyright">© Copyright 2025 - Bệnh viện Đa khoa Thành phố Vinh</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import router from "@/router";

export default {
  props: { isLoggedIn: { type: Boolean, required: true } },
  setup() {
    const store = useStore();
    const toast = useToast();

    // Sidebar
    const isSidebarCollapsed = ref(false);
    const toggleSidebar = () => (isSidebarCollapsed.value = !isSidebarCollapsed.value);

    const isAdmin = computed(() => store.state.permission === "admin");
    const userDisplayName = computed(() => store.state.fullname || store.state.username || "Người dùng");
    const avatarUrl = computed(
      () =>
        store.state.avatarUrl ||
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(userDisplayName.value) +
        "&background=ffffff&color=1f2a44"
    );

    const logout = () => {
      store.dispatch("clearToken");
      store.dispatch("clearPermission");
      router.push({ name: "login" });
      toast.add({
        severity: "success",
        summary: "Đăng xuất",
        detail: "Đã xóa thông tin đăng nhập thành công",
        life: 1200,
      });
    };

    // Settings panel
    const isSettingsOpen = ref(false);
    const toggleSettings = () => (isSettingsOpen.value = !isSettingsOpen.value);
    const closeSettings = () => (isSettingsOpen.value = false);

    // Demo state (bạn có thể nối vào store nếu muốn lưu)
    const themeColors = ref(["#4a8cff", "#5a6b7a", "#00c2d1", "#4cd964", "#ff4d4f", "#ffa940"]);
    const themeColor = ref("#1f2a44");

    const isLightMode = ref(false);
    const isRTL = ref(false);
    const isFixedLayout = ref(true);
    const isBoxed = ref(false);

    const setThemeColor = (c: string) => (themeColor.value = c);

    // Apply theme color -> dùng CSS variable
    watch(
      themeColor,
      (c) => {
        document.documentElement.style.setProperty("--brand", c);
      },
      { immediate: true }
    );

    // Optional: apply RTL
    watch(isRTL, (v) => {
      document.documentElement.dir = v ? "rtl" : "ltr";
    });

    return {
      isSidebarCollapsed,
      toggleSidebar,
      isAdmin,
      userDisplayName,
      avatarUrl,
      logout,

      isSettingsOpen,
      toggleSettings,
      closeSettings,

      themeColors,
      setThemeColor,
      isLightMode,
      isRTL,
      isFixedLayout,
      isBoxed,
    };
  },
};
</script>

<style scoped lang="scss">
:global(:root) {
  --brand: #1f2a44;
}

a {
  text-decoration: none;
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 220px;
  background: #1f2a44;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 8px;
  transition: width 0.2s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  margin-bottom: 12px;
}

.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  margin-bottom: 12px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.profile-name {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}

.sidebar-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 8px;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  color: #fff;
}

.sidebar a:hover {
  background: #fff;
  color: var(--brand);
}

.sidebar a.router-link-active {
  background: #fff;
  color: var(--brand);
}

.sidebar-text {
  white-space: nowrap;
}

.sidebar-collapsed .sidebar-text {
  display: none;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 10px;
}

.sidebar-logout {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: #fff;
  border-radius: 8px;
  padding: 10px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-logout:hover {
  background: #fff;
  color: var(--brand);
}

/* TOPBAR */
.topbar {
  position: fixed;
  top: 0;
  left: 60px;
  right: 0;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid var(--brand);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  transition: left 0.2s ease;
  z-index: 900;
}

.topbar-expanded {
  left: 220px;
}

.hospital-title {
  font-weight: 800;
  color: #0b2b1b;
  font-size: 16px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(6, 182, 73, 0.35);
  background: #fff;
  color: var(--brand);
  cursor: pointer;
}

.icon-btn:hover {
  background: var(--brand);
  color: #fff;
}

/* Gear animation */
.gear-btn .spin {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* SETTINGS PANEL */
.settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1200;
}

.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  background: #1f2a44;
  color: #d7deea;
  transform: translateX(110%);
  transition: transform 0.22s ease;
  z-index: 1300;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
}

.settings-panel.open {
  transform: translateX(0);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.settings-tabs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #d7deea;
  cursor: pointer;
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.12);
}

.close-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #ff4d4f;
  color: #fff;
  cursor: pointer;
}

.settings-body {
  padding: 14px;
  overflow: auto;
}

.section {
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.section-title {
  font-weight: 800;
  color: #cfe0ff;
  margin-bottom: 12px;
}

.colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.row-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.row-title {
  font-weight: 700;
}

.row-sub {
  font-size: 12px;
  opacity: 0.8;
}

/* Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.25);
  transition: 0.2s;
  border-radius: 999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  top: 3px;
  background: #fff;
  transition: 0.2s;
  border-radius: 50%;
}

.switch input:checked+.slider {
  background-color: var(--brand);
}

.switch input:checked+.slider:before {
  transform: translateX(22px);
}

/* FOOTER */
.footer {
  position: fixed;
  bottom: 0;
  left: 60px;
  right: 0;
  height: 44px;
  background: #fff;
  border-top: 1px solid rgba(6, 182, 73, 0.25);
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: left 0.2s ease;
  z-index: 800;
}

.footer-expanded {
  left: 220px;
}

copyright {
  margin: 0;
  font-size: 13px;
  color: #3a3a3a;
}

.copyright {
  margin: 0;
  font-size: 13px;
  color: #3a3a3a;
}
</style>

<template>
  <div v-if="isLoggedIn" class="layout">
    <!-- =========================
     * SIDEBAR
     * ========================= -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- Toggle sidebar -->
      <button class="sidebar-toggle" type="button" @click="toggleSidebar" aria-label="Toggle sidebar">
        <i class="pi pi-bars"></i>
      </button>

      <!-- User profile -->
      <div v-if="!isSidebarCollapsed" class="sidebar-profile">
        <img class="avatar" :src="avatarUrl" alt="avatar" />
        <div class="profile-name">{{ userDisplayName }}</div>
      </div>

      <!-- Menu -->
      <nav class="sidebar-body">
        <ul class="menu-list">
          <li v-for="item in visibleMenuItems" :key="item.id" class="menu-item">
            <!-- Parent -->
            <template v-if="item.children?.length">
              <button class="menu-parent" type="button"
                :class="{ active: isParentActive(item), open: isGroupOpen(item) }" @click="toggleGroup(item)">
                <div class="menu-left">
                  <!-- Fallback: render inline clipboard SVG for m_register to avoid missing-font issues -->
                  <svg v-if="item.id === 'm_register'" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M9 2H15V4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H9V2Z"
                      stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    <rect x="8" y="8" width="8" height="10" rx="1" stroke="currentColor" stroke-width="1.2" />
                  </svg>
                  <i v-else-if="item.icon" :class="item.icon"></i>
                  <span class="sidebar-text">{{ item.label }}</span>
                </div>

                <i v-if="!isSidebarCollapsed" class="pi pi-chevron-down" :class="{ rotated: isGroupOpen(item) }"></i>
              </button>

              <Transition name="submenu">
                <ul v-if="!isSidebarCollapsed && isGroupOpen(item)" class="submenu">
                  <li v-for="child in activeChildren(item)" :key="child.id">
                    <RouterLink :to="child.to || ''" class="submenu-link">
                      <i v-if="child.icon" :class="child.icon"></i>
                      <span class="sidebar-text">{{ child.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </Transition>
            </template>

            <!-- Leaf -->
            <RouterLink v-else :to="item.to || ''" class="menu-link">
              <i v-if="item.icon" :class="item.icon"></i>
              <span class="sidebar-text">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>

        <!-- Logout -->
        <div class="sidebar-footer">
          <button class="sidebar-logout" type="button" @click="logout">
            <i class="pi pi-sign-out"></i>
            <span class="sidebar-text">Đăng xuất</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- =========================
     * TOPBAR
     * ========================= -->
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

        <button class="icon-btn" type="button" title="Cài đặt giao diện" aria-label="Settings" @click="toggleSettings">
          <i class="pi pi-cog"></i>
        </button>
      </div>
    </header>

    <!-- =========================
     * SETTINGS (gọn)
     * ========================= -->
    <div v-if="isSettingsOpen" class="settings-overlay" @click="closeSettings"></div>

    <aside class="settings-panel" :class="{ open: isSettingsOpen }">
      <div class="settings-header">
        <div class="settings-title">
          <i class="pi pi-cog"></i>
          <span>Cài đặt</span>
        </div>

        <button class="close-btn" type="button" @click="closeSettings" aria-label="Close settings">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="settings-body">
        <!-- Theme color -->
        <div class="section">
          <div class="section-title">Màu chủ đạo</div>
          <div class="colors">
            <button v-for="c in themeColors" :key="c" class="color-dot" :style="{ background: c }" type="button"
              @click="setThemeColor(c)" />
          </div>
        </div>

        <!-- Light mode -->
        <div class="section">
          <div class="row">
            <div class="row-left">
              <div class="row-title">Light Mode</div>
              <div class="row-sub">On/Off</div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isLightMode" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- Toggle sidebar -->
        <div class="section">
          <div class="row">
            <div class="row-left">
              <div class="row-title">Sidebar</div>
              <div class="row-sub">Thu gọn / Mở rộng</div>
            </div>
            <label class="switch">
              <input type="checkbox" :checked="!isSidebarCollapsed" @change="toggleSidebar" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <!-- =========================
     * FOOTER
     * ========================= -->
    <footer class="footer" :class="{ 'footer-expanded': !isSidebarCollapsed }">
      <p class="copyright">© Copyright 2025 - Bệnh viện Đa khoa Thành phố Vinh</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import router from "@/router";

/**
 * ✅ menuStore.ts export:
 *  - menuData (Ref<{ admin: MenuItem[]; user?: MenuItem[] }>)
 *  - loadMenu(): void
 */
import { menuData, loadMenu, saveMenu, applyDefaultIcons } from "@/config/menuStore";
import type { MenuItem } from "@/config/menuStore";

export default {
  props: { isLoggedIn: { type: Boolean, required: true } },
  setup() {
    /** =========================
     * CORE
     * ========================= */
    const store = useStore();
    const toast = useToast();
    const route = useRoute();

    /** =========================
     * LOAD MENU (1 lần) and ensure icons exist
     * ========================= */
    onMounted(() => {
      loadMenu();
      try {
        applyDefaultIcons(menuData.value.admin);
        applyDefaultIcons(menuData.value.user);
        saveMenu(menuData.value);
      } catch (e) {
        // non-fatal
      }
      // ensure initial root class reflects sidebar state
      const root = document.querySelector('.on_page');
      if (root) root.classList.toggle('sidebar-collapsed', isSidebarCollapsed.value);
    });

    /** =========================
     * SIDEBAR UI
     * ========================= */
    const isSidebarCollapsed = ref(false);
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      const root = document.querySelector('.on_page');
      if (root) root.classList.toggle('sidebar-collapsed', isSidebarCollapsed.value);
    };

    /** =========================
     * USER DISPLAY
     * ========================= */
    const userDisplayName = computed(() => store.state.fullname || store.state.username || "Người dùng");
    const avatarUrl = computed(() => {
      const fallback =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(userDisplayName.value) +
        "&background=ffffff&color=111827";
      return store.state.avatarUrl || fallback;
    });

    /** =========================
     * MENU (LUÔN DÙNG ADMIN UI)
     * ========================= */
    const rawMenuItems = computed<MenuItem[]>(() => (menuData.value?.admin || []) as MenuItem[]);

    const visibleMenuItems = computed<MenuItem[]>(() =>
      (rawMenuItems.value || []).filter((x) => x.isActive !== false)
    );

    const activeChildren = (parent: MenuItem) =>
      (parent.children || []).filter((x) => x.isActive !== false);

    /** =========================
     * SUBMENU OPEN STATE
     * ========================= */
    const openGroups = ref<Record<string, boolean>>({});

    const isGroupOpen = (item: MenuItem) => !!openGroups.value[item.id];

    const toggleGroup = (item: MenuItem) => {
      if (isSidebarCollapsed.value) return;
      openGroups.value[item.id] = !openGroups.value[item.id];
    };

    const isRouteMatch = (to?: string) => (to ? route.path.startsWith(to) : false);

    const isParentActive = (item: MenuItem) => {
      if (!item.children?.length) return false;
      return activeChildren(item).some((c) => isRouteMatch(c.to));
    };

    const syncOpenByRoute = () => {
      for (const it of visibleMenuItems.value) {
        if (it.children?.length && isParentActive(it)) openGroups.value[it.id] = true;
      }
    };

    watch(() => route.path, syncOpenByRoute, { immediate: true });
    watch(visibleMenuItems, syncOpenByRoute, { deep: true });
    watch(isSidebarCollapsed, (v) => {
      if (v) openGroups.value = {};
      const root = document.querySelector('.on_page');
      if (root) root.classList.toggle('sidebar-collapsed', v);
    });

    /** =========================
     * LOGOUT
     * ========================= */
    const logout = () => {
      const s: any = store;

      // dự án bạn có thể có action/mutation khác nhau → gọi mềm để không crash
      try { s.dispatch?.("clearToken"); } catch (_) { }
      try { s.dispatch?.("clearPermission"); } catch (_) { }
      try { s.commit?.("clearAuth"); } catch (_) { }

      router.push({ name: "login" }).catch(() => { });
      toast.add({ severity: "success", summary: "Đăng xuất", detail: "Đã đăng xuất", life: 1200 });
    };

    /** =========================
     * SETTINGS (gọn)
     * ========================= */
    const isSettingsOpen = ref(false);
    const toggleSettings = () => (isSettingsOpen.value = !isSettingsOpen.value);
    const closeSettings = () => (isSettingsOpen.value = false);

    const themeColors = ref(["#16A34A", "#4a8cff", "#00c2d1", "#ff4d4f", "#ffa940", "#5a6b7a"]);
    const setThemeColor = (c: string) => document.documentElement.style.setProperty("--brand", c);

    const isLightMode = ref(false);
    watch(
      isLightMode,
      (v) => document.documentElement.setAttribute("data-theme", v ? "light" : "dark"),
      { immediate: true }
    );

    return {
      // sidebar
      isSidebarCollapsed,
      toggleSidebar,

      // user
      userDisplayName,
      avatarUrl,

      // menu
      visibleMenuItems,
      activeChildren,
      openGroups,
      toggleGroup,
      isGroupOpen,
      isParentActive,

      // logout
      logout,

      // settings
      isSettingsOpen,
      toggleSettings,
      closeSettings,
      themeColors,
      setThemeColor,
      isLightMode,
    };
  },
};
</script>

<style scoped lang="scss">
/* ================= THEME VARS ================= */
:global(:root) {
  --brand: #16a34a;
  --hover: #22c55e;
  --text: #111827;
  --muted: #6b7280;
  --border: #e5e7eb;
  --page: #ffffff;
}

:global(:root[data-theme="light"]) {
  --page: #f9fafb;
}

/* ================= BASE ================= */
.layout {
  background: var(--page);
}

a {
  text-decoration: none;
}

/* ================= SIDEBAR ================= */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #fff;
  border-right: 1px solid var(--border);
  padding: 10px 8px;
  transition: width 0.2s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text);
  font-size: 18px;
  margin-bottom: 12px;
}

.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px 14px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 12px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.profile-name {
  color: var(--text);
  font-weight: 800;
  font-size: 14px;
}

.sidebar-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 6px 0;
}

.sidebar-text {
  white-space: nowrap;
}

.sidebar-collapsed .sidebar-text {
  display: none;
}

/* leaf */
.menu-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  color: var(--text);
}

.menu-link:hover {
  background: var(--hover);
  color: #fff;
}

.menu-link.router-link-active {
  background: var(--brand);
  color: #fff;
}

/* parent */
.menu-parent {
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 10px;
  color: var(--text);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-parent:hover {
  background: var(--hover);
  color: #fff;
}

.menu-parent.active {
  background: transparent;
  color: var(--brand);
  border: 1px solid var(--brand);
}

/* submenu */
.submenu {
  list-style: none;
  padding: 6px 0 0 0;
  margin: 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px 32px;
  border-radius: 10px;
  color: var(--text);
}

.submenu-link:hover {
  background: var(--hover);
  color: #fff;
}

.submenu-link.router-link-active {
  background: var(--brand);
  color: #fff;
}

/* arrow */
.rotated {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}

/* submenu animation */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.18s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* logout */
.sidebar-footer {
  margin-top: auto;
  padding-top: 10px;
}

.sidebar-logout {
  width: 100%;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  border-radius: 10px;
  padding: 10px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-logout:hover {
  background: var(--hover);
  color: #fff;
}

/* ================= TOPBAR ================= */
.topbar {
  position: fixed;
  top: 0;
  left: 60px;
  right: 0;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid var(--border);
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
  font-weight: 900;
  color: var(--text);
  font-size: 16px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.icon-btn:hover {
  background: var(--hover);
  color: #fff;
  transform: translateY(-1px);
}

/* ================= SETTINGS ================= */
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
  padding: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.settings-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  color: #cfe0ff;
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
  font-weight: 900;
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
  font-weight: 800;
}

.row-sub {
  font-size: 12px;
  opacity: 0.85;
}

/* switch */
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
  inset: 0;
  cursor: pointer;
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

/* ================= FOOTER ================= */
.footer {
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  height: 44px;
  background: #fff;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: left 0.2s ease;
  z-index: 800;
}

.sidebar-collapsed~.footer,
.sidebar-collapsed+.footer {
  left: 60px;
}

.footer-expanded {
  left: 220px;
}

.copyright {
  margin: 0;
  font-size: 13px;
  color: #4e6082;
}
</style>

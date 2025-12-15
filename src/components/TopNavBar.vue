<template>
  <div v-if="isLoggedIn">
    <div class="sidebar " :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <button class="sidebar-toggle" @click="toggleSidebar">
        <i class="pi pi-bars"></i>
      </button>

      <ul v-if="!permission">
        <li>
          <RouterLink to="/listRegisterService">
            <span class="p-menuitem-icon pi pi-fw pi-list" data-pc-section="icon"></span>
            <span class="sidebar-text">Danh sách đăng ký</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/addemployee">
            <span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>
            <span class="sidebar-text">Thêm nhân viên</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/showlistemployee">
            <span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>
            <span class="sidebar-text">Danh sách nhân viên</span>
          </RouterLink>
        </li>
      </ul>

      <ul v-else>
        <li>
          <RouterLink to="/sendmessage">
            <span class="p-menuitem-icon pi pi-fw pi-send" data-pc-section="icon"></span>
            <span class="sidebar-text">Gửi tin nhắn</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/uploadImage">
            <span class="p-menuitem-icon pi pi-fw pi-upload" data-pc-section="icon"></span>
            <span class="sidebar-text">Đăng hình ảnh</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/managerGroup">
            <span class="p-menuitem-icon pi pi-fw pi-sitemap" data-pc-section="icon"></span>
            <span class="sidebar-text">Quản lý nhóm</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/registerUser">
            <span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>
            <span class="sidebar-text">Đăng ký tài khoản</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/userList">
            <span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>
            <span class="sidebar-text">Quản lý tài khoản</span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- HEADER CŨ – GIỮ NGUYÊN -->
    <div id="header" :model="appMenu">
      <div class="wrap_header">
        <div class="menubar" v-if="!permission">
          <ul>
            <li>
              <RouterLink to="/listRegisterService">
                <span class="p-menuitem-icon pi pi-fw pi-list" data-pc-section="icon"></span>Danh sách đăng ký
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/addemployee">
                <span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Thêm nhân viên
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/showlistemployee">
                <span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Danh sách nhân viên
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="menubar" v-else>
          <ul>
            <li>
              <RouterLink erLink to="/sendmessage">
                <span class="p-menuitem-icon pi pi-fw pi-send" data-pc-section="icon"></span>Gửi tin nhắn
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/uploadImage">
                <span class="p-menuitem-icon pi pi-fw pi-upload" data-pc-section="icon"></span>Đăng hình ảnh
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/managerGroup">
                <span class="p-menuitem-icon pi pi-fw pi-sitemap" data-pc-section="icon"></span>Quản lý nhóm
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/registerUser">
                <span class="p-menuitem-icon pi pi-fw pi-user-plus" data-pc-section="icon"></span>Đăng ký tài khoản
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/userList">
                <span class="p-menuitem-icon pi pi-fw pi-users" data-pc-section="icon"></span>Quản lý tài khoản
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="logouts">
          <Button label="Đăng xuất" icon="pi pi-sign-out" class="btn-logout" @click="logout" />
        </div>
      </div>
    </div>

    <div id="fotter">
      <div class="wrap_header">
        <p class="coppyi">© Copyright 2025 - Bệnh viện Đa khoa Thành phố Vinh</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import router from '@/router'

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    const permission = ref(false)

    // trạng thái thu gọn của left bar
    const isSidebarCollapsed = ref(false)
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const appMenu = computed(() => {
      console.log('check appMenu')
      const menu = ref([
        {
          label: 'Danh sách bệnh nhân đăng ký khám bệnh',
          icon: 'pi pi-fw pi-list',
          to: '/listRegisterService'
        },
        {
          label: 'Thêm nhân viên hỗ trợ',
          icon: 'pi pi-fw pi-user-plus',
          to: '/addemployee'
        },
        {
          label: 'Danh sách nhân viên',
          icon: 'pi pi-fw pi-users',
          to: '/showlistemployee'
        }
      ])
      const menuDefault = ref([])

      if (store.state.permission === 'admin') {
        permission.value = true
      } else {
        permission.value = false
      }

      // để computed có return, tránh warning
      return permission.value ? menu.value : menuDefault.value
    })

    const logout = () => {
      store.dispatch('clearToken')
      store.dispatch('clearPermission')
      router.push({
        name: 'login'
      })
      toast.add({
        severity: 'success',
        summary: 'Đăng xuất',
        detail: 'Đã xóa thông tin đăng nhập thành công',
        life: 1000
      })
    }

    const gotoLoginPage = () => {
      router.push({
        name: 'login'
      })
    }

    return {
      appMenu,
      logout,
      gotoLoginPage,
      permission,
      isSidebarCollapsed,
      toggleSidebar
    }
  }
}
</script>


<style scoped lang="scss">
.p-menubar {
  width: 100%;
  background: white;
  border-radius: 0;
}

a {
  text-decoration: none;
}

// Đăng xuất button
.btn-logout {
  background: #06b649 !important;
  color: #fff !important;
  border: 1px solid #06b649 !important;
  box-shadow: none !important;
}

.btn-logout:hover,
.btn-logout:active,
.btn-logout:focus {
  background: #ffffff !important;
  color: #06b649 !important;
  border-color: #ffffff !important;
}

.btn-logout:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 153, 204, 0.25) !important;
}

/* LEFT SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #06b649;
  border-right: 1px solid #ddd;
  padding-top: 10px;
  padding-inline: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  transition: width 0.2s ease;
  z-index: 1000;
}

.sidebar-collapsed {
  width: 60px;
  background-color: #06b64900;
}

.sidebar-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #fff;
  margin-bottom: 12px;
  font-size: 18px;
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
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  color: #ffffff;
}

.sidebar li :hover {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: #ffffff;
  color: #06b649;
}

.sidebar a.router-link-active {
  background: #ffffff;
  color: #06b649;
}

.sidebar-text {
  white-space: nowrap;
}

.sidebar-collapsed .sidebar-text {
  display: none;
}

#header,
#fotter {
  margin-left: 220px;
  transition: margin-left 0.2s ease;
}

.sidebar-collapsed~#header,
.sidebar-collapsed~#fotter {
  margin-left: 0px;
}
</style>

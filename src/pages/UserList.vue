<template>
  <ConfirmPopup />
  <PageLayout title="Quản lý tài khoản" subtitle="Xem và quản lý danh sách tài khoản người dùng"
    :breadcrumbs="[{ label: 'Quản lý tài khoản' }]">
    <!-- List Panel -->
    <Panel header="Danh sách tài khoản" class="card">
      <!-- Toolbar -->
      <div class="toolbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model.lazy="filters.global.value as any" placeholder="Tìm theo tên hoặc tài khoản" />
        </span>
        <Button label="Xoá bộ lọc" class="btn-outline" @click="resetFilters" />
      </div>

      <!-- DataTable -->
      <DataTable :loading="isLoading" :value="userList" :paginator="true" stripedRows :rows="10"
        :rowsPerPageOptions="[10, 25, 50]" :rowHover="true" v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :globalFilterFields="['fullname', 'username']"
        currentPageReportTemplate="Hiển thị {first} - {last} của {totalRecords} tài khoản">
        <Column field="fullname" header="Họ và tên" sortable />
        <Column field="username" header="Tài khoản" sortable />
        <Column field="permission" header="Quyền hạn" sortable />
        <Column header="Hành động" bodyStyle="text-align: center; width: 100px">
          <template #body="{ data }">
            <Button label="Chỉnh sửa" icon="pi pi-pencil" class="btn-primary" @click="openEditDialog(data.id)"
              style="width: 100%" />
          </template>
        </Column>
      </DataTable>
    </Panel>

    <!-- Edit Dialog -->
    <Dialog v-model:visible="isDialogOpen" :style="{ width: '90vw' }"
      :breakpoints="{ '1500px': '70vw', '1150px': '80vw' }" header="Cập nhật tài khoản" modal>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-6">
          <label>Tên đăng nhập</label>
          <InputText v-model="formData.username" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label>Mật khẩu (tối thiểu 6 ký tự)</label>
          <Password v-model="formData.password" toggleMask :feedback="true" placeholder="Để trống nếu không đổi" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label>Họ và tên</label>
          <InputText v-model="formData.fullname" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label>Quyền hạn</label>
          <Dropdown v-model="formData.permission" :options="PERMISSION_OPTIONS" optionLabel="label" optionValue="value"
            placeholder="Chọn quyền hạn" />
        </div>
      </div>

      <template #footer>
        <Button label="Cập nhật" icon="pi pi-sync" class="btn-primary" @click="saveUser" />
        <Button label="Xoá" icon="pi pi-trash" class="btn-danger" @click="confirmDelete" style="margin-left: 8px" />
        <Button label="Huỷ" icon="pi pi-times" class="btn-outline" @click="closeDialog" style="margin-left: 8px" />
      </template>
    </Dialog>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { FilterMatchMode } from 'primevue/api'
import AuthRepository from '@/services/AuthRepository'
import PageLayout from '@/components/PageLayout.vue'
import type { UserDetail } from '@/models/userDetail'
import type { UserUpdate } from '@/models/userUpdate'

// ===== CONSTANTS =====
const PERMISSION_OPTIONS = [
  { label: 'Quản lý', value: 'admin', param: 1 },
  { label: 'Nhân viên', value: 'user', param: 2 }
]

// ===== SETUP =====
const store = useStore()
const router = useRouter()
const toast = useToast()
const confirm = useConfirm()

// Redirect if not admin
if (store.state.permission !== 'admin') {
  router.push({ name: 'home' })
}

// ===== STATE =====
const userList = ref<UserDetail[]>([])
const isLoading = ref(false)
const isDialogOpen = ref(false)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const formData = reactive<UserUpdate>({
  id: 0,
  username: '',
  password: '',
  fullname: '',
  permission: ''
})

// ===== METHODS =====

/**
 * Load users from API
 */
const loadUsers = async () => {
  try {
    isLoading.value = true
    const response = await AuthRepository.getListUser()
    userList.value = response.data
  } catch (error: any) {
    showErrorToast('Lỗi', error?.response?.data?.message || 'Không thể tải dữ liệu')
  } finally {
    isLoading.value = false
  }
}

/**
 * Open dialog to edit user
 */
const openEditDialog = async (userId: string) => {
  try {
    const response = await AuthRepository.getUserById(userId)
    Object.assign(formData, response.data, { password: '' })
    isDialogOpen.value = true
  } catch (error: any) {
    showErrorToast('Lỗi', error?.response?.data?.message || 'Không thể tải dữ liệu người dùng')
  }
}

/**
 * Save user changes
 */
const saveUser = async () => {
  // Validate required fields
  if (!formData.username?.trim() || !formData.fullname?.trim()) {
    showErrorToast('Lỗi', 'Vui lòng điền tất cả trường bắt buộc')
    return
  }

  // Validate password if provided
  if (formData.password && formData.password.length < 6) {
    showErrorToast('Lỗi', 'Mật khẩu phải tối thiểu 6 ký tự')
    return
  }

  try {
    await AuthRepository.updateUser(formData)
    showSuccessToast('Cập nhật thông tin tài khoản thành công')
    closeDialog()
    await loadUsers()
  } catch (error: any) {
    showErrorToast('Lỗi cập nhật', error?.response?.data?.message || 'Cập nhật thất bại')
  }
}

/**
 * Delete user with confirmation
 */
const confirmDelete = () => {
  confirm.require({
    message: 'Bạn có chắc muốn xoá tài khoản này không?',
    header: 'Xác nhận xoá',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Xoá',
    rejectLabel: 'Huỷ',
    accept: () => deleteUser(),
    reject: () => { } // No-op for cancel
  })
}

/**
 * Delete user from API
 */
const deleteUser = async () => {
  try {
    await AuthRepository.deleteUser(formData.id)
    showSuccessToast('Tài khoản đã được xoá thành công')
    closeDialog()
    await loadUsers()
  } catch (error: any) {
    showErrorToast('Lỗi xoá', error?.response?.data?.message || 'Xoá thất bại')
  }
}

/**
 * Close dialog and reset form
 */
const closeDialog = () => {
  isDialogOpen.value = false
  Object.assign(formData, {
    id: '',
    username: '',
    password: '',
    fullname: '',
    permission: ''
  })
}

/**
 * Reset all filters
 */
const resetFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
}

// ===== TOAST HELPERS =====

/**
 * Show success toast message
 */
const showSuccessToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Thành công',
    detail: message,
    life: 2000
  })
}

/**
 * Show error toast message
 */
const showErrorToast = (title: string, message?: string) => {
  toast.add({
    severity: 'error',
    summary: title,
    detail: message || 'Có lỗi xảy ra',
    life: 3000
  })
}

// ===== LIFECYCLE =====
onMounted(() => {
  loadUsers()
})
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);

  .p-input-icon-left {
    flex: 1;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;

    .p-input-icon-left {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
<template>
  <PageLayout title="Quản lý danh mục menu">
    <div class="menu-page">
      <!-- Toolbar -->
      <div class="toolbar">
        <div class="actions">
          <Button class="btn-primary" icon="pi pi-plus" label="Thêm menu cha" @click="openAdd('parent')" />
          <Button class="btn-primary" icon="pi pi-plus-circle" label="Thêm menu con" :disabled="!hasParents"
            @click="openAdd('child')" />
          <Button class="btn-outline" icon="pi pi-save" label="Lưu cấu hình" @click="saveAllChanges" />
          <Button class="btn-outline" icon="pi pi-refresh" label="Khôi phục mặc định" @click="confirmResetMenu" />
        </div>
        <span class="p-input-icon-left search">
          <i class="pi pi-search"></i>
          <InputText v-model="searchText" placeholder="Tìm menu..." />
        </span>
      </div>

      <!-- List -->
      <div class="list">
        <div v-for="p in filteredParents" :key="p.id" class="parent-item">
          <div class="parent-row">
            <div class="col-name"><i v-if="p.icon" :class="p.icon"></i> <strong>{{ p.label }}</strong></div>
            <div class="col-status"><span class="badge" :class="{ off: p.isActive === false }">{{ p.isActive === false ?
              'ẨN' : 'HIỂN THỊ' }}</span></div>
            <div class="col-actions">
              <Button class="p-button-text p-button-sm" label="Sửa" @click="openEdit(p)" />
              <Button class="p-button-text p-button-sm" label="Thêm con" @click="openAdd('child', p.id)" />
              <Button class="p-button-text p-button-danger p-button-sm" label="Xóa" @click="confirmDelete(p.id)" />
            </div>
          </div>
          <ul class="child-list" v-if="p.children && p.children.length">
            <li v-for="c in p.children" :key="c.id">
              <span><i v-if="c.icon" :class="c.icon"></i> {{ c.label }}</span>
              <div class="actions">
                <Button class="p-button-text p-button-sm" icon="pi pi-pencil" @click="openEdit(c, p.id)" />
                <Button class="p-button-text p-button-danger p-button-sm" icon="pi pi-trash"
                  @click="confirmDelete(c.id)" />
              </div>
            </li>
          </ul>
          <div v-else class="no-children">Chưa có menu con</div>
        </div>
      </div>

      <ConfirmDialog />

      <!-- Dialog thêm/sửa -->
      <Dialog header="Thêm / Chỉnh sửa menu" v-model:visible="dialogVisible" :modal="true" :style="{ width: '500px' }">
        <div class="dialog-form">
          <div class="form-row">
            <label>Tên hiển thị <span class="required">*</span></label>
            <InputText v-model="form.label" />
          </div>

          <div class="form-row">
            <label>Icon (PrimeIcons)</label>
            <InputText v-model="form.icon" placeholder="vd: pi pi-home" />
          </div>

          <div class="form-row">
            <label>Route (to)</label>
            <InputText v-model="form.to" placeholder="vd: /sendmessage" />
          </div>

          <div class="form-row">
            <label>Loại</label>
            <Dropdown v-model="form.type" :options="TYPE_OPTIONS" optionLabel="label" optionValue="value" />
          </div>

          <div class="form-row" v-if="form.type === 'child'">
            <label>Menu cha <span class="required">*</span></label>
            <Dropdown v-model="form.parentId" :options="parentOptions" optionLabel="label" optionValue="value"
              placeholder="Chọn menu cha" />
          </div>

          <div class="form-row switch-row">
            <label>Hiển thị</label>
            <InputSwitch v-model="form.isActive" />
          </div>

          <div class="form-actions">
            <Button class="btn-primary" icon="pi pi-check" label="Lưu" @click="submitForm" />
            <Button class="btn-outline" icon="pi pi-times" label="Huỷ" @click="dialogVisible = false" />
          </div>
        </div>
      </Dialog>
    </div>
  </PageLayout>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import PageLayout from '@/components/PageLayout.vue'
import { menuData, loadMenu, saveMenu, resetMenu } from '@/config/menuStore'
import type { MenuItem, SidebarMenuData } from '@/config/menuStore'

const TYPE_OPTIONS = [
  { label: 'Menu cha', value: 'parent' },
  { label: 'Menu con', value: 'child' }
]

const toast = useToast()
const confirm = useConfirm()

// State
const parents = ref<MenuItem[]>([])
const searchText = ref('')
const dialogVisible = ref(false)
const form = reactive({
  id: '',
  label: '',
  icon: '',
  to: '',
  type: 'parent' as 'parent' | 'child',
  parentId: null as string | null,
  isActive: true
})
const isEdit = ref(false)

// Computed
const parentOptions = computed(() =>
  parents.value.map((p) => ({ label: p.label, value: p.id }))
)

const hasParents = computed(() => parents.value.length > 0)

const filteredParents = computed(() => {
  const q = (searchText.value || '').toLowerCase().trim()
  if (!q) return parents.value

  return parents.value.filter(
    (p) =>
      p.label.toLowerCase().includes(q) ||
      (p.children || []).some((c) => c.label.toLowerCase().includes(q))
  )
})

// Methods - Load dữ liệu từ localStorage
const loadData = () => {
  loadMenu()
  parents.value = JSON.parse(JSON.stringify(menuData.value.admin || []))
  console.log('Loaded menu from localStorage:', parents.value)
}

// Save dữ liệu vào localStorage (nơi dữ liệu thực được lưu)
const saveAllChanges = () => {
  try {
    const payload: SidebarMenuData = {
      version: 3,
      items: menuData.value.items || [],
      admin: JSON.parse(JSON.stringify(parents.value)),
      user: menuData.value.user || []
    }

    console.log('🔴 Saving menu to localStorage:', payload)

    // Lưu vào localStorage - đây là nơi dữ liệu thực được lưu
    saveMenu(payload)

    // Verify save
    const saved = localStorage.getItem('BVTP_SIDEBAR_MENU_V1')
    console.log('✅ Saved in localStorage:', saved)

    toast.add({
      severity: 'success',
      summary: 'Lưu',
      detail: 'Đã lưu cấu hình menu thành công',
      life: 1200
    })
  } catch (error: any) {
    console.error('❌ Failed to save menu config:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể lưu cấu hình menu',
      life: 2000
    })
  }
}

const openAdd = (type: 'parent' | 'child', parentId?: string) => {
  isEdit.value = false
  form.id = ''
  form.label = type === 'parent' ? 'Menu cha mới' : 'Menu con mới'
  form.icon = ''
  form.to = ''
  form.type = type
  form.parentId = parentId || null
  form.isActive = true
  dialogVisible.value = true
}

const openEdit = (item: MenuItem, parentId?: string) => {
  isEdit.value = true
  form.id = item.id
  form.label = item.label
  form.icon = item.icon || ''
  form.to = item.to || ''
  form.type = parentId ? 'child' : 'parent'
  form.parentId = parentId || null
  form.isActive = item.isActive !== false
  dialogVisible.value = true
}

const submitForm = () => {
  const lbl = (form.label || '').trim()
  if (!lbl) {
    toast.add({ severity: 'warn', summary: 'Thiếu dữ liệu', detail: 'Tên hiển thị không được để trống' })
    return
  }

  if (form.type === 'child' && !form.parentId) {
    toast.add({ severity: 'warn', summary: 'Thiếu dữ liệu', detail: 'Menu con phải chọn menu cha' })
    return
  }

  if (isEdit.value) {
    // Update existing
    if (form.type === 'parent') {
      const i = parents.value.findIndex((p) => p.id === form.id)
      if (i >= 0) {
        parents.value[i] = {
          ...parents.value[i],
          label: lbl,
          icon: form.icon || '',
          to: form.to || '',
          isActive: form.isActive
        }
      } else {
        // Find in children and move to parents
        for (const p of parents.value) {
          const ci = (p.children || []).findIndex((c) => c.id === form.id)
          if (ci >= 0) {
            const moved = p.children!.splice(ci, 1)[0]
            parents.value.push({
              id: form.id,
              label: lbl,
              icon: form.icon || '',
              to: form.to || '',
              isActive: form.isActive,
              children: moved.children || []
            })
            break
          }
        }
      }
    } else {
      // Update/move child
      for (const p of parents.value) {
        p.children = (p.children || []).filter((c) => c.id !== form.id)
      }
      const target = parents.value.find((p) => p.id === form.parentId)
      if (target) {
        if (!target.children) target.children = []
        target.children.push({
          id: form.id,
          label: lbl,
          icon: form.icon || '',
          to: form.to || '',
          isActive: form.isActive
        })
      }
    }
  } else {
    // Create new
    if (form.type === 'parent') {
      const id = `p_${Date.now()}`
      parents.value.push({
        id,
        label: lbl,
        icon: form.icon || '',
        to: form.to || '',
        isActive: form.isActive,
        children: []
      })
    } else {
      const target = parents.value.find((p) => p.id === form.parentId)
      if (target) {
        if (!target.children) target.children = []
        target.children.push({
          id: `c_${Date.now()}`,
          label: lbl,
          icon: form.icon || '',
          to: form.to || '',
          isActive: form.isActive
        })
      }
    }
  }

  // Lưu vào localStorage ngay sau khi submit form
  saveAllChanges()
  dialogVisible.value = false
}

const confirmDelete = (id: string) => {
  confirm.require({
    header: 'Xác nhận xoá',
    icon: 'pi pi-exclamation-triangle',
    message: 'Bạn chắc chắn muốn xoá? Nếu là menu cha sẽ xoá luôn các menu con.',
    acceptLabel: 'Xoá',
    rejectLabel: 'Huỷ',
    accept: () => deleteItem(id)
  })
}

const deleteItem = (id: string) => {
  try {
    const pIndex = parents.value.findIndex((p) => p.id === id)
    if (pIndex >= 0) {
      parents.value.splice(pIndex, 1)
    } else {
      for (const p of parents.value) {
        p.children = (p.children || []).filter((c) => c.id !== id)
      }
    }

    // Lưu vào localStorage ngay sau khi xóa
    saveAllChanges()

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã xóa menu thành công',
      life: 1200
    })
  } catch (error: any) {
    console.error('Failed to delete menu item:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể xóa menu',
      life: 2000
    })
  }
}

const confirmResetMenu = () => {
  confirm.require({
    header: 'Xác nhận khôi phục',
    icon: 'pi pi-refresh',
    message: 'Khôi phục menu về mặc định? Sẽ mất cấu hình đang chỉnh.',
    acceptLabel: 'Khôi phục',
    rejectLabel: 'Huỷ',
    accept: () => {
      try {
        // Reset về default và lưu vào localStorage
        resetMenu()
        loadData()

        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã khôi phục menu về mặc định'
        })
      } catch (error: any) {
        console.error('Failed to reset menu:', error)
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể khôi phục menu',
          life: 2000
        })
      }
    }
  })
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.menu-page {
  padding: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.search {
  width: 300px;
}

.list {
  display: grid;
  gap: 12px;
}

.parent-item {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
}

.parent-row {
  display: grid;
  grid-template-columns: 1fr 100px 180px;
  gap: 12px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.col-name {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.col-status {
  text-align: center;
}

.col-actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  font-weight: 500;
}

.badge.off {
  opacity: 0.6;
}

.child-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  display: grid;
  gap: 8px;
}

.child-list li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 8px;
  background: #f9fafb;
  border-radius: 4px;
  border-left: 3px solid #3b82f6;
}

.child-list .actions {
  display: flex;
  gap: 4px;
}

.no-children {
  padding: 12px 8px;
  color: #9ca3af;
  font-size: 13px;
}

.dialog-form {
  display: grid;
  gap: 16px;
}

.form-row {
  display: grid;
  gap: 6px;
}

.form-row label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.switch-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-primary {
  background: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: #fff !important;

  &:hover {
    background: #2563eb !important;
    border-color: #2563eb !important;
  }
}

.btn-outline {
  background: #fff !important;
  border-color: #d1d5db !important;
  color: #374151 !important;

  &:hover {
    border-color: #9ca3af !important;
  }
}

:deep(.p-button-sm) {
  padding: 0.5rem 0.75rem !important;
  font-size: 12px !important;
}
</style>

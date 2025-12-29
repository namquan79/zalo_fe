# Hướng Dẫn Hoàn Thiện Giao Diện Tất Cả Trang

## 📋 Tổng Quan

Dự án hiện có **26 trang** cần cập nhật giao diện theo pattern thống nhất. Tôi đã:

1. ✅ **Tạo base styling** (`src/styles/global.scss`)
2. ✅ **Tạo PageLayout component** (`src/components/PageLayout.vue`)
3. ✅ **Update UserList.vue** - Ví dụ hoàn thiện
4. ⏳ **Còn lại: 24 trang** cần theo pattern tương tự

## 🎯 Pattern Chuẩn

Tất cả các trang danh sách nên follow pattern này:

### Template
```vue
<template>
  <PageLayout
    title="Tiêu đề trang"
    subtitle="Mô tả ngắn"
    :breadcrumbs="[{ label: 'Menu cha' }, { label: 'Trang hiện tại' }]"
  >
    <!-- Card/Panel chứa content -->
    <Panel header="Danh sách" class="card">
      <!-- Toolbar: Search + Filters + Actions -->
      <div class="toolbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <InputText v-model.lazy="searchText" placeholder="Tìm kiếm..." />
        </span>
        <Button label="Thêm mới" class="btn-primary" @click="openAdd()" />
      </div>

      <!-- DataTable -->
      <DataTable :value="list" :paginator="true" :rows="10">
        <Column field="name" header="Tên" sortable></Column>
        <Column header="Hành động" bodyStyle="text-align: center">
          <template #body="slotProps">
            <Button label="Sửa" class="btn-secondary" @click="openEdit(slotProps.data)" />
            <Button label="Xoá" class="btn-danger" @click="delete(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </Panel>

    <!-- Dialog for Add/Edit -->
    <Dialog v-model:visible="dialogVisible" header="Thêm/Sửa" modal>
      <!-- Form content -->
      <template #footer>
        <Button label="Lưu" class="btn-primary" @click="save()" />
        <Button label="Huỷ" class="btn-outline" @click="dialogVisible = false" />
      </template>
    </Dialog>
  </PageLayout>
</template>
```

### Script
```typescript
import { ref } from 'vue'
import PageLayout from "@/components/PageLayout.vue"

export default {
  components: { PageLayout },
  setup() {
    const list = ref([])
    const dialogVisible = ref(false)
    const searchText = ref('')

    const loadData = () => { /* API call */ }
    const openAdd = () => { dialogVisible.value = true }
    const openEdit = (item) => { /* ... */ }
    const save = () => { /* API call */ }
    const delete = (item) => { /* confirm + API call */ }

    loadData()

    return { list, dialogVisible, searchText, loadData, openAdd, openEdit, save, delete }
  }
}
```

## 📝 Các Trang Cần Update

### Trang Danh Sách (Priority: High)
1. ✅ **UserList.vue** - ĐÃ LÀM
2. **ShowListEmployee.vue**
3. **ShowListRegisterService.vue**
4. **ShowListInfo.vue**
5. **ShowListStatistical.vue**
6. **ManagerGroupPage.vue**

### Trang Form (Priority: High)
7. **AddEmployeePage.vue**
8. **AddInfo.vue**
9. **UpdateEmployeePage.vue**
10. **UpdateInfo.vue**
11. **UpdateRegisterService.vue**
12. **UserUpdatePage.vue**

### Trang Khác (Priority: Medium)
13. **SendMessagePage.vue**
14. **UploadImage.vue**
15. **RegisterUserPage.vue**
16. **ReLoginPage.vue**
17. **CreateTeam.vue**
18. **LoginPage.vue**
19. **Home.vue**
20. **KetQuaCLS.vue**
21. **DownloadInfo.vue**
22. **AddPersionInfo.vue**
23. **Statistical.vue**
24. **AllMenuCategoryPage.vue** - ĐÃ HOÀN THIỆN
25. **ManagerCategoryMenuPage.vue** - ĐÃ HOÀN THIỆN

## 🛠️ Cách Cập Nhật

### Step 1: Wrap trang với PageLayout
```vue
<template>
  <PageLayout title="Tiêu đề" subtitle="Mô tả">
    <!-- Nội dung cũ ở đây -->
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue"
export default {
  components: { PageLayout },
  setup() { /* ... */ }
}
</script>
```

### Step 2: Cập nhật CSS
- Xoá CSS cũ (class như `on_pn`, `tt_page`, `on_dskb`)
- Sử dụng utility classes từ `global.scss` hoặc thêm `<style scoped>`

### Step 3: Sửa Layout
Thay thế:
```html
<div class="on_pn">
  <h2 class="tt_page">Tiêu đề</h2>
  <div class="on_choose">
```

Thành:
```html
<PageLayout title="Tiêu đề">
  <Panel header="Chi tiết">
```

### Step 4: Responsive
Thêm `@media (max-width: 768px)` cho mobile

## 🎨 CSS Utility Classes

Từ `global.scss`, sử dụng:

```scss
// Layout
.page-container { /* padding & bg */ }
.card { /* white bg, border, shadow */ }

// Buttons
.btn-primary { /* green */ }
.btn-secondary { /* blue */ }
.btn-danger { /* red */ }
.btn-outline { /* white with border */ }

// Forms
.form-group { /* label + input styling */ }

// Utilities
.d-flex { display: flex }
.gap-2 { gap: 8px }
.mt-2 { margin-top: 8px }
.text-muted { color: var(--text-muted) }
```

## 📦 Thành Phần Cần Import

```typescript
// Layout
import PageLayout from "@/components/PageLayout.vue"

// PrimeVue
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import ConfirmPopup from 'primevue/confirmpopup'
```

## ✅ Checklist Hoàn Thiện Trang

- [ ] Wrap `<PageLayout title="..." subtitle="...">`
- [ ] Thêm `<Panel header="...">` cho sections
- [ ] Thay button class cũ → `btn-primary`, `btn-danger`, etc
- [ ] Xoá CSS cũ, sử dụng utility classes
- [ ] Thêm responsive breakpoints
- [ ] Test trên mobile (768px)
- [ ] Kiểm tra TypeScript errors

## 🚀 Ưu Tiên

**Tuần 1:**
- ShowListEmployee, ShowListRegisterService, ShowListInfo
- AddEmployeePage, UpdateEmployeePage
- SendMessagePage

**Tuần 2:**
- Trang form còn lại
- Trang quản trị (ManagerGroupPage, CreateTeam)

**Tuần 3:**
- Trang utility (UploadImage, KetQuaCLS)
- Fine-tuning styling

## 💡 Tips

1. **Copy-paste UserList.vue** làm template
2. **Giữ logic cũ**, chỉ thay giao diện
3. **Test khi sửa** để không break functionality
4. **Group các trang** theo loại (danh sách, form, utility)
5. **Dùng grep** để tìm các trang còn sử dụng CSS cũ:
   ```bash
   grep -r "on_pn\|tt_page\|on_choose" src/pages/
   ```

## 📞 Hỗ Trợ

Nếu có issue:
- Kiểm tra TypeScript errors: `npm run lint`
- Kiểm tra network: `npm run dev`
- So sánh với UserList.vue (pattern chuẩn)

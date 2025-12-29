# Clean Code Refactoring Guide

## Overview
This guide defines the clean code standards for the ZaloOA_Vinh_FE project. All pages should follow these patterns for consistency, maintainability, and readability.

---

## 1. Code Organization

### File Structure
```
Page File Structure:
├── <template>
│   └── PageLayout wrapper
│       ├── List/Form content
│       ├── Dialogs/Modals
│       └── Confirmation popups
├── <script setup lang="ts">
│   ├── Imports (grouped)
│   ├── Constants
│   ├── Setup (composables, store, router, toast, confirm)
│   ├── State (refs, reactives)
│   ├── Methods (grouped by functionality)
│   │   ├── Data operations (load, save, delete)
│   │   ├── UI operations (open, close dialogs)
│   │   └── Toast helpers
│   └── Lifecycle hooks
└── <style scoped lang="scss">
    └── Component styles (using CSS variables)
```

### Import Organization
```typescript
// 1. Vue & Composition API
import { ref, reactive, computed, onMounted } from 'vue'

// 2. Vue Router & Store
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 3. PrimeVue Composables
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { FilterMatchMode } from 'primevue/api'

// 4. Custom Services & Components
import AuthRepository from '@/services/AuthRepository'
import PageLayout from '@/components/PageLayout.vue'

// 5. Type Imports
import type { UserDetail } from '@/models/userDetail'
```

---

## 2. Setup Syntax Pattern

### Convert from Options API
**Before (Options API):**
```typescript
export default {
  components: { PageLayout },
  setup() {
    const toast = useToast()
    const list = ref([])
    // ... more code
    return { list, ... }
  }
}
```

**After (Setup Syntax):**
```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import PageLayout from '@/components/PageLayout.vue'

const toast = useToast()
const list = ref([])
// All vars/functions auto-exposed to template
</script>
```

### Benefits
- Cleaner syntax (no setup() function wrapper)
- Less boilerplate
- Better TypeScript support
- Automatic component registration
- Better IDE autocomplete

---

## 3. Naming Conventions

### State Variables
```typescript
// List pages
const userList = ref<UserDetail[]>([])
const isLoading = ref(false)
const isDialogOpen = ref(false)
const formData = reactive<UserUpdate>({...})
const filters = ref({...})

// Form pages
const initialData = ref<UserUpdate>({...})
const formData = reactive<UserUpdate>({...})
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})
```

### Methods
```typescript
// Data operations - verb + noun
const loadUsers = async () => {}
const saveUser = async () => {}
const deleteUser = async () => {}

// UI operations - action verb
const openDialog = () => {}
const closeDialog = () => {}
const resetForm = () => {}
const clearFilters = () => {}

// Validation & helpers
const validateForm = (): boolean => {}
const getErrorMessage = (field: string) => {}

// Toast helpers
const showSuccessToast = (message: string) => {}
const showErrorToast = (title: string, message?: string) => {}
```

### Constants
```typescript
// All caps with underscores
const PERMISSION_OPTIONS = [...]
const DEFAULT_PAGE_SIZE = 10
const DEBOUNCE_DELAY = 300
```

---

## 4. List Page Pattern

### Template Structure
```vue
<template>
  <ConfirmPopup />
  <PageLayout title="..." subtitle="..." :breadcrumbs="[...]">
    <!-- List Panel -->
    <Panel header="..." class="card">
      <!-- Toolbar: Search, Filters, Actions -->
      <div class="toolbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model.lazy="filters.global.value" placeholder="..." />
        </span>
        <Button label="Clear" class="btn-outline" @click="resetFilters" />
      </div>

      <!-- DataTable -->
      <DataTable :value="itemList" :loading="isLoading" ...>
        <Column field="name" header="Name" sortable />
        <!-- Action column -->
        <Column header="Actions" bodyStyle="text-align: center">
          <template #body="{ data }">
            <Button label="Edit" @click="openEditDialog(data.id)" />
          </template>
        </Column>
      </DataTable>
    </Panel>

    <!-- Edit Dialog -->
    <Dialog v-model:visible="isDialogOpen" header="..." modal>
      <!-- Form fields -->
      <template #footer>
        <Button label="Save" @click="save" />
        <Button label="Delete" @click="confirmDelete" />
        <Button label="Cancel" @click="closeDialog" />
      </template>
    </Dialog>
  </PageLayout>
</template>
```

### Script Structure
```typescript
<script setup lang="ts">
// Constants
const PERMISSION_OPTIONS = [...]

// Setup
const store = useStore()
const router = useRouter()
const toast = useToast()
const confirm = useConfirm()

// Permission check
if (store.state.permission !== 'admin') {
  router.push({ name: 'home' })
}

// State
const itemList = ref<ItemType[]>([])
const isLoading = ref(false)
const isDialogOpen = ref(false)
const formData = reactive<ItemUpdate>({...})
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Methods: Data Operations
const loadItems = async () => {...}
const openEditDialog = async (id: string) => {...}
const saveItem = async () => {...}
const deleteItem = async () => {...}

// Methods: UI Operations
const closeDialog = () => {...}
const resetFilters = () => {...}
const confirmDelete = () => {...}

// Methods: Toast Helpers
const showSuccessToast = (msg: string) => {...}
const showErrorToast = (title: string, msg?: string) => {...}

// Lifecycle
onMounted(() => {
  loadItems()
})
</script>
```

---

## 5. Form Page Pattern

### Template Structure
```vue
<template>
  <PageLayout title="..." subtitle="..." :breadcrumbs="[...]">
    <Panel header="..." class="card">
      <form @submit.prevent="submitForm" class="p-fluid">
        <!-- Form fields -->
        <div class="p-field">
          <label>Name</label>
          <InputText v-model="formData.name" />
          <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
        </div>

        <!-- Submit/Cancel buttons -->
        <div class="button-group" style="margin-top: 24px">
          <Button
            label="Save"
            type="submit"
            icon="pi pi-save"
            class="btn-primary"
            :loading="isSubmitting"
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="btn-outline"
            @click="goBack"
          />
        </div>
      </form>
    </Panel>
  </PageLayout>
</template>
```

### Script Structure
```typescript
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Service from '@/services/YourService'
import PageLayout from '@/components/PageLayout.vue'
import type { YourModel } from '@/models/yourModel'

// Setup
const router = useRouter()
const route = useRoute()
const toast = useToast()

// State
const formData = reactive<YourModel>({...})
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Methods: Form Operations
const submitForm = async () => {
  if (!validateForm()) return
  try {
    isSubmitting.value = true
    const payload = preparePayload(formData)
    await Service.save(payload)
    showSuccessToast('Saved successfully')
    router.back()
  } catch (error: any) {
    errors.value = parseErrors(error?.response?.data?.errors)
    showErrorToast('Save failed', error?.response?.data?.message)
  } finally {
    isSubmitting.value = false
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  if (!formData.name?.trim()) {
    errors.value.name = 'Name is required'
    return false
  }
  return true
}

// Methods: UI Operations
const goBack = () => router.back()

// Methods: Toast Helpers
const showSuccessToast = (msg: string) => {...}
const showErrorToast = (title: string, msg?: string) => {...}

// Lifecycle
onMounted(async () => {
  if (route.params.id) {
    await loadData(route.params.id as string)
  }
})
</script>
```

---

## 6. Code Quality Standards

### TypeScript
- ✅ Always define types explicitly
- ✅ Use `type` for model imports
- ✅ Use generics with constraints
- ✅ No `any` types (except unavoidable cases)

```typescript
// Good
const list = ref<UserDetail[]>([])
const openDialog = async (id: string) => {...}

// Bad
const list = ref([])
const openDialog = (id: any) => {...}
```

### Error Handling
- ✅ Always try-catch async operations
- ✅ Show user-friendly error messages
- ✅ Log errors appropriately
- ✅ Clean up loading states in finally block

```typescript
const loadData = async () => {
  try {
    isLoading.value = true
    const response = await Service.get()
    list.value = response.data
  } catch (error: any) {
    showErrorToast('Error', error?.response?.data?.message)
  } finally {
    isLoading.value = false
  }
}
```

### Comments
- ✅ Use JSDoc for methods
- ✅ Explain WHY, not WHAT
- ✅ Keep comments concise

```typescript
/**
 * Load users from API and update list
 * Handles loading state and error display
 */
const loadUsers = async () => {...}
```

### No Dead Code
- ✅ Remove unused imports
- ✅ Remove unused variables
- ✅ Remove unused methods
- ✅ Remove commented code blocks

---

## 7. CSS/SCSS Standards

### Use CSS Variables
```scss
// Good
gap: var(--spacing-sm)
margin-bottom: var(--spacing-lg)
color: var(--primary)

// Bad
gap: 8px
margin-bottom: 16px
color: #1976d2
```

### Responsive Design
```scss
// Mobile-first approach
.component {
  // Mobile styles (< 768px)
  width: 100%;
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .component {
    // Tablet+ styles
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .component {
    // Desktop styles
    width: 33%;
  }
}
```

### Nesting
- Keep nesting shallow (max 3 levels)
- Use BEM for complex components

```scss
.toolbar {
  display: flex;
  gap: var(--spacing-sm);

  .toolbar__input {
    flex: 1;
  }
}
```

---

## 8. Common Refactoring Checklist

- [ ] Convert from Options API to `<script setup>`
- [ ] Replace arrow functions with const functions
- [ ] Extract constants (PERMISSION_OPTIONS, etc)
- [ ] Group imports by type (Vue, Router, Services, Types)
- [ ] Organize state (refs, reactives together)
- [ ] Organize methods by functionality (data ops, UI ops, helpers)
- [ ] Add JSDoc comments to methods
- [ ] Replace hardcoded strings with variables/constants
- [ ] Use CSS variables instead of hardcoded values
- [ ] Remove commented code
- [ ] Remove unused imports
- [ ] Fix naming consistency (useList, isLoading, etc)
- [ ] Add proper TypeScript types
- [ ] Improve error handling
- [ ] Add validation messages

---

## 9. Example: Complete Refactored Page

See [UserList.vue](src/pages/UserList.vue) for a complete example of clean code following all patterns above.

Key features:
- Setup syntax
- Proper organization
- Type safety
- Error handling
- Toast notifications
- Confirmation dialogs
- CSS variables
- JSDoc comments

---

## 10. Refactoring Priority

### Priority 1 (High Impact)
- ShowListEmployee.vue
- ShowListRegisterService.vue
- ManagerCategoryMenuPage.vue

### Priority 2 (Medium Impact)
- AddEmployeePage.vue
- UpdateEmployeePage.vue
- AddInfo.vue
- UpdateInfo.vue

### Priority 3 (Lower Impact)
- Utility pages (SendMessagePage, UploadImage, etc)
- Minor component cleanup

---

## Quick Reference

### Command Patterns
```typescript
// Load data
const loadUsers = async () => {
  try {
    isLoading.value = true
    const res = await Service.get()
    itemList.value = res.data
  } catch (error: any) {
    showErrorToast('Error', error?.response?.data?.message)
  } finally {
    isLoading.value = false
  }
}

// Save data
const saveItem = async () => {
  if (!validateForm()) return
  try {
    await Service.update(formData)
    showSuccessToast('Saved successfully')
    closeDialog()
    await loadItems() // Refresh list
  } catch (error: any) {
    showErrorToast('Save failed', error?.response?.data?.message)
  }
}

// Delete with confirmation
const confirmDelete = () => {
  confirm.require({
    message: 'Are you sure?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: () => deleteItem(),
    reject: () => {} // No-op
  })
}

// Toast messages
const showSuccessToast = (msg: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 2000
  })
}

const showErrorToast = (title: string, msg?: string) => {
  toast.add({
    severity: 'error',
    summary: title,
    detail: msg || 'An error occurred',
    life: 3000
  })
}
```

---

## Files Already Refactored
- ✅ UserList.vue
- ✅ PageLayout.vue
- ✅ global.scss

## Next to Refactor
- ShowListEmployee.vue
- ShowListRegisterService.vue
- ManagerCategoryMenuPage.vue
- ... (and 20+ more pages)

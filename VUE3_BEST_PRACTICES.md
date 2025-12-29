# Vue 3 Setup Syntax - Best Practices & Code Patterns

## Quick Reference

### Why Setup Syntax?
- ✅ More concise code
- ✅ Better performance (smaller bundle)
- ✅ Easier to understand
- ✅ Better TypeScript support
- ✅ Easier to extract logic

### Syntax Comparison

**Before (Options API):**
```typescript
export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    return { count, increment }
  }
}
```

**After (Setup Syntax):**
```typescript
<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++
</script>
```

---

## Template Structure

### Variables Auto-Exposed
All top-level variables are automatically exposed to template:

```typescript
<script setup lang="ts">
const message = ref('Hello')
const count = ref(0)
const items = ref([])

const handleClick = () => count.value++
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ count }}</p>
    <button @click="handleClick">Click</button>
  </div>
</template>
```

### Computed Properties
```typescript
<script setup lang="ts">
const firstName = ref('John')
const lastName = ref('Doe')

// Auto-unwrapped: no need for .value in template
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
</script>

<template>
  <p>{{ fullName }}</p> <!-- Works directly -->
</template>
```

### Watchers
```typescript
<script setup lang="ts">
const count = ref(0)

// Simple watcher
watch(count, (newVal) => {
  console.log('Count changed to:', newVal)
})

// Deep watcher
const obj = ref({ nested: { value: 0 } })
watch(() => obj.value.nested, (newVal) => {
  console.log('Nested changed:', newVal)
}, { deep: true })
</script>
```

### Lifecycle Hooks
```typescript
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component destroyed')
})
</script>
```

---

## Data Management Patterns

### State Management

```typescript
// Ref: Single values
const count = ref(0)
const message = ref('Hello')
const items = ref<Item[]>([])

// Reactive: Objects with multiple properties
const form = reactive<FormData>({
  name: '',
  email: '',
  age: 0
})

// Computed: Derived values
const isValid = computed(() => {
  return form.name.trim() && form.email.includes('@')
})
```

### Ref vs Reactive

| Feature | ref | reactive |
|---------|-----|----------|
| Primitives | ✅ | ❌ |
| Objects | ✅ | ✅ |
| Immutable updates | ✅ | ❌ |
| `.value` required | ✅ | ❌ |
| Destructurable | ❌ | ✅ |
| TypeScript | Excellent | Good |

**When to use:**
```typescript
// Use ref for single values
const count = ref(0)
const isLoading = ref(false)

// Use reactive for related data
const formData = reactive<UserForm>({
  name: '',
  email: '',
  phone: ''
})

// Destructure reactive (no .value needed)
const { name, email } = formData
```

---

## Common Patterns

### Pattern 1: List with CRUD

```typescript
<script setup lang="ts">
import { ref } from 'vue'
import { useToast, useConfirm } from 'primevue/usetoast'
import Service from '@/services/Service'
import type { Item } from '@/models/Item'

const toast = useToast()
const confirm = useConfirm()

// State
const items = ref<Item[]>([])
const isLoading = ref(false)
const isDialogOpen = ref(false)
const formData = reactive<ItemUpdate>({ id: '', name: '' })

// Load data
const loadItems = async () => {
  try {
    isLoading.value = true
    const res = await Service.getAll()
    items.value = res.data
  } catch (error: any) {
    showErrorToast('Error', error?.response?.data?.message)
  } finally {
    isLoading.value = false
  }
}

// Save item
const saveItem = async () => {
  try {
    await Service.update(formData)
    showSuccessToast('Saved successfully')
    closeDialog()
    await loadItems() // Refresh
  } catch (error: any) {
    showErrorToast('Save failed', error?.response?.data?.message)
  }
}

// Delete with confirmation
const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Are you sure?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await Service.delete(id)
        showSuccessToast('Deleted successfully')
        await loadItems()
      } catch (error: any) {
        showErrorToast('Delete failed', error?.response?.data?.message)
      }
    }
  })
}

// UI helpers
const closeDialog = () => {
  isDialogOpen.value = false
  Object.assign(formData, { id: '', name: '' })
}

const showSuccessToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000
  })
}

const showErrorToast = (title: string, message?: string) => {
  toast.add({
    severity: 'error',
    summary: title,
    detail: message || 'An error occurred',
    life: 3000
  })
}

// Load on mount
onMounted(() => {
  loadItems()
})
</script>
```

### Pattern 2: Form with Validation

```typescript
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Service from '@/services/Service'
import type { FormModel } from '@/models/FormModel'

const router = useRouter()
const toast = useToast()

// State
const formData = reactive<FormModel>({
  name: '',
  email: '',
  phone: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const isDirty = ref(false)

// Track changes
watch(formData, () => {
  isDirty.value = true
}, { deep: true })

// Validation
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.name?.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!formData.email?.includes('@')) {
    errors.value.email = 'Valid email is required'
  }

  return Object.keys(errors.value).length === 0
}

// Submit
const submitForm = async () => {
  if (!validateForm()) return

  try {
    isSubmitting.value = true
    const payload = preparePayload(formData)
    await Service.save(payload)
    showSuccessToast('Saved successfully')
    router.back()
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      errors.value = error.response.data.errors
    }
    showErrorToast('Save failed', error?.response?.data?.message)
  } finally {
    isSubmitting.value = false
  }
}

// Helpers
const preparePayload = (data: FormModel) => {
  // Transform data if needed
  return {
    ...data,
    name: data.name.trim()
  }
}

const showSuccessToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000
  })
}

const showErrorToast = (title: string, message?: string) => {
  toast.add({
    severity: 'error',
    summary: title,
    detail: message || 'An error occurred',
    life: 3000
  })
}

const goBack = () => router.back()

onMounted(async () => {
  // Load initial data if editing
  if (route.params.id) {
    const res = await Service.getById(route.params.id)
    Object.assign(formData, res.data)
  }
})
</script>
```

### Pattern 3: Composable Usage

```typescript
// src/composables/useList.ts
export function useList<T extends { id: string }>(
  loadFn: () => Promise<{ data: T[] }>
) {
  const items = ref<T[]>([])
  const isLoading = ref(false)

  const load = async () => {
    try {
      isLoading.value = true
      const res = await loadFn()
      items.value = res.data
    } finally {
      isLoading.value = false
    }
  }

  return { items: readonly(items), isLoading: readonly(isLoading), load }
}

// Usage in component
<script setup lang="ts">
import { useList } from '@/composables/useList'
import Service from '@/services/Service'
import type { User } from '@/models/User'

const { items, isLoading, load } = useList(() => Service.getUsers())

onMounted(() => load())
</script>
```

---

## TypeScript Integration

### Typing Props (not applicable with setup syntax alone, but in components receiving props)

```typescript
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Use props
console.log(props.title) // Fully typed!
</script>
```

### Typing Emits

```typescript
<script setup lang="ts">
interface Emits {
  (e: 'update', value: string): void
  (e: 'delete', id: string): void
}

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('update', 'new value')
}
</script>
```

### Generic Types

```typescript
<script setup lang="ts">
interface ListState<T> {
  items: T[]
  isLoading: boolean
  selectedId: string | null
}

function useListState<T extends { id: string }>(): ListState<T> {
  return {
    items: ref<T[]>([]),
    isLoading: ref(false),
    selectedId: ref(null)
  }
}
</script>
```

---

## Error Handling Patterns

### Try-Catch-Finally

```typescript
const loadData = async () => {
  try {
    isLoading.value = true
    const res = await Service.get()
    data.value = res.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Unknown error'
    showErrorToast('Error', message)
    console.error('Load failed:', error)
  } finally {
    isLoading.value = false // Always cleanup
  }
}
```

### Error Type Definition

```typescript
interface ApiError {
  response?: {
    status: number
    data?: {
      message: string
      errors?: Record<string, string>
    }
  }
}

const handleError = (error: ApiError) => {
  if (error?.response?.data?.errors) {
    // Handle validation errors
    formErrors.value = error.response.data.errors
  } else if (error?.response?.data?.message) {
    // Handle API error message
    showErrorToast('Error', error.response.data.message)
  } else {
    // Handle unexpected error
    showErrorToast('Error', 'An unexpected error occurred')
  }
}
```

---

## Performance Tips

### 1. Use Computed for Derived Data

```typescript
// ❌ Bad: Recalculates on every render
const isValid = () => {
  return form.name && form.email.includes('@')
}

// ✅ Good: Cached, updates only when dependencies change
const isValid = computed(() => {
  return form.name && form.email.includes('@')
})
```

### 2. Limit Deep Watchers

```typescript
// ❌ Bad: Watches entire object
watch(form, () => {
  validate()
}, { deep: true })

// ✅ Good: Watches specific property
watch(() => form.email, () => {
  validateEmail()
})
```

### 3. Lazy Load Components

```typescript
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)
```

### 4. Use v-if for Expensive Components

```html
<!-- ❌ Bad: Renders both -->
<div v-show="showDialog">
  <ExpensiveDialog />
</div>

<!-- ✅ Good: Only renders when needed -->
<div v-if="showDialog">
  <ExpensiveDialog />
</div>
```

---

## Testing Setup Syntax Components

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.html()).toContain('Hello')
  })

  it('increments count on click', async () => {
    const wrapper = mount(MyComponent)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting .value with ref

```typescript
const count = ref(0)

// ❌ Wrong
count++ // Doesn't work in script

// ✅ Correct
count.value++ // Correct in script

// ✅ Template (auto-unwrapped)
<p>{{ count }}</p> <!-- No .value needed -->
```

### ❌ Mistake 2: Reactive Destructuring

```typescript
const form = reactive({ name: '', email: '' })

// ❌ Loses reactivity
const { name, email } = form

// ✅ Keep reactivity
const name = computed(() => form.name)
// OR just use form.name directly
```

### ❌ Mistake 3: Not Handling Async in onMounted

```typescript
// ❌ Silently fails if async
onMounted(async () => {
  await loadData() // Error not shown
})

// ✅ Handle errors
onMounted(async () => {
  try {
    await loadData()
  } catch (error) {
    showErrorToast('Error', error?.message)
  }
})
```

### ❌ Mistake 4: Over-using Deep Watchers

```typescript
// ❌ Bad performance: watches entire tree
watch(data, () => {
  process()
}, { deep: true })

// ✅ Better: watch specific path
watch(() => data.user.name, () => {
  process()
})
```

---

## Quick Checklist for New Pages

- [ ] Use `<script setup lang="ts">`
- [ ] Group imports (Vue, Router, Services, Types)
- [ ] Export component props if needed with `defineProps`
- [ ] Define state with `ref` or `reactive`
- [ ] Create methods with `const methodName = () => {}`
- [ ] Use `computed` for derived values
- [ ] Use `watch` for side effects
- [ ] Use `onMounted` for initialization
- [ ] Handle errors with try-catch-finally
- [ ] Show user feedback with toast
- [ ] Use CSS variables for styling
- [ ] Add JSDoc comments to complex methods
- [ ] Test responsive design
- [ ] Test error scenarios

---

## Resources

- [Vue 3 Official Docs](https://vuejs.org)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript Support](https://vuejs.org/guide/typescript/overview.html)
- [Testing Guide](https://vuejs.org/guide/scaling-up/testing.html)

---

Last Updated: $(date)
Version: 1.0

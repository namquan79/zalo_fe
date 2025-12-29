# ZaloOA_Vinh_FE - Clean Code Initiative

> Refactoring the entire project to modern Vue 3 standards with setup syntax, proper code organization, and improved maintainability.

## 🎯 Objectives

1. **Convert all components** from Options API to Composition API with `<script setup>` syntax
2. **Improve code organization** with logical grouping and clear naming conventions
3. **Enhance type safety** with comprehensive TypeScript definitions
4. **Better error handling** with user-friendly toast notifications
5. **Consistent styling** using CSS variables and responsive design
6. **Full documentation** with JSDoc comments and examples
7. **Better maintainability** through DRY principles and reusable composables

## 📊 Status Overview

```
Total Pages: 26
Status: In Progress (Clean Code Phase)

✅ Completed:    2 pages (UserList, ManagerCategoryMenuPage)
⏳ Next Priority: 1 page (SendMessagePage)
🎯 In Queue:    23 pages
```

## 🚀 Key Improvements

### Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| **Syntax** | Options API (default export) | `<script setup lang="ts">` |
| **Method Organization** | Mixed (scattered throughout) | Grouped by functionality |
| **Documentation** | Minimal comments | JSDoc for all methods |
| **CSS** | Hardcoded values (8px, #16a34a) | CSS variables (--spacing-sm, --primary) |
| **Error Handling** | Inconsistent patterns | Standardized with toast helpers |
| **Type Safety** | Loose types (any) | Strong TypeScript types |
| **Responsive** | Limited | Mobile-first design |
| **Code Size** | Verbose (720+ lines) | Organized (550 lines, better) |

## 📁 Documentation Files

### Core Guidelines
- **[CLEAN_CODE_GUIDE.md](CLEAN_CODE_GUIDE.md)** - Complete refactoring standards and patterns
- **[VUE3_BEST_PRACTICES.md](VUE3_BEST_PRACTICES.md)** - Vue 3 setup syntax guide with examples
- **[REFACTORING_PROGRESS.md](REFACTORING_PROGRESS.md)** - Detailed progress tracking

### Example Implementations
- **[UserList.vue](src/pages/UserList.vue)** - List page pattern (CRUD)
- **[ManagerCategoryMenuPage.vue](src/pages/ManagerCategoryMenuPage.vue)** - Complex page pattern
- **[PageLayout.vue](src/components/PageLayout.vue)** - Reusable layout wrapper
- **[global.scss](src/styles/global.scss)** - CSS variable system

## 🎓 Quick Start for Refactoring

### Step 1: Understand the Pattern

Read the appropriate pattern based on page type:
- **List Pages**: See [UserList.vue](src/pages/UserList.vue)
- **Form Pages**: See [CLEAN_CODE_GUIDE.md - Form Page Pattern](CLEAN_CODE_GUIDE.md#5-form-page-pattern)
- **Complex Pages**: See [ManagerCategoryMenuPage.vue](src/pages/ManagerCategoryMenuPage.vue)

### Step 2: Use the Checklist

From [CLEAN_CODE_GUIDE.md#8-common-refactoring-checklist](CLEAN_CODE_GUIDE.md#8-common-refactoring-checklist):

- [ ] Convert from Options API to `<script setup>`
- [ ] Replace `function` declarations with `const` pattern
- [ ] Extract constants (UPPERCASE_NAMES)
- [ ] Group imports by type
- [ ] Organize state (refs, reactives together)
- [ ] Group methods by functionality
- [ ] Add JSDoc comments
- [ ] Replace hardcoded values with variables/constants
- [ ] Use CSS variables instead of hardcoded values
- [ ] Remove commented code
- [ ] Remove unused imports
- [ ] Fix naming consistency
- [ ] Add proper TypeScript types
- [ ] Improve error handling
- [ ] Add validation messages

### Step 3: Reference Code Snippets

Use these common patterns from [VUE3_BEST_PRACTICES.md](VUE3_BEST_PRACTICES.md):

```typescript
// Pattern: Data loading
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

// Pattern: Delete with confirmation
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

// Pattern: Toast helpers
const showSuccessToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000
  })
}
```

### Step 4: Validate Your Work

- ✅ Page displays correctly
- ✅ All CRUD operations work
- ✅ Error messages show correctly
- ✅ Responsive design works (test at 768px)
- ✅ Follows naming conventions
- ✅ Has JSDoc comments
- ✅ Uses CSS variables
- ✅ TypeScript shows no errors

## 📋 Pages to Refactor

### Priority 1 - Large Files (High Impact)

1. **SendMessagePage.vue** (1111 lines)
   - Most complex utility page
   - Template for similar pages
   - Estimate: 3-4 hours

2. **ShowListEmployee.vue** (300 lines)
   - Core CRUD page
   - Can follow UserList pattern
   - Estimate: 1-2 hours

3. **ShowListRegisterService.vue** (350 lines)
   - Core CRUD page
   - Similar to ShowListEmployee
   - Estimate: 1-2 hours

### Priority 2 - Form Pages (Medium Impact)

4. **AddEmployeePage.vue** (250 lines)
5. **UpdateEmployeePage.vue** (280 lines)
6. **AddInfo.vue** (200 lines)
7. **UpdateInfo.vue** (200 lines)
8. **UpdateRegisterService.vue** (180 lines)

Estimate: 8-10 hours total (use form page pattern)

### Priority 3 - Utility Pages (Lower Impact)

- UploadImage.vue
- Statistical.vue
- ShowListInfo.vue
- ShowListStatistical.vue
- KetQuaCLS.vue
- CreateTeam.vue
- And 8+ more pages

Estimate: 12+ hours total

## 🛠️ Essential Tools

### CSS Variables Reference

```scss
/* Colors */
--primary, --primary-hover, --danger, --danger-hover
--success, --warning, --info
--text-primary, --text-secondary, --border-color
--bg-light, --bg-darker

/* Spacing (use these, don't hardcode) */
--spacing-xs: 4px      // Tiny gaps
--spacing-sm: 8px      // Small gaps
--spacing-md: 16px     // Medium gaps
--spacing-lg: 24px     // Large gaps
--spacing-xl: 32px     // Extra large
--spacing-2xl: 48px    // Double extra large

/* Sizing */
--radius-sm: 4px       // Small corners
--radius-md: 8px       // Medium corners
--radius-lg: 12px      // Large corners

/* Animation */
--transition-fast: 0.15s ease
--transition-base: 0.2s ease
--transition-slow: 0.3s ease
--transition: all 0.3s ease
```

### Import Pattern

```typescript
// Always follow this order:
import { ref, reactive, computed, onMounted } from 'vue'           // Vue
import { useRouter } from 'vue-router'                             // Router
import { useStore } from 'vuex'                                    // State
import { useToast } from 'primevue/usetoast'                       // PrimeVue
import Service from '@/services/Service'                            // Services
import Component from '@/components/Component.vue'                  // Components
import type { Model } from '@/models/Model'                         // Types
```

### Method Organization Order

```typescript
// 1. Constants
const PERMISSION_OPTIONS = [...]

// 2. Setup (services, composables, store, router, toast, confirm)
const toast = useToast()
const confirm = useConfirm()

// 3. State (refs and reactives)
const items = ref<Item[]>([])
const formData = reactive<FormData>({...})

// 4. Lifecycle hooks
onMounted(() => { loadItems() })

// 5. Data Operations (load, save, delete)
const loadItems = async () => {...}
const saveItem = async () => {...}

// 6. UI Operations (dialog, filters, forms)
const openDialog = () => {...}
const closeDialog = () => {...}

// 7. Validation & Helpers
const validateForm = (): boolean => {...}

// 8. Toast & Error Helpers
const showSuccessToast = (msg: string) => {...}
```

## 🔍 Quality Metrics

### Code Quality Standards

✅ **Must Have**:
- TypeScript types defined
- JSDoc comments for methods
- Proper error handling (try-catch-finally)
- User-friendly error messages
- Toast notifications for feedback
- Responsive design (mobile-first)
- CSS variables for all values

⚠️ **Should Have**:
- Composable usage where applicable
- Computed properties for derived values
- Validation with clear messages
- Confirmation dialogs for destructive actions
- Proper cleanup in lifecycle hooks

❌ **Avoid**:
- `any` types
- Hardcoded values in CSS
- Commented code blocks
- Unused imports/variables
- Deep nesting (max 3 levels)
- Inconsistent naming

## 📈 Progress Tracking

Track progress in [REFACTORING_PROGRESS.md](REFACTORING_PROGRESS.md):

```markdown
### Pages Refactored ✅
- [x] UserList.vue
- [x] ManagerCategoryMenuPage.vue
- [x] PageLayout.vue
- [ ] SendMessagePage.vue
- [ ] ShowListEmployee.vue
```

## 🎬 Getting Started

### For First Refactoring

1. Read [CLEAN_CODE_GUIDE.md](CLEAN_CODE_GUIDE.md) (15 min)
2. Study [UserList.vue](src/pages/UserList.vue) as example (10 min)
3. Read [VUE3_BEST_PRACTICES.md](VUE3_BEST_PRACTICES.md) patterns (15 min)
4. Pick a small page (AddEmployeePage.vue) and refactor it
5. Get review/feedback
6. Move to next page

### For Reviewing

1. Check against [CLEAN_CODE_GUIDE.md checklist](CLEAN_CODE_GUIDE.md#8-common-refactoring-checklist)
2. Verify [Quality Metrics](#quality-metrics) above
3. Test in browser (all CRUD operations, errors, responsive)
4. Approve or request changes

## 📚 Additional Resources

- [Vue 3 Official Documentation](https://vuejs.org)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript with Vue 3](https://vuejs.org/guide/typescript/overview.html)
- [PrimeVue Components](https://primevue.org)

## 💡 Tips & Tricks

### Use TypeScript Strict Mode

```typescript
// src/main.ts - Enable strict mode
// tsconfig.json: "strict": true

// Then enjoy full type checking
const name: string = 123 // Error caught!
```

### Use Computed for Caching

```typescript
// ❌ Recalculates every render
const isValid = () => check()

// ✅ Caches, only recalculates when deps change
const isValid = computed(() => check())
```

### Use Watch for Side Effects

```typescript
// ✅ Good: Detects when email changes
watch(() => formData.email, async (newEmail) => {
  await validateEmail(newEmail)
})
```

### Always Clean Up

```typescript
// ❌ Forget to reset
const closeDialog = () => {
  dialogVisible.value = false
}

// ✅ Also reset form
const closeDialog = () => {
  dialogVisible.value = false
  Object.assign(formData, { id: '', name: '' })
}
```

## 🐛 Common Issues & Solutions

### Issue: Variables not reactive in template

```typescript
// ❌ Wrong
const name = 'John'

// ✅ Correct
const name = ref('John')
```

### Issue: Reactive object losing reactivity on destructure

```typescript
// ❌ Wrong
const { name } = reactive({ name: '', email: '' })

// ✅ Correct - use computed or ref with toRef
const form = reactive({ name: '', email: '' })
const name = computed(() => form.name)
```

### Issue: Forgetting .value in script

```typescript
// ❌ Wrong
const count = ref(0)
count++ // Doesn't work

// ✅ Correct
count.value++

// Template (no .value needed)
<p>{{ count }}</p>
```

### Issue: Not handling async errors

```typescript
// ❌ Silently fails
onMounted(async () => {
  await loadData()
})

// ✅ Proper error handling
onMounted(async () => {
  try {
    await loadData()
  } catch (error) {
    showErrorToast('Error', error?.message)
  }
})
```

## 📞 Support & Questions

For questions about refactoring patterns:
1. Check [CLEAN_CODE_GUIDE.md](CLEAN_CODE_GUIDE.md) first
2. Look at existing examples (UserList.vue, ManagerCategoryMenuPage.vue)
3. Review [VUE3_BEST_PRACTICES.md](VUE3_BEST_PRACTICES.md)
4. Ask for guidance with specific code snippets

## 📝 Checklist for Completion

- [ ] All 26 pages refactored to setup syntax
- [ ] All pages have JSDoc comments
- [ ] All pages use CSS variables
- [ ] All pages have proper TypeScript types
- [ ] All pages pass responsive design test
- [ ] All pages follow naming conventions
- [ ] Documentation complete and up-to-date
- [ ] Team trained on new patterns
- [ ] Code review process established
- [ ] Performance baseline established
- [ ] Testing coverage improved

## 🎉 Timeline

- **Week 1**: 3-4 pages (setup, docs, patterns)
- **Week 2**: 5-6 pages (list pages, form pages)
- **Week 3**: 8-10 pages (utility pages, polish)
- **Week 4**: Testing, optimization, review

**Estimated Total: 2-3 weeks**

---

**Last Updated**: $(date)  
**Status**: Active  
**Pages Completed**: 2/26  
**Pages In Progress**: 0  
**Pages Remaining**: 24  

---

## 📄 License

This project follows the same license as the main ZaloOA_Vinh project.


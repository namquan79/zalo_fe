/**
 * Composable: useList
 * Reusable logic for list pages (CRUD operations)
 */

import { ref, Ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

/**
 * List composable interface - combines state and actions
 */
export interface UseListReturn<T extends { id: string | number }> {
    // State
    list: Ref<T[]>
    loading: Ref<boolean>
    dialogVisible: Ref<boolean>
    searchText: Ref<string>
    selectedItem: Ref<T | null>
    editingItem: Ref<T | null>
    // Actions
    loadData: () => Promise<void>
    openAdd: () => void
    openEdit: (item: T) => void
    save: (item: T) => Promise<void>
    confirmDelete: (item: T) => void
    deleteItem: (item: T) => Promise<void>
    closeDialog: () => void
}

/**
 * Composable for list page management
 * @param apiFetch - Function to fetch data from API
 * @param apiSave - Function to save data
 * @param apiDelete - Function to delete data
 * @returns List state and actions
 */
export function useList<T extends { id: string | number }>(
    apiFetch: () => Promise<T[]>,
    apiSave: (item: T) => Promise<void>,
    apiDelete: (id: string | number) => Promise<void>
): UseListReturn<T> {
    // State
    const list = ref<T[]>([])
    const loading = ref(false)
    const dialogVisible = ref(false)
    const searchText = ref('')
    const selectedItem = ref<T | null>(null)
    const editingItem = ref<T | null>(null)

    // Services
    const toast = useToast()
    const confirm = useConfirm()

    // Helper functions
    const showSuccess = (title: string, message?: string) => {
        toast.add({
            severity: 'success',
            summary: title,
            detail: message,
            life: 2000
        })
    }

    const showError = (title: string, message?: string) => {
        toast.add({
            severity: 'error',
            summary: title,
            detail: message || 'Có lỗi xảy ra',
            life: 3000
        })
    }

    // Actions
    const loadData = async () => {
        try {
            loading.value = true
            const data = await apiFetch()
                ; (list as any).value = data
        } catch (error: any) {
            showError('Lỗi tải dữ liệu', error?.response?.data?.message)
        } finally {
            loading.value = false
        }
    }

    const openAdd = () => {
        ; (editingItem as any).value = null
        dialogVisible.value = true
    }

    const openEdit = (item: T) => {
        const clonedItem = JSON.parse(JSON.stringify(item)) as T
            ; (editingItem as any).value = clonedItem
            ; (selectedItem as any).value = item
        dialogVisible.value = true
    }

    const save = async (item: T) => {
        try {
            await apiSave(item)
            showSuccess('Thành công', 'Lưu dữ liệu thành công')
            closeDialog()
            await loadData()
        } catch (error: any) {
            showError('Lỗi', error?.response?.data?.message)
        }
    }

    const confirmDelete = (item: T) => {
        confirm.require({
            message: 'Bạn chắc chắn muốn xoá?',
            header: 'Xác nhận xoá',
            icon: 'pi pi-exclamation-triangle',
            acceptClass: 'p-button-danger',
            acceptLabel: 'Xoá',
            rejectLabel: 'Huỷ',
            accept: () => deleteItem(item)
        })
    }

    const deleteItem = async (item: T) => {
        try {
            await apiDelete(item.id)
            showSuccess('Thành công', 'Xoá dữ liệu thành công')
            await loadData()
        } catch (error: any) {
            showError('Lỗi', error?.response?.data?.message)
        }
    }

    const closeDialog = () => {
        dialogVisible.value = false
            ; (editingItem as any).value = null
            ; (selectedItem as any).value = null
    }

    return {
        // State
        list: list as any,
        loading,
        dialogVisible,
        searchText,
        selectedItem: selectedItem as any,
        editingItem: editingItem as any,
        // Actions
        loadData,
        openAdd,
        openEdit,
        save,
        confirmDelete,
        deleteItem,
        closeDialog
    }
}

export default useList

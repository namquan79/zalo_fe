/**
 * Composable: useForm
 * Reusable logic for form pages (validation, state management)
 */

import { ref, computed, Ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export interface FormError {
    field: string
    message: string
}

export interface FormState<T> {
    form: T
    errors: Ref<FormError[]>
    loading: Ref<boolean>
    isDirty: Ref<boolean>
}

export interface FormActions<T> {
    submit: (data: T) => Promise<void>
    reset: () => void
    goBack: () => void
    hasError: (field: string) => boolean
    getError: (field: string) => string | null
}

/**
 * Composable for form management
 * @param initialData - Initial form data
 * @param onSubmit - Function to submit form
 * @param onSuccess - Callback after successful submission
 */
export function useForm<T extends Record<string, any>>(
    initialData: T,
    onSubmit: (data: T) => Promise<void>,
    onSuccess?: () => void
): FormState<T> & FormActions<T> {
    const router = useRouter()
    const toast = useToast()

    // State
    const form = reactive<T>({ ...initialData })
    const errors = ref<FormError[]>([])
    const loading = ref(false)
    const originalData = JSON.stringify(initialData)
    const isDirty = computed(() => JSON.stringify(form) !== originalData)

    // Actions
    const submit = async (data: T = form) => {
        try {
            errors.value = []
            loading.value = true
            await onSubmit(data)

            toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Lưu dữ liệu thành công',
                life: 2000
            })

            onSuccess?.()
            setTimeout(() => goBack(), 1500)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Lỗi xảy ra'

            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: errorMessage,
                life: 3000
            })

            // Parse validation errors if available
            if (error?.response?.data?.errors) {
                errors.value = Object.entries(error.response.data.errors).map(([field, message]: any) => ({
                    field,
                    message: Array.isArray(message) ? message[0] : message
                }))
            }
        } finally {
            loading.value = false
        }
    }

    const reset = () => {
        Object.assign(form, initialData)
        errors.value = []
    }

    const goBack = () => {
        router.back()
    }

    const hasError = (field: string): boolean => {
        return errors.value.some(e => e.field === field)
    }

    const getError = (field: string): string | null => {
        const error = errors.value.find(e => e.field === field)
        return error?.message || null
    }

    return {
        // State
        form,
        errors,
        loading,
        isDirty: isDirty as Ref<boolean>,
        // Actions
        submit,
        reset,
        goBack,
        hasError,
        getError
    }
}

export default useForm

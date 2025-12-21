<template>
    <!-- Wrapper dùng PrimeVue Button để giữ icon/loading chuẩn -->
    <Button :label="label" :icon="icon" :iconPos="iconPos" :disabled="disabled || loading" :loading="loading"
        :class="['base-btn', variantClass, $attrs.class]" v-bind="{ ...$attrs, class: undefined }"
        @click="$emit('click', $event)" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "BaseButton",
    inheritAttrs: false,
    props: {
        label: { type: String, default: "" },
        icon: { type: String, default: "" },
        iconPos: { type: String, default: "left" }, // 'left' | 'right'
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },

        /**
         * variant:
         * - "solid": nền xanh + chữ trắng
         * - "outline": nền trắng + chữ xanh + viền xanh 1px
         */
        variant: {
            type: String,
            default: "solid",
            validator: (v: string) => ["solid", "outline"].includes(v),
        },
    },
    emits: ["click"],
    setup(props) {
        const variantClass = computed(() =>
            props.variant === "outline" ? "base-btn--outline" : "base-btn--solid"
        );
        return { variantClass };
    },
});
</script>

<style scoped>
/* màu chủ đạo */
.base-btn {
    border-radius: 8px;
    font-weight: 600;
}

/* BUTTON 1: nền xanh + chữ trắng */
.base-btn--solid {
    background: #334059 !important;
    border: 1px solid #42598b !important;
    color: #bdd1f8 !important;
}

/* BUTTON 2: nền trắng + chữ xanh + viền xanh 1px */
.base-btn--outline {
    background: #fff !important;
    border: 1px solid #06b649 !important;
    color: #06b649 !important;
}

/* hover / active */
.base-btn--solid:hover:not(:disabled),
.base-btn--outline:hover:not(:disabled) {
    filter: brightness(0.97);
}

.base-btn--solid:active:not(:disabled),
.base-btn--outline:active:not(:disabled) {
    filter: brightness(0.93);
}

/* disabled */
.base-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>

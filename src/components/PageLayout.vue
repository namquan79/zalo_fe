<template>
    <div class="page-container">
        <!-- Header Section -->
        <div v-if="title" class="page-header">
            <h1 class="page-title">{{ title }}</h1>
            <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
            <nav v-if="breadcrumbs?.length" class="breadcrumb">
                <router-link to="/">Trang chủ</router-link>
                <template v-for="(crumb, idx) in breadcrumbs" :key="idx">
                    <span class="separator">/</span>
                    <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
                    <span v-else>{{ crumb.label }}</span>
                </template>
            </nav>
        </div>

        <!-- Alerts Section -->
        <div v-for="(alert, idx) in alerts" :key="idx" :class="['alert', `alert-${alert.type}`]">
            <i :class="getAlertIcon(alert.type)" class="alert-icon"></i>
            <div class="alert-content">
                <strong>{{ alert.title }}</strong>
                <p v-if="alert.message">{{ alert.message }}</p>
            </div>
        </div>

        <!-- Main Content -->
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Breadcrumb {
    label: string
    to?: string
}

export interface Alert {
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
}

interface Props {
    title?: string
    subtitle?: string
    breadcrumbs?: Breadcrumb[]
    alerts?: Alert[]
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    subtitle: '',
    breadcrumbs: () => [],
    alerts: () => []
})

// Alert icon mapping
const ALERT_ICONS: Record<string, string> = {
    success: 'pi pi-check-circle',
    error: 'pi pi-exclamation-circle',
    warning: 'pi pi-exclamation-triangle',
    info: 'pi pi-info-circle'
}

const getAlertIcon = (type: string): string => ALERT_ICONS[type] || ALERT_ICONS.info
</script>

<style scoped lang="scss">
.page-container {
    padding: 16px;
    min-height: calc(100vh - 56px);
    background: var(--bg);
}

.page-header {
    margin-bottom: 24px;

    .page-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text);
        margin-bottom: 8px;
    }

    .page-subtitle {
        font-size: 14px;
        color: var(--text-muted);
        margin-bottom: 12px;
    }

    .breadcrumb {
        font-size: 12px;
        color: var(--text-muted);
    }
}

.alert {
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;

    &.alert-success {
        background: #f0fdf4;
        border: 1px solid #86efac;
        color: #166534;
    }

    &.alert-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #7f1d1d;
    }

    &.alert-warning {
        background: #fffbeb;
        border: 1px solid #fde68a;
        color: #78350f;
    }

    &.alert-info {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        color: #0c4a6e;
    }

    .alert-icon {
        flex-shrink: 0;
        margin-top: 2px;
    }

    .alert-content {
        flex: 1;
    }
}
</style>

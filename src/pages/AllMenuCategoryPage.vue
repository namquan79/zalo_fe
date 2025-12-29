<template>
    <div class="menu-page">
        <Panel header="Xem tất cả danh mục menu (không phân quyền)">
            <!-- ================= TOOLBAR ================= -->
            <div class="toolbar">
                <span class="p-input-icon-left search">
                    <i class="pi pi-search"></i>
                    <InputText v-model="searchText" placeholder="Tìm menu..." />
                </span>

                <div class="toolbar-actions">
                    <Dropdown v-model="selectedRole" :options="roleOptions" optionLabel="label" optionValue="value"
                        placeholder="Chọn quyền hạn" @change="onRoleChange" />
                </div>
            </div>

            <!-- ================= BODY ================= -->
            <div class="content">
                <!-- ========== TREE DISPLAY ========== -->
                <div class="tree-section">
                    <div class="section-title">Danh mục</div>

                    <Tree :value="treeNodes" selectionMode="single" :selectionKeys="selectionKeys"
                        @selection-change="onSelectionChange">
                        <template #default="{ node }">
                            <div class="tree-row">
                                <!-- CỘT TÊN -->
                                <div class="tree-col-name">
                                    <i v-if="node.data?.icon" :class="node.data.icon"></i>
                                    <span class="tree-title">{{ node.data?.label }}</span>
                                    <span v-if="node.data?.isActive === false" class="tree-muted">(ẩn)</span>
                                </div>

                                <!-- CỘT TRẠNG THÁI -->
                                <div class="tree-col-right">
                                    <span class="badge" :class="{ off: node.data?.isActive === false }">
                                        {{ node.data?.isActive === false ? "OFF" : "ON" }}
                                    </span>
                                </div>
                            </div>
                        </template>
                    </Tree>

                    <small class="hint">
                        Hiển thị toàn bộ menu từ tất cả quyền hạn.
                    </small>
                </div>

                <!-- ========== DETAILS SECTION ========== -->
                <div class="details-section">
                    <div v-if="!selectedItem" class="empty">Chọn 1 menu để xem chi tiết.</div>

                    <div v-else class="details">
                        <div class="detail-row">
                            <label>ID:</label>
                            <span class="detail-value">{{ selectedItem.id }}</span>
                        </div>

                        <div class="detail-row">
                            <label>Tên hiển thị:</label>
                            <span class="detail-value">{{ selectedItem.label }}</span>
                        </div>

                        <div class="detail-row">
                            <label>Icon:</label>
                            <span class="detail-value">{{ selectedItem.icon || "(không có)" }}</span>
                        </div>

                        <div class="detail-row">
                            <label>Route:</label>
                            <span class="detail-value">{{ selectedItem.to || "(không có)" }}</span>
                        </div>

                        <div class="detail-row">
                            <label>Trạng thái:</label>
                            <span class="detail-value">
                                <span class="badge" :class="{ off: selectedItem.isActive === false }">
                                    {{ selectedItem.isActive === false ? "ẨN" : "HIỂN THỊ" }}
                                </span>
                            </span>
                        </div>

                        <div class="detail-row">
                            <label>Loại:</label>
                            <span class="detail-value">{{ getItemType(selectedItem) }}</span>
                        </div>

                        <div class="detail-row">
                            <label>Quyền hạn:</label>
                            <span class="detail-value">
                                <span v-for="role in getItemRoles(selectedItem.id)" :key="role" class="role-badge">
                                    {{ roleMap[role] }}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>

        <!-- Statistics Section -->
        <Panel header="Thống kê" style="margin-top: 20px">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Tổng menu Admin</div>
                    <div class="stat-value">{{ countMenuItems(currentData.admin || []) }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Tổng menu User</div>
                    <div class="stat-value">{{ countMenuItems(currentData.user || []) }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Tổng menu (tất cả)</div>
                    <div class="stat-value">{{ countAllUniqueItems() }}</div>
                </div>
            </div>
        </Panel>
    </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

// PrimeVue
import Panel from "primevue/panel";
import Tree from "primevue/tree";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

// Store
import { menuData, loadMenu } from "@/config/menuStore";
import type { MenuItem } from "@/config/menuStore";

/** =========================
 *  TYPES
 *  ========================= */
type TreeNode = { key: string; data: MenuItem; children?: TreeNode[]; expanded?: boolean };
type Role = "all" | "admin" | "user";

const roleOptions = [
    { label: "Tất cả (Admin + User)", value: "all" },
    { label: "Chỉ Admin", value: "admin" },
    { label: "Chỉ User", value: "user" },
];

const roleMap: Record<string, string> = {
    admin: "Admin",
    user: "User",
};

/** =========================
 *  HELPERS
 *  ========================= */
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

export default {
    components: { Panel, Tree, InputText, Dropdown },
    setup() {
        const toast = useToast();
        const selectedRole = ref<Role>("all");

        /** =========================
         *  DATA
         *  ========================= */
        onMounted(() => {
            loadMenu();
        });

        const currentData = computed(() => menuData.value);

        // Merge tất cả menu từ admin + user, loại bỏ duplicates
        const mergedMenus = computed(() => {
            const admin = currentData.value.admin || [];
            const user = currentData.value.user || [];

            if (selectedRole.value === "admin") {
                return admin;
            } else if (selectedRole.value === "user") {
                return user;
            }

            // Merge: dùng map để track menu theo ID
            const merged: Record<string, MenuItem> = {};
            const mergeItems = (items: MenuItem[], role: Role) => {
                for (const item of items) {
                    if (!merged[item.id]) {
                        merged[item.id] = clone(item);
                    }
                    if (item.children) {
                        if (!merged[item.id].children) merged[item.id].children = [];
                        for (const child of item.children) {
                            if (!merged[item.id].children!.find((c) => c.id === child.id)) {
                                merged[item.id].children!.push(clone(child));
                            }
                        }
                    }
                }
            };

            mergeItems(admin, "admin");
            mergeItems(user, "user");
            return Object.values(merged);
        });

        /** =========================
         *  TREE BUILDING
         *  ========================= */
        const searchText = ref("");

        const buildTree = (list: MenuItem[], q: string): TreeNode[] => {
            const kw = (q || "").trim().toLowerCase();

            const matchSelf = (x: MenuItem) => !kw || (x.label || "").toLowerCase().includes(kw);

            const toNode = (x: MenuItem): TreeNode => ({
                key: x.id,
                data: x,
                expanded: true,
                children: x.children?.length ? x.children.map(toNode) : undefined,
            });

            const out: TreeNode[] = [];
            for (const p of list || []) {
                const childMatched = (p.children || []).some(matchSelf);
                if (!matchSelf(p) && !childMatched && kw) continue;

                const node = toNode(p);

                if (kw && node.children?.length) {
                    node.children = node.children.filter((c) => matchSelf(c.data));
                }

                out.push(node);
            }
            return out;
        };

        const treeNodes = computed(() => buildTree(mergedMenus.value, searchText.value));

        /** =========================
         *  SELECTION
         *  ========================= */
        const selectionKeys = ref<Record<string, boolean>>({});
        const selectedId = ref<string | null>(null);

        const clearSelection = () => {
            selectionKeys.value = {};
            selectedId.value = null;
        };

        const onSelectionChange = (e: any) => {
            selectionKeys.value = e.value || {};
            const keys = Object.keys(selectionKeys.value);
            selectedId.value = keys.length ? keys[0] : null;
        };

        const findWithParent = (id: string, roots: MenuItem[]) => {
            for (const p of roots) {
                if (p.id === id) return { item: p, parent: null as MenuItem | null };

                for (const c of p.children || []) {
                    if (c.id === id) return { item: c, parent: p };
                }
            }
            return { item: null as MenuItem | null, parent: null as MenuItem | null };
        };

        const selectedItem = computed<MenuItem | null>(() => {
            if (!selectedId.value) return null;
            return findWithParent(selectedId.value, mergedMenus.value).item;
        });

        const getItemType = (item: MenuItem | null): string => {
            if (!item) return "-";
            const { parent } = findWithParent(item.id, mergedMenus.value);
            return parent ? "Menu con" : "Menu cha";
        };

        const getItemRoles = (itemId: string): string[] => {
            const roles: string[] = [];
            const admin = currentData.value.admin || [];
            const user = currentData.value.user || [];

            if (findWithParent(itemId, admin).item) roles.push("admin");
            if (findWithParent(itemId, user).item) roles.push("user");

            return roles;
        };

        const onRoleChange = () => {
            clearSelection();
            searchText.value = "";
        };

        // Statistics
        const countMenuItems = (items: MenuItem[]): number => {
            let count = 0;
            const count_recursive = (arr: MenuItem[]) => {
                for (const item of arr) {
                    count++;
                    if (item.children) {
                        count_recursive(item.children);
                    }
                }
            };
            count_recursive(items);
            return count;
        };

        const countAllUniqueItems = (): number => {
            return countMenuItems(mergedMenus.value);
        };

        return {
            searchText,
            selectedRole,
            roleOptions,
            roleMap,
            treeNodes,
            selectionKeys,
            onSelectionChange,
            selectedItem,
            getItemType,
            getItemRoles,
            onRoleChange,
            currentData,
            countMenuItems,
            countAllUniqueItems,
        };
    },
};
</script>

<style scoped lang="scss">
/* ================= THEME ================= */
:global(:root) {
    --primary: #16a34a;
    --primary-hover: #22c55e;
    --text: #111827;
    --muted: #6b7280;
    --border: #e5e7eb;
    --bg: #f9fafb;
}

/* ================= PAGE LAYOUT ================= */
.menu-page {
    padding: 12px;
    background: var(--bg);
    min-height: calc(100vh - 56px);
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
}

.search {
    width: 320px;
}

.toolbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

.tree-section,
.details-section {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
}

.section-title {
    font-weight: 800;
    color: var(--text);
    margin-bottom: 10px;
    font-size: 14px;
}

.empty {
    color: var(--muted);
    padding: 18px 10px;
    text-align: center;
}

/* ================= TREE ROW ================= */
:deep(.p-tree .p-treenode-content) {
    width: 100%;
}

.tree-row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 70px;
    align-items: center;
    gap: 12px;
}

.tree-col-name {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
}

.tree-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
}

.tree-muted {
    color: var(--muted);
    font-size: 12px;
}

.tree-col-right {
    display: flex;
    justify-content: flex-end;
}

.badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--primary);
    background: #fff;
    font-weight: 700;
    white-space: nowrap;
}

.badge.off {
    color: var(--muted);
}

.hint {
    color: var(--muted);
    font-size: 12px;
    margin-top: 10px;
    display: block;
}

/* ================= DETAILS ================= */
.details {
    display: grid;
    gap: 12px;
}

.detail-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 10px;
    align-items: flex-start;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-row label {
    font-weight: 600;
    color: var(--text);
    font-size: 13px;
}

.detail-value {
    color: var(--text);
    font-size: 13px;
    word-break: break-word;
}

.role-badge {
    display: inline-block;
    margin-right: 6px;
    padding: 3px 8px;
    background: #e0f2fe;
    color: #0369a1;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
}

/* ================= STATS ================= */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
}

.stat-card {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
}

.stat-label {
    font-size: 12px;
    opacity: 0.9;
    margin-bottom: 8px;
}

.stat-value {
    font-size: 32px;
    font-weight: 800;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 1200px) {
    .content {
        grid-template-columns: 1fr;
    }

    .detail-row {
        grid-template-columns: 100px 1fr;
    }
}

@media (max-width: 768px) {
    .toolbar {
        flex-direction: column;
        align-items: flex-start;
    }

    .search {
        width: 100%;
    }

    .toolbar-actions {
        width: 100%;
    }
}
</style>
    
// src/config/menuStore.ts
import { ref } from "vue";

export type MenuItem = {
    id: string;
    label: string;
    icon?: string;
    to?: string;
    isActive?: boolean;
    children?: MenuItem[];
};

export type SidebarMenuData = {
    version: number;
    items?: MenuItem[];
    admin?: MenuItem[];
    user?: MenuItem[];
};

export const MENU_KEY = "BVTP_SIDEBAR_MENU_V1";
const DEFAULT_VERSION = 3; // 👈 mỗi lần đổi default menu, tăng số này (v3: thêm admin/user split)

export const sidebarMenuDefault: SidebarMenuData = {
    version: DEFAULT_VERSION,
    items: [],
    admin: [
        {
            id: "m_send",
            label: "Gửi tin nhắn",
            icon: "pi pi-send",
            isActive: true,
            children: [
                { id: "m_send_normal", label: "Gửi tin nhắn", icon: "pi pi-send", to: "/sendmessage", isActive: true },
                { id: "m_send_tpl", label: "Gửi tin nhắn theo mẫu", icon: "pi pi-file", to: "/sendtemplate", isActive: true },
            ],
        },
        {
            id: "m_register",
            label: "Quản lý đăng ký",
            icon: "pi pi-clipboard",
            isActive: true,
            children: [
                { id: "m_register_service", label: "Danh sách đăng ký khám", icon: "pi pi-list", to: "/listRegisterService", isActive: true },
                { id: "m_update_register", label: "Cập nhật đăng ký", icon: "pi pi-pencil", to: "/updateregisterservice", isActive: true },
            ],
        },
        {
            id: "m_customer",
            label: "Quản lý khách hàng",
            icon: "pi pi-users",
            isActive: true,
            children: [
                { id: "m_customer_list", label: "Danh sách người lấy mẫu", icon: "pi pi-list", to: "/showlistinfo", isActive: true },
                { id: "m_customer_add", label: "Thêm thông tin người", icon: "pi pi-plus", to: "/addinfo", isActive: true },
                { id: "m_customer_update", label: "Cập nhật thông tin", icon: "pi pi-pencil", to: "/updateinfo", isActive: true },
            ],
        },
        {
            id: "m_employee",
            label: "Quản lý nhân viên",
            icon: "pi pi-user-edit",
            isActive: true,
            children: [
                { id: "m_employee_list", label: "Danh sách nhân viên", icon: "pi pi-list", to: "/showlistemployee", isActive: true },
                { id: "m_employee_add", label: "Thêm nhân viên", icon: "pi pi-plus", to: "/addemployee", isActive: true },
                { id: "m_employee_update", label: "Cập nhật nhân viên", icon: "pi pi-pencil", to: "/updateemployee", isActive: true },
            ],
        },
        {
            id: "m_user",
            label: "Quản lý tài khoản",
            icon: "pi pi-id-card",
            isActive: true,
            children: [
                { id: "m_user_list", label: "Danh sách tài khoản", icon: "pi pi-list", to: "/userList", isActive: true },
                { id: "m_user_register", label: "Đăng ký tài khoản", icon: "pi pi-plus", to: "/registerUser", isActive: true },
                { id: "m_user_update", label: "Cập nhật tài khoản", icon: "pi pi-pencil", to: "/userUpdate", isActive: true },
            ],
        },
        {
            id: "m_team",
            label: "Quản lý nhóm",
            icon: "pi pi-fw pi-sitemap",
            isActive: true,
            children: [
                { id: "m_team_manager", label: "Quản lý nhóm", icon: "pi pi-list", to: "/managerGroup", isActive: true },
            ],
        },
        {
            id: "m_subclinical",
            label: "Kết quả chuẩn đoán",
            icon: "pi pi-chart-bar",
            isActive: true,
            children: [
                { id: "m_subclinical_result", label: "Xem kết quả", icon: "pi pi-eye", to: "/ketQuaCLS", isActive: true },
            ],
        },
        {
            id: "m_report",
            label: "Báo cáo & Thống kê",
            icon: "pi pi-chart-pie",
            isActive: true,
            children: [
                { id: "m_report_statistical", label: "Thống kê", icon: "pi pi-chart-line", to: "/showListStatistical", isActive: true },
            ],
        },
        {
            id: "m_admin",
            label: "Quản trị",
            icon: "pi pi-cog",
            isActive: true,
            children: [
                { id: "m_manage_menu", label: "Quản lý danh mục", icon: "pi pi-sitemap", to: "/managerCategory", isActive: true },
                { id: "m_view_all_menu", label: "Xem toàn bộ menu", icon: "pi pi-bars", to: "/allMenuCategory", isActive: true },
            ],
        },
    ],
    user: [
        {
            id: "m_send",
            label: "Gửi tin nhắn",
            icon: "pi pi-send",
            isActive: true,
            children: [
                { id: "m_send_normal", label: "Gửi tin nhắn", icon: "pi pi-send", to: "/sendmessage", isActive: true },
            ],
        },
        {
            id: "m_register",
            label: "Quản lý đăng ký",
            icon: "pi pi-clipboard",
            isActive: true,
            children: [
                { id: "m_register_service", label: "Danh sách đăng ký khám", icon: "pi pi-list", to: "/listRegisterService", isActive: true },
            ],
        },
        {
            id: "m_customer",
            label: "Quản lý thông tin",
            icon: "pi pi-users",
            isActive: true,
            children: [
                { id: "m_customer_list", label: "Danh sách người lấy mẫu", icon: "pi pi-list", to: "/showlistinfo", isActive: true },
                { id: "m_customer_update", label: "Cập nhật thông tin", icon: "pi pi-pencil", to: "/updateinfo", isActive: true },
            ],
        },
        {
            id: "m_upload",
            label: "Tải lên",
            icon: "pi pi-cloud-upload",
            isActive: true,
            children: [
                { id: "m_upload_image", label: "Tải lên hình ảnh", icon: "pi pi-image", to: "/uploadImage", isActive: true },
            ],
        },
    ],
};

// Default icon mapping for known menu ids (used to fill missing icons)
const DEFAULT_ICON_MAP: Record<string, string> = {
    m_register: 'pi pi-clipboard',
    m_register_service: 'pi pi-list',
    m_update_register: 'pi pi-pencil',
}

export const applyDefaultIcons = (items?: MenuItem[]) => {
    if (!items) return
    for (const it of items) {
        if (!it.icon && DEFAULT_ICON_MAP[it.id]) it.icon = DEFAULT_ICON_MAP[it.id]
        if (it.children && it.children.length) applyDefaultIcons(it.children)
    }
}

export const menuData = ref<SidebarMenuData>(sidebarMenuDefault);

// Backfill missing icons right away so UI shows them without requiring a full reload
applyDefaultIcons(menuData.value.admin)
applyDefaultIcons(menuData.value.user)
try {
    localStorage.setItem(MENU_KEY, JSON.stringify(menuData.value))
} catch { }

export function loadMenu() {
    try {
        const raw = localStorage.getItem(MENU_KEY);
        if (!raw) {
            menuData.value = sidebarMenuDefault;
            localStorage.setItem(MENU_KEY, JSON.stringify(menuData.value));
            return;
        }

        const parsed = JSON.parse(raw) as SidebarMenuData;

        // 👇 khác version hoặc thiếu admin/user → reset theo default
        if (!parsed?.version || parsed.version !== DEFAULT_VERSION || !parsed.admin) {
            menuData.value = sidebarMenuDefault;
            localStorage.setItem(MENU_KEY, JSON.stringify(menuData.value));
            return;
        }

        // ensure known icons exist (fixes missing icon issues from older user edits)
        applyDefaultIcons(parsed.admin)
        applyDefaultIcons(parsed.user)
        menuData.value = parsed;
    } catch {
        menuData.value = sidebarMenuDefault;
        localStorage.setItem(MENU_KEY, JSON.stringify(menuData.value));
    }
}

export function saveMenu(next: SidebarMenuData) {
    menuData.value = next;
    localStorage.setItem(MENU_KEY, JSON.stringify(next));
}

export function resetMenu() {
    // apply defaults to ensure icons exist
    applyDefaultIcons(sidebarMenuDefault.admin)
    applyDefaultIcons(sidebarMenuDefault.user)
    menuData.value = sidebarMenuDefault;
    localStorage.setItem(MENU_KEY, JSON.stringify(menuData.value));
}

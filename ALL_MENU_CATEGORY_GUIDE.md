# Hướng Dẫn Trang Xem Toàn Bộ Menu (AllMenuCategoryPage)

## Tổng Quan

Trang **AllMenuCategoryPage** được tạo để hiển thị **tất cả danh mục menu không phân quyền**, cho phép xem đầy đủ menu từ cả admin và user mà không cần phân biệt quyền hạn.

## 📍 Vị Trí và Truy Cập

- **File trang:** `src/pages/AllMenuCategoryPage.vue`
- **Route:** `/allMenuCategory`
- **Tên route:** `allMenuCategory`

## ✨ Tính Năng Chính

### 1. **Chuyển đổi Chế Độ Xem**
   - **Tất cả (Admin + User):** Hiển thị tất cả menu từ cả hai quyền hạn, loại bỏ trùng lặp
   - **Chỉ Admin:** Hiển thị chỉ menu của admin
   - **Chỉ User:** Hiển thị chỉ menu của user

### 2. **Tìm Kiếm Menu**
   - Tìm kiếm theo tên menu (case-insensitive)
   - Tự động lọc menu cha và con khi tìm kiếm

### 3. **Xem Chi Tiết Menu**
   Khi chọn một menu, bạn sẽ thấy:
   - **ID:** Mã định danh của menu
   - **Tên hiển thị:** Tên menu
   - **Icon:** Icon sử dụng (PrimeIcons)
   - **Route:** Đường dẫn điều hướng
   - **Trạng thái:** Hiển thị (ON) hay ẩn (OFF)
   - **Loại:** Menu cha hay menu con
   - **Quyền hạn:** Hiển thị menu này thuộc quyền hạn nào (Admin, User)

### 4. **Thống Kê**
   - Tổng số menu Admin
   - Tổng số menu User
   - Tổng số menu (tất cả - không trùng lặp)

## 🏗️ Cấu Trúc Dữ Liệu

Menu được lưu trữ trong `menuStore.ts` với cấu trúc:

```typescript
export type SidebarMenuData = {
    version: number;
    items?: MenuItem[];
    admin?: MenuItem[];      // Menu cho admin
    user?: MenuItem[];       // Menu cho user
};

export type MenuItem = {
    id: string;
    label: string;
    icon?: string;
    to?: string;
    isActive?: boolean;
    children?: MenuItem[];
};
```

## 🔧 Cách Sử Dụng

### Truy Cập Trang
```typescript
// Sử dụng router.push
import { useRouter } from "vue-router";
const router = useRouter();
router.push({ name: "allMenuCategory" });

// Hoặc trực tiếp
router.push("/allMenuCategory");
```

### Chuyển đổi Quyền Hạn
Sử dụng dropdown "Chọn quyền hạn" để chuyển đổi giữa:
- `all` - Tất cả menu
- `admin` - Chỉ admin
- `user` - Chỉ user

## 📊 Ví Dụ Dữ Liệu

```typescript
{
    version: 2,
    admin: [
        {
            id: "m_send",
            label: "Gửi tin nhắn",
            icon: "pi pi-send",
            isActive: true,
            children: [
                {
                    id: "m_send_normal",
                    label: "Gửi tin nhắn",
                    to: "/sendmessage",
                    isActive: true
                }
            ]
        },
        {
            id: "m_admin",
            label: "Quản trị",
            icon: "pi pi-cog",
            children: [
                {
                    id: "m_manage_menu",
                    label: "Quản lý danh mục",
                    to: "/managerCategory"
                }
            ]
        }
    ],
    user: [
        {
            id: "m_send",
            label: "Gửi tin nhắn",
            icon: "pi pi-send",
            children: [...]
        }
    ]
}
```

## 🎯 So Sánh với ManagerCategoryPage

| Tính năng | AllMenuCategoryPage | ManagerCategoryPage |
|-----------|-------------------|-------------------|
| Hiển thị | Tất cả menu (không phân quyền) | Menu admin |
| Chỉnh sửa | ❌ Không | ✅ Có |
| Tìm kiếm | ✅ Có | ✅ Có |
| Xem chi tiết | ✅ Có | ✅ Có |
| Thống kê | ✅ Có | ❌ Không |
| Chuyển đổi quyền hạn | ✅ Có | ❌ Không |

## 🔄 Quá Trình Merge Menu

Khi hiển thị "Tất cả (Admin + User)", trang sẽ:
1. Lấy tất cả menu từ `admin` array
2. Lấy tất cả menu từ `user` array
3. Merge lại, loại bỏ trùng lặp (dựa trên ID)
4. Ghép các children của cùng một menu cha

Ví dụ:
```
Admin: m_send (children: m_send_normal, m_send_tpl)
User:  m_send (children: m_send_normal)

Kết quả merge:
m_send (children: m_send_normal, m_send_tpl)
```

## 📝 Ghi Chú

- Trang này **chỉ dùng để xem**, không thể chỉnh sửa
- Dữ liệu được lấy trực tiếp từ `localStorage` (key: `BVTP_SIDEBAR_MENU_V1`)
- Khi dữ liệu menuStore thay đổi, trang sẽ tự động cập nhật

## 🚀 Tiếp Theo

Nếu bạn muốn:
- **Chỉnh sửa menu:** Sử dụng `/managerCategory`
- **Quản lý quyền hạn:** Cần tạo trang quản lý quyền riêng biệt
- **Thêm tính năng mới:** Có thể mở rộng AllMenuCategoryPage để hỗ trợ chỉnh sửa

import Repository from './Repository'
import { AxiosResponse } from 'axios'
import type { MenuItem, SidebarMenuData } from '@/config/menuStore'

const resource = '/menu'

export default new class {
    /**
     * Fetch menu configuration from database
     */
    getMenuConfig(): Promise<AxiosResponse<SidebarMenuData>> {
        return Repository.get(`${resource}/config`)
    }

    /**
     * Save menu configuration to database
     * @param data Menu configuration with admin and user menus
     */
    saveMenuConfig(data: SidebarMenuData): Promise<AxiosResponse<{ success: boolean; message: string }>> {
        return Repository.post(`${resource}/config`, data)
    }

    /**
     * Add a new menu item
     * @param item Menu item to add
     */
    addMenuItem(item: MenuItem): Promise<AxiosResponse<MenuItem>> {
        return Repository.post(`${resource}`, item)
    }

    /**
     * Update an existing menu item
     * @param id Menu item ID
     * @param item Updated menu item data
     */
    updateMenuItem(id: string, item: Partial<MenuItem>): Promise<AxiosResponse<MenuItem>> {
        return Repository.put(`${resource}/${id}`, item)
    }

    /**
     * Delete a menu item
     * @param id Menu item ID
     */
    deleteMenuItem(id: string): Promise<AxiosResponse<{ success: boolean; message: string }>> {
        return Repository.delete(`${resource}/${id}`)
    }

    /**
     * Reset menu to default configuration
     */
    resetMenuToDefault(): Promise<AxiosResponse<SidebarMenuData>> {
        return Repository.post(`${resource}/reset`, {})
    }
}

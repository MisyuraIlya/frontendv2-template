import apiInterceptor from '../../api/api.interceptor'

export const AdminCatalogService = {
  async getAdminCategoory(lvl1: string, lvl2: string): Promise<ICategory[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/category/adminCategories/${lvl1}/${lvl2}`
    )
    return response.data
  },

  async updateCategory(category: any): Promise<ICategory> {
    const response = await apiInterceptor.put(
      `${import.meta.env.VITE_API}/category/${category.id}`,
      category
    )

    return response.data
  },

  async dragAndDropCategories(category: ICategory[]): Promise<ICategory> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/category/drag-and-drop`,
      category
    )

    return response.data
  },
}

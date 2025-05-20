import apiInterceptor from '../../api/api.interceptor'

export const AdminHomeEditService = {
  async getHomeEdits(): Promise<IHomeEdit[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/home-edit`
    )
    return response.data
  },

  async dragAndDropEdit(arr: IHomeEdit[]) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/dragAndDrop/homeEdit`,
      arr
    )
    return response.data
  },

  async updateHome(data: any): Promise<IHomeEdit> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/home-edit/${data.id}`,
      data
    )

    return response.data
  },

  async createHomeEdits(data: any) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/home-edit`,
      data
    )
    return response.data
  },

  async deleteHomeEdit(id: number): Promise<void> {
    await apiInterceptor.delete(`${import.meta.env.VITE_API}/home-edit/${id}`)
  },
}

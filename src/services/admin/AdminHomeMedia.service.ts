import apiInterceptor from '../../api/api.interceptor'

export const AdminHomeMediaService = {
  async getHomeMedia(): Promise<IHomeMedia[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/home-media`
    )
    return response.data
  },

  async createHomeMedia(data: any) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/home-media`,
      data
    )
    return response.data
  },

  async updateHomeMedia(data: any): Promise<IHomeEdit> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/home-media/${data.id}`,
      data
    )
    return response.data
  },

  async deleteHomeMedia(id: number): Promise<void> {
    await apiInterceptor.delete(`${import.meta.env.VITE_API}/home-media/${id}`)
  },
}

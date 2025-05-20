import apiInterceptor from '../../api/api.interceptor'

export const AdminBonusesService = {
  async getBonuses(): Promise<IBonus[]> {
    const response = await apiInterceptor.get<IBonus[]>(
      `${import.meta.env.VITE_API}/bonus`
    )
    return response.data
  },

  async createBonus(data: any) {
    await apiInterceptor.post(`${import.meta.env.VITE_API}/bonus`, data)
  },

  async getBonus(id: number): Promise<IBonus> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/bonus/${id}`
    )
    return response.data
  },

  async createBonusDetailed(data: any) {
    await apiInterceptor.post(
      `${import.meta.env.VITE_API}/bonus-detailed`,
      data
    )
  },
}

import apiInterceptor from '../../api/api.interceptor'

export const salesKeeperService = {
  async getSalesSkeeper(userId: string | number): Promise<ISalesKeeper> {
    const apiUrl = `${import.meta.env.VITE_API}/user/salesKeeper/${userId}`
    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },

  async getSalesQuantityKeeperAlert(
    userId: string | number
  ): Promise<IQuantityKeeper[]> {
    const apiUrl = `${import.meta.env.VITE_API}/user/quantityKeeper/${userId}`
    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },
}

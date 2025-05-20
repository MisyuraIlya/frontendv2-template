import apiInterceptor from '../api/api.interceptor'

export const WarehousesService = {
  async GetWarehouseDetailed(
    productId: number
  ): Promise<IWarehouseItemDetailed[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/product/warehouseDetailed/${productId}`
    )
    return response.data
  },

  async GetPurchaseDelivery(productId: number): Promise<IPurchaseDelivery> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/product/purchaseDelivery/${productId}`
    )
    return response.data
  },
}

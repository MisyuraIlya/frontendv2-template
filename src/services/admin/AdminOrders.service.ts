import apiInterceptor from '../../api/api.interceptor'


export const AdminOrderService = {
  async getOrders(
    dateFrom: string,
    dateTo: string,
    page: string | number,
    search: string
  ): Promise<IResponse<IDocument[]>> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/api/histories?page=${page}&createdAt[after]=${dateFrom}&createdAt[before]=${dateTo}&user.extId=${search}`
    )
    return response.data
  },

  async getOrderItem(orderItem: string | number): Promise<IResponse<IDocument[]>> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/api/history_detaileds?history.id=${orderItem}`
    )
    return response.data
  },

  async createHistory(history: any): Promise<IDocument> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/history`,
      history
    )
    return response.data
  },
  async createHistoryDetailed(historyDetailed: any): Promise<IDocumentItem> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/history-detailed`,
      historyDetailed
    )
    return response.data
  },
}

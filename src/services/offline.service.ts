import apiInterceptor from '../api/api.interceptor'

export const OfflineService = {
  async handleOfflinePrices(
    history: IDocument,
    historyDetailed: IDocumentItem[]
  ): Promise<ICart[]> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/offline/handlePrice`,
      {
        history,
        historyDetailed,
      }
    )
    return response.data
  },
  async sendOfflineOrder(history: IDocument, historyDetailed: IDocumentItem[]) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/apiv2/offline/sendOrder`,
      {
        history,
        historyDetailed,
      }
    )
    return response.data
  },
}

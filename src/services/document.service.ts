import moment from 'moment'
import apiInterceptor from '../api/api.interceptor'

export const DocumentsService = {
  async GetDocuments(
    user: IUser,
    documentType: string,
    fromDate: Date,
    toDate: Date,
    page: string | number
  ): Promise<DocumentsResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')

    let url = `${import.meta.env.VITE_API}/document/documentList/${documentType}/${fromConverted}/${toDateConverted}?page=${page}`

    if (
      user.role === 'ROLE_USER' ||
      user.role === 'ROLE_AGENT' ||
      user.role === null
    ) {
      url += `&userId=${user.id}`
    }
    const response = await apiInterceptor.get(url)
    return response.data
  },

  async GetDocumentsItem(
    documentItemType: IDocumentTypes,
    documentNumber: number | string
  ): Promise<IDocumentItems> {
    const apiUrl = `${import.meta.env.VITE_API}/document/documentItems/${documentItemType}/${documentNumber}`
    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },

  async RestoreCart(
    documentType: string,
    userId: number,
    documentNumber: string
  ): Promise<ICart[] | null> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/document/restoreCart/${documentType}/${userId}/${documentNumber}`
    )
    if (response.data) {
      return response.data
    } else {
      return null
    }
  },

  async ApproveOrder(orderId: number, agentId: number) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/approve`,
      {
        agentId,
        orderId,
      }
    )
    return response.data
  },

  async GetCartesset(
    user: IUser,
    fromDate: Date,
    toDate: Date
  ): Promise<IDynamicTables> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')
    const apiUrl = `${import.meta.env.VITE_API}/document/cartesset/${fromConverted}/${toDateConverted}/${user?.id}`
    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },

  async GetDebit(
    user: IUser,
    fromDate: Date,
    toDate: Date
  ): Promise<IDynamicTables> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')
    const apiUrl = `${import.meta.env.VITE_API}/document/debit/${fromConverted}/${toDateConverted}/${user?.id}`
    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },
}

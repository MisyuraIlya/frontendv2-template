import apiInterceptor from '../../api/api.interceptor'

export const AdminNotificationsServices = {
  async createItem(object: INotification): Promise<INotification> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/notification`,
      object
    )
    return response.data
  },

  async updateItem(object: INotification): Promise<INotification> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/notification/${object.id}`,
      object
    )
    return response.data
  },

  async deleteItem(id: number | string): Promise<void> {
    const response = await apiInterceptor.delete(
      `${import.meta.env.VITE_API}/notification/${id}`
    )
    return response.data
  },

  async fetchNotifications(): Promise<INotification[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/notification`
    )
    console.log('response', response)
    return response.data
  },

  async sendNotification(data: ISendNotification) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/notification/send-notification`,
      data
    )
    return response.data
  },
}

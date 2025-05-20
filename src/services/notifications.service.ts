import apiInterceptor from '../api/api.interceptor'

export const notifications = {
  async getNotificationByUserId(
    userId: string | number
  ): Promise<INotificationUser[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/notification-user?user.id=${userId}&isRead=false`
    )
    return response.data
  },

  async updateNotification(obj: {
    id: number
    isRead: boolean
  }): Promise<{ id: number; isRead: boolean }> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/notification-user/${obj.id}`,
      obj
    )
    return response.data
  },
}

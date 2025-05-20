import apiInterceptor from '../api/api.interceptor'

export const OneSignalService = {
  async registerAppId(user: IUser, appId: string) {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/api/user/${user.id}`,
      { oneSignalAppId: appId }
    )
    return response.data
  },
}

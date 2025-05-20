import apiInterceptor from '../../api/api.interceptor'

interface updateAuthResponse {
  data: null
  message: string
  status: 'success' | 'error'
}

export const AdminClinetsService = {
  async getUsers(
    roleType: ROLE_TYPES,
    page: string | number,
    search?: string,
    isRegistered?: string
  ): Promise<UsersResponse> {
    let isAgent = false
    if (roleType == 'ROLE_SUPER_AGENT' || roleType === 'ROLE_AGENT')
      isAgent = true
    let url = `${import.meta.env.VITE_API}/user?page=${page}&isAgent=${isAgent}&isBlocked=false`
    if (!isAgent) {
      url += `&role=ROLE_USER`
    }
    if (search) {
      url += `&search=${search}`
    }
    if (isRegistered) {
      url += `&isRegistered=${isRegistered}`
    }

    const response = await apiInterceptor.get(url)
    return response.data
  },

  async getClientItem(userId: string | number): Promise<IUser> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/api/user/${userId}`
    )
    return response.data
  },

  async createClient(user: IUser): Promise<IUser> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/apiv2/auth/createAgent`,
      user
    )
    return response.data
  },

  async updateClient(user: IUser): Promise<updateAuthResponse> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/apiv2/auth/updateUser`,
      user
    )
    return response.data
  },
}

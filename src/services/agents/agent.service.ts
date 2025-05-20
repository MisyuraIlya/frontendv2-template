import apiInterceptor from '../../api/api.interceptor'

interface agentServiceResponse extends IPagination {
  data: IUser[]
}

export const agentService = {
  async getClients(
    agentId: string,
    page: string | number = '1',
    search?: string,
    status?: string
  ): Promise<agentServiceResponse> {
    let apiUrl = `${import.meta.env.VITE_API}/user/agentClients/${agentId}?page=${page}`

    if (search) {
      apiUrl += `&search=${search}`
    }

    if (status) {
      apiUrl += `&status=${status}`
    }

    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },
}

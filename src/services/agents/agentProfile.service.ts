import apiInterceptor from '../../api/api.interceptor'

interface AgentObjectiveResponse extends IPagination {
  data: IAgentObjective[]
}

export const agentProfileService = {
  async getAgentObjective(
    page: string | number,
    type?: objectiveTypes | null,
    search?: string | null,
    agentId?: string | null,
    dateFrom?: string | null,
    dateTo?: string | null
  ): Promise<AgentObjectiveResponse> {
    try {
      let apiUrl = `${import.meta.env.VITE_API}/agent-objective?page=${page}`
      if (type) {
        apiUrl += `&objectiveType=${type}`
      }
      if (agentId) {
        apiUrl += `&agent=${agentId}`
      }
      if (search) {
        apiUrl += `&search=${search}`
      }
      if (dateFrom && dateTo) {
        apiUrl += `&date[before]=${dateFrom}&date[after]=${dateTo}`
      }
      const response = await apiInterceptor.get(apiUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching agent objectives:', error)
      throw error
    }
  },
  async createAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/agent-objective`,
      object
    )
    return response.data
  },
  async updateAgentObjective(
    object: IAgentObjective
  ): Promise<IAgentObjective> {
    console.log('object', object)
    const response = await apiInterceptor.put(
      `${import.meta.env.VITE_API}/agent-objective/${object.id}`,
      object
    )
    return response.data
  },
  async deleteAgentObjective(id: number | string): Promise<void> {
    const response = await apiInterceptor.delete(
      `${import.meta.env.VITE_API}/agent-objective/${id}`
    )
    return response.data
  },

  // TARGETS
  async getAgentTargets(
    agentId: number | string | null,
    year: string
  ): Promise<IAgentTaget[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/agent-target?agent=${agentId}&year=${year}`
    )
    return response.data
  },
  async createAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/agent-target`,
      object
    )
    return response.data
  },
  async updateAgentTarget(object: IAgentTaget): Promise<IAgentTaget> {
    const response = await apiInterceptor.put(
      `${import.meta.env.VITE_API}/agent-target/${object.id}`,
      object
    )
    return response.data
  },
  async deleteAgentTarget(id: number | string): Promise<void> {
    const response = await apiInterceptor.delete(
      `${import.meta.env.VITE_API}/agent-objective/${id}`
    )
    return response.data
  },

  async getAgentProfile(
    agentId: number | string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<IAgentProfile> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/user/agentProfile/${agentId}/${dateFrom}/${dateTo}`
    )
    return response.data
  },

  async getAgentsStatistsics(
    dateFrom: string,
    dateTo: string
  ): Promise<IAgentsStatistic> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/user/agentsStatistic/${dateFrom}/${dateTo}`
    )
    return response.data
  },
}

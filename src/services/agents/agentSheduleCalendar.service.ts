import moment from 'moment'
import apiInterceptor from '../../api/api.interceptor'

export const agentSheduleCalendarService = {
  async getAgentObjective(
    agentId: number | string | null,
    dateFrom: string,
    dateTo: string
  ): Promise<IAgentObjective[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/user/calendar/${agentId}/${moment(
        dateFrom
      ).format('YYYY-MM-DD')}/${moment(dateTo).format('YYYY-MM-DD')}`
    )
    return response.data
  },

  async updateIsCompleted(id: number, isCompleted: boolean) {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/agent-objective/${id}`,
      {
        isCompleted,
        completedAt: moment().format('YYYY-MM-DD'),
      }
    )
    return response.data
  },
}

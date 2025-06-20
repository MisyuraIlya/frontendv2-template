import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchData = async (agentId: string, dateFrom: string, dateTo: string) => {
  return await services.Agents.agentProfileService.getAgentObjective(
    1,
    null,
    null,
    agentId,
    dateFrom,
    dateTo
  )
}

const fetchDataProfile = async (
  agentId: string | number,
  dateFrom: string,
  dateTo: string
) => {
  return await services.Agents.agentProfileService.getAgentProfile(
    agentId,
    dateFrom,
    dateTo
  )
}

type RouteParams = {
  id: string
}

const useDataAgentDashboard = (weekFrom: string, weekTo: string) => {
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/calendar/${id}/${weekFrom}/${weekTo}`,
    () => fetchData(id!, weekFrom, weekTo)
  )

  const { data: profile, isLoading: profileLoading } = useSWR(
    `/agentProfile/${id}`,
    () => fetchDataProfile(id!, weekFrom, weekTo)
  )

  const updateObjective = async (obj: any) => {
    try {
      obj.agent = {
        id: id,
      }
      await services.Agents.agentProfileService.updateAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  return {
    data,
    profile,
    profileLoading,
    isLoading: isLoading,
    isError: error,
    updateObjective,
    isValidating,
    mutate,
  }
}

export default useDataAgentDashboard

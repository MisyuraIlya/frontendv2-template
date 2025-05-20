import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchData = async (agentId: string, year: string) => {
  return await services.Agents.agentProfileService.getAgentTargets(
    agentId,
    year
  )
}

type RouteParams = {
  id: string
}

const useDataAgentTargets = (year: string) => {
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `agent-target/${id}?year=${year}`,
    () => fetchData(id!, year)
  )
  const createTarget = async (obj: IAgentTaget) => {
    try {
      if (id) {
        obj.agent = {
          id: id.toString(),
        }
      }
      await services.Agents.agentProfileService.createAgentTarget(obj)
      mutate()
    } catch (e) {
      console.log('[ERROR] error', e)
    }
  }

  const updateTarget = async (obj: IAgentTaget) => {
    try {
      if (id) {
        obj.agent = {
          id: id.toString(),
        }
      }
      await services.Agents.agentProfileService.updateAgentTarget(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  return {
    data,
    isLoading: isLoading,
    createTarget,
    updateTarget,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentTargets

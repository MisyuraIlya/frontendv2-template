import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchDataProfile = async (
  agentId: string,
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
  dateFrom: string
  dateTo: string
}

const useDataAgentProfile = () => {
  const { id, dateFrom, dateTo } = useParams<RouteParams>()

  const { data, isLoading } = useSWR(`/agentProfile/${id}`, () =>
    fetchDataProfile(id!, dateFrom!, dateTo!)
  )

  const findTarget = (numberMonth: number) => {
    const find = data?.monthlyTotals?.find((item) => item.month === numberMonth)
    return find?.total ?? 0
  }

  return {
    data,
    isLoading,
    findTarget,
  }
}

export default useDataAgentProfile

import useSWR from 'swr'
import services from '../../services'

const fetchDataProfile = async (dateFrom: string, dateTo: string) => {
  return await services.Agents.agentProfileService.getAgentsStatistsics(
    dateFrom,
    dateTo
  )
}

const useDataAgentsStatistics = (dateFrom: string, dateTo: string) => {
  const { data, isLoading } = useSWR(
    `/agentsStatistic/${dateFrom}/${dateTo}`,
    () => fetchDataProfile(dateFrom, dateTo)
  )

  return {
    data,
    isLoading,
  }
}

export default useDataAgentsStatistics

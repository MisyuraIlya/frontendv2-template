import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import services from '../../services'
import { useOffline } from '../../provider/OfflineProvider'
import { UserRepository } from '../../db'

type RouteParams = {
  agentId: string
}

const PAGE_SIZE = 24

const fetchOnline = async (
  agentId: string,
  page: number,
  search: string,
  status: string
): Promise<IAgentServiceResponse> => {
  try {
    const resp = await services.Agents.agentService.getClients(
      agentId,
      String(page),
      search,
      status
    )
    return resp
  } catch (e) {
    console.error('AgentService failed:', e)
    return {
      data: [],
      total: 0,
      pageCount: 0,
      page: 0,
      size: PAGE_SIZE,
    }
  }
}

const fetchOffline = async (
  agentId: number,
  page: number,
  search: string,
  status: string
): Promise<IAgentServiceResponse> => {
  const { users, totalItems, currentPage, lastPage } =
    await UserRepository.getUsers(agentId, String(page), search, status)

  return {
    data: users,
    total: totalItems,
    pageCount: lastPage,
    page: currentPage,
    size: PAGE_SIZE,
  }
}

const useDataAgentClients = () => {
  const { isOnline } = useOffline()
  const location = useLocation()
  const { agentId } = useParams<RouteParams>()

  const params = new URLSearchParams(location.search)
  const page = parseInt(params.get('page') || '1', 10)
  const search = params.get('search') || ''
  const status = params.get('status') || ''

  const shouldFetch = Boolean(agentId)

  const key = shouldFetch
    ? ['agentClients', agentId, page, search, status, isOnline]
    : null

  const { data, error, isValidating, mutate } = useSWR<IAgentServiceResponse>(
    key,
    async ([, id, pg, srch, st, online]) => {
      if (online) {
        return fetchOnline(id as string, pg as number, srch as string, st as string)
      } else {
        return fetchOffline(Number(id), pg as number, srch as string, st as string)
      }
    },
    {
      revalidateOnReconnect: true,
    }
  )

  return {
    data,                
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentClients

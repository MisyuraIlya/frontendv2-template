import useSWR from 'swr'
import { useAuth } from '../../store/auth.store'
import { salesKeeperService } from '../../services/agents/salesKeeper.service'

const fetchData = async (userId: string | number) => {
  return salesKeeperService.getSalesSkeeper(userId)
}

const useDataSalesKeeper = (userId?: string | number) => {
  const { user } = useAuth()
  const id = userId ?? user?.id

  const shouldFetch = Boolean(id)

  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `salesKeeper/${id}` : null,
    () => fetchData(id as string | number)
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataSalesKeeper

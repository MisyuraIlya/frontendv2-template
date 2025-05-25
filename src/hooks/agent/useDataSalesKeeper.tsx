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

  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 60 * 2, 
  }

  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `salesKeeper/${id}` : null,
    () => fetchData(id as string | number),
    swrOptions
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataSalesKeeper

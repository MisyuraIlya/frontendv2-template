import useSWR from 'swr'
import { useAuth } from '../../store/auth.store'
import { salesKeeperService } from '../../services/agents/salesKeeper.service'

const fetchData = async (
  userId: number | string
): Promise<IQuantityKeeper[]> => {
  return salesKeeperService.getSalesQuantityKeeperAlert(userId)
}

const useDataQuantityKeeper = (userId?: string | number | null) => {
  const { user } = useAuth()

  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 60 * 2, 
  }

  const id = userId ?? user?.id
  const { data, isLoading, mutate } = useSWR<IQuantityKeeper[]>(
    id ? `salesQuantityKeeper/${id}` : null,
    () => fetchData(id as number | string),
    swrOptions
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataQuantityKeeper

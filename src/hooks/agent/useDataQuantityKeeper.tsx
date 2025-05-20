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

  const id = userId ?? user?.id
  const { data, isLoading, mutate } = useSWR<IQuantityKeeper[]>(
    id ? `salesQuantityKeeper/${id}` : null,
    () => fetchData(id as number | string)
  )

  return {
    data,
    isLoading,
    mutate,
  }
}

export default useDataQuantityKeeper

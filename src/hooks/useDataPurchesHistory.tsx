import useSWR from 'swr'
import services from '../services'
import { useAuth } from '../store/auth.store'

const fetchData = async (
  userId: number,
  productId: number
): Promise<PurchaseHistoryItem[]> => {
  return await services.CatalogService.GetPurchaseHistory(userId, productId)
}

const useDataPurchesHistory = (productId: number) => {
  const { user } = useAuth()
  const shouldFetch = user?.extId && productId

  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 5, 
  }

  const { data, error, isLoading, mutate } = useSWR<PurchaseHistoryItem[]>(
    shouldFetch ? `/api/purchaseHistory/${user.id}/${productId}` : null,
    () => fetchData(user!.id!, productId),
    swrOptions
  )

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export default useDataPurchesHistory

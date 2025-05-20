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

  const { data, error, isLoading, mutate } = useSWR<PurchaseHistoryItem[]>(
    shouldFetch ? `/api/purchaseHistory/${user.id}/${productId}` : null,
    () => fetchData(user!.id!, productId)
  )

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export default useDataPurchesHistory

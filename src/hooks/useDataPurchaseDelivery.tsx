import useSWR from 'swr'
import { WarehousesService } from '../services/warehouses.service'

const fetchData = async (productId: number): Promise<IPurchaseDelivery> => {
  return await WarehousesService.GetPurchaseDelivery(productId)
}

const useDataPurchaseDelivery = (productId: number) => {
  const { data, error, isLoading, mutate } = useSWR<IPurchaseDelivery>(
    productId ? `/api/purchaseDelivery/${productId}` : null,
    () => fetchData(productId)
  )

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export default useDataPurchaseDelivery

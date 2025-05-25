import useSWR from 'swr'
import { WarehousesService } from '../services/warehouses.service'

const fetchData = async (
  productId: number
): Promise<IWarehouseItemDetailed[]> => {
  return await WarehousesService.GetWarehouseDetailed(productId)
}

const useDataWarehouseDetailed = (productId: number) => {
  
  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 60 * 2, 
  }
  
  const { data, error, isLoading, mutate } = useSWR<IWarehouseItemDetailed[]>(
    productId ? `/api/warehouseDetailed/${productId}` : null,
    () => fetchData(productId),
    swrOptions
  )

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export default useDataWarehouseDetailed

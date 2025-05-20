import useSWR from 'swr'
import { WarehousesService } from '../services/warehouses.service'

const fetchData = async (
  productId: number
): Promise<IWarehouseItemDetailed[]> => {
  return await WarehousesService.GetWarehouseDetailed(productId)
}

const useDataWarehouseDetailed = (productId: number) => {
  const { data, error, isLoading, mutate } = useSWR<IWarehouseItemDetailed[]>(
    productId ? `/api/warehouseDetailed/${productId}` : null,
    () => fetchData(productId)
  )

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export default useDataWarehouseDetailed

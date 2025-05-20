import useSWR from 'swr'
import services from '../../services'
import { useParams } from 'react-router-dom'

const fetchData = async (id: string): Promise<IAttributeMain> => {
  return await services.Admin.AdminAttributesService.getAttributeDetailed(id)
}

const useAdminAttributeDetailed = () => {
  const { id } = useParams()
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<IAttributeMain>(`aattribute-main/${id}`, () => fetchData(id!))

  const handleUpdate = async (attribute: any) => {
    await services.Admin.AdminAttributesService.updateAttributeDetailed(
      attribute
    )
    mutate()
  }

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
    handleUpdate,
  }
}

export default useAdminAttributeDetailed

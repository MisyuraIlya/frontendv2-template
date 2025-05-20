import useSWR from 'swr'
import services from '../../services'

const fetchData = async (): Promise<IAttributeMain[]> => {
  return await services.Admin.AdminAttributesService.getAttributes()
}

const useAdminAttributes = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    IAttributeMain[]
  >(`api/attribute_mains`, () => fetchData())

  const handleUpdate = async (category: any) => {
    await services.Admin.AdminAttributesService.updateAttributes(category)
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

export default useAdminAttributes

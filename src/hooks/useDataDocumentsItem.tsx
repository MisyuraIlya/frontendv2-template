import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../services'

type RouteParams = {
  documentItemType: IDocumentTypes
  id: string
}

const fetchData = async (
  documentItemType: IDocumentTypes,
  id: string
): Promise<IDocumentItems> => {
  const response = await services.DocumentsService.GetDocumentsItem(
    documentItemType as IDocumentTypes,
    id
  )
  return response as IDocumentItems
}

const useDataDocumentsItem = () => {
  const { documentItemType, id } = useParams<RouteParams>()
  const { data, error, isValidating, mutate } = useSWR<IDocumentItems>(
    `api/documents/${documentItemType}/${id}`,
    () => fetchData(documentItemType!, id!)
  )

  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataDocumentsItem

import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../services'
import { HistoryDetailedRepository, HistoryRepository } from '../db'

type RouteParams = {
  documentItemType: IDocumentTypes
  id: string
}

const fetchData = async (
  documentItemType: IDocumentTypes,
  id: string
): Promise<IDocumentItems> => {
  if (documentItemType === 'offline') {
    const products: IDocumentItem[] = await HistoryDetailedRepository.findHistoryDetailedByHistoryId(id)
    const document = await HistoryRepository.findHistoryById(parseInt(id, 10))
    const totalTax = products.reduce(
      (sum, item) => sum + item.total * (item.tax / 100),
      0
    )
    const totalAfterDiscount = products.reduce(
      (sum, item) => sum + item.total,
      0
    )
    const totalPriceAfterTax = products.reduce(
      (sum, item) => sum + item.total,
      0
    )
    const totalPrecent = 0
    return {
      document: document!,              
      products,
      totalTax,
      totalPriceAfterTax,
      totalAfterDiscount,
      totalPrecent,
      documentType: 'offline',
      files: [],             
    }
  }
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

interface ICart {
  discount: number
  price: float
  product: IProduct
  quantity: number
  packQuantity: number
  sku: string
  stock: number
  total: float
  comment: string
  isBonus: boolean
}

type IDocumentType = 'order' | 'quote' | 'return' | 'draft'

interface IDocumentMode {
  value: IDocumentType
  label: string
  englishLabel: string
  isOnlyAgent: boolean
}

type IPriceMode = 'selfPrice' | 'updatedPrice'

interface ICartCheck {
  maam: float
  delivery: IDelivery[]
  deliveryTypes: IDeliveryType[]
}

interface IDeliveryType {
  code: string
  name: string
}

interface IDelivery {
  date: string
  hebrewDay: string
  day: string
  fromtTime: string
  toTime: string
  isCanSend: boolean
}

interface CartCheckResponse extends ApiResponse {
  data: ICartCheck
}

type SendOrderResponse = {
  data: { historyId: string | number | null; orderNumber: null }
  message: string
  status: 'success' | 'error'
}

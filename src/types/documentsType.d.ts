// ============= Documents =============
type OrderStatus = 'paid' | 'draft' | 'pending' | 'faild'

type IDocumentTypes =
  | 'history'
  | 'draft'
  | 'approve'
  | 'order'
  | 'priceOffer'
  | 'deliveryOrder'
  | 'aiInvoice'
  | 'ciInvoice'
  | 'returnOrder'
  | 'kartesset'
  | 'offline'
  | 'Orders'
  | 'Quotations'
  | 'DeliveryNotes'
  | 'Invoices'
  | 'Returns'

interface IDocument {
  id?: number
  documentNumber: string | null
  documentType: IDocumentTypes
  userName: string
  userExId: string
  agentExId: string
  agentName: string
  comment: string
  status: string
  createdAt: string
  updatedAt: string
  deliveryAt: string
  dueDateAt: string
  total: number
  error: string
  user: IUser | null
  tax: number
  orderComment: string
}

// ============= Documents =============

// ============= Documents Items =============

interface IDocumentItems {
  products: IDocumentItem[]
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  documentType: string
  document: IDocument
  files: IDocumentItemsFile[]
}

interface IDocumentItem {
  id?: number
  sku: string
  title: string
  quantity: number
  priceByOne: number
  total: number
  discount: number
  product: IProduct
  comment: string
  //for offline
  historyId?: string | number
  tax: number
}

interface IDocumentItemsFile {
  name: string
  base64: string
}

// ============= Documents Items =============

interface DocumentsResponse extends IPagination {
  documents: IDocument[]
}

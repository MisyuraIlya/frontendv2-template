declare module '*.png'
declare module '*.svg'


interface Window {
  SpeechRecognition: any
  webkitSpeechRecognition: any
  OneSignal?: {
    registerForPushNotifications(): Promise<void>
    getUserId(): Promise<string | null>
    init(options: { appId: string }): void
    clearEventHandlers(): void
  }
}

interface IResponse<T> {
  status: boolean
  message: string
  data: T
}

interface IPagination {
  total: number
  pageCount: number
  page: number
  size: number
}

interface IDynamicTables {
  columns: string[]
  columnsEnglish: string[]
  lines: any[]
}



interface hydraPagination {
  totalPages: number | string
  page: number | string
  lastPage: number | string
  nextPage: number | string
  previous: number | string
}

interface HydraView {
  'hydra:first': string
  'hydra:last': string
  'hydra:next': string | null
  'hydra:previous': string | null
}

interface Hydra {
  'hydra:totalItems': number
  'hydra:view'?: HydraView | null
}

interface ApiResponse {
  message: string
  status: 'success' | 'error'
}

interface IMediaObject {
  id: number
  contentUrl: string
  filePath: string
  source: 'product' | 'category' | 'notification'
  createdAt: string
  updatedAt: string
}

interface IURL {
  LINK: string
  LABEL: string
  ICON: JSX.Element
  FOR_AGENT: boolean
  SHOW_IN_PROFILE_MENU: boolean
  SHOW_IN_HEADER: boolean
  WITH_BADGE: boolean
}

interface GlobalSettings {
  title: string
  description: string
  minimumPrice: number
  deliveryPrice: number
  isWithStock: boolean
  isOpenWorld: boolean
  email: string
  phone: string
  fax: string
  location: string
  footerDescription1: string
  footerDescription2: string
  footerDescription3: string
  primaryColor: string
  secondaryColor: string

  oneSignalKey: string
  paymentSystem: 'none' | 'tranzilla' | 'yadsarig'
  erp: 'SAP' | 'PRIORITY'

  categoryLvlsNumber: number
  showCategoryNavBar: boolean
  homePageAllCategoriesComponent: boolean
  allowRegistration: boolean
}

declare global {
  interface Window {
    settings: GlobalSettings
  }
}
const settings: GlobalSettings = window.settings

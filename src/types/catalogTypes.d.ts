interface IProduct {
  id: number
  sku: string
  title: string
  titleEnglish: string
  defaultImagePath: string
  description: string
  barcode: string
  isPublished: boolean
  categoryLvl1: ICategory
  categoryLvl2: ICategory
  categoryLvl3: ICategory
  productImages: IImagePath[]
  createdAt: string
  updatedAt: string
  basePrice: float
  finalPrice: float
  minimumPrice: float
  stock: number
  packQuantity: number
  discount: number
  ordern: number
  productAttributes: IProductAttributes[]
  productPackages: IProductPackage[]
  bonuses: IBonus[]
  link: string
  linkTitle: string
  isNew: boolean
  isSpecial: boolean
}

interface IProductPackage {
  id: number
  quantity: number
}

interface IImagePath {
  id: number
  mediaObject: IMediaObject
}

type typeMode = 'list' | 'grid'

interface ICategory {
  id: number
  extId: string
  title: string
  englishTitle: string
  description: string
  isPublished: boolean
  orden: number
  lvlNumber: number
  parent: ?ICategory
  categories: ?ICategory[]
  mediaObject: IMediaObject
  identify: string
  isBlockedForView: boolean
}

interface IAttributeMain {
  id: number
  extId: string
  title: string
  isPublished: boolean
  ordern: number
  isInProductCard: boolean
  isInFilter: boolean
  SubAttributes: ISubAttributes[]
}

interface IProductAttributes {
  attributeSub: ISubAttributes
}

interface ISubAttributes {
  id: number
  title: string
  productCount: number
  attribute: IAttributeMain
  isPublished: boolean
  orden: number
}

interface PurchaseHistoryItem {
  documentNumber: string
  date: string
  quantity: number
  price: number
  vatPrice: number
  discount: number
  totalPrice: number
  vatTotal: number
}

interface ProductPopUp {
  documents: ProductDocument[]
}

interface ProductDocument {
  EXTFILEDES: string
  CURDATE: string
  EXTFILENAME: string
  ELEL_SITEDISPLAY: string
  SUFFIX: string
}

interface IBonus {
  id: number
  userExtId: string
  createdAt: string
  expiredAt: string
  title: string
  extId: string
  bonusDetaileds: IBonusDetaildes[]
}

interface IBonusDetaildes {
  id: number
  product: IProduct
  minimumQuantity: number
  bonusProduct: IProduct
  bonusQuantity: number
}

type selectObject = {
  value: string
  label: string
  englishLabel: string
}

type CatalogDocumentType = 'catalog' | 'search' | 'special' | 'new'

interface GetCatalogResponse extends IPagination {
  data: IProduct[]
  filters: IAttributeMain[]
}

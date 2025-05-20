interface IWarehouseItemDetailed {
  warehouseCode: string
  warehouseTilte: string
  address: string
  city: string
  stock: number
  committed: number
  ordered: number
}

interface IPurchaseDelivery {
  lines: IPurchaseDeliveryItem[]
}

interface IPurchaseDeliveryItem {
  sku: string
  docNumber: string
  quantity: number
  ShipDate: string
  warehouse: string
  status: string
  address: string
}

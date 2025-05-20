interface IQuantityKeeper {
  sku: string
  productDescription: string
  sumPreviousMonthCurrentYear: number
  sumPreviousMonthPreviousYear: number
  averageLastThreeMonths: number
}

interface ISalesKeeper {
  sumPreviousMonthCurrentYear: number
  sumPreviousMonthPreviousYear: number
  averageLastThreeMonths: number
}

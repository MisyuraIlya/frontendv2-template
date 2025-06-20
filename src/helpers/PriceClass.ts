import { settings } from "../settings"

class PriceCalculator {
  private taxRate: number = 0
  private user: IUser | null = null
  private cart: ICart[] = []
  private deliveryPrice: number = 0
  private minimumPrice: number = 0
  private discountPercent: number = 0

  constructor(
    taxRate: number = 0,
    user: IUser | null,
    cart: ICart[],
    discountPercent: number = 0
  ) {
    this.taxRate = taxRate
    this.user = user
    this.cart = cart
    this.deliveryPrice = settings.deliveryPrice
    this.minimumPrice = settings.minimumPrice
    this.discountPercent = discountPercent
    console.log(this.user)
  }

  // חייב במע״מ
  public getTaxedPrice(): number {
    return this.cart.reduce((a, b) => a + b.total, 0) * (this.taxRate / 100)
  }

  // סה״כ לפני מע״מ
  public getTotalPriceBeforeTax(): number {
    return this.cart.reduce((a, b) => a + b.total, 0)
  }

  // סה״כ אחרי מע״מ
  public getTotalPriceAfterTax(): number {
    return this.getTotalPriceBeforeTax() + this.getTaxedPrice()
  }

  // משלוח
  public getDeliveryPrice(): number {
    return this.deliveryPrice
  }

  //למינימום הזמנה
  public getCountFromMinimumPirce(): number {
    return this.minimumPrice - this.getTotalPriceAfterTax()
  }

  // מחיר סופי אחרי הכל, עם הנחה
  public getFinalPrice(): number {
    const basePrice =
      Number(this.getTotalPriceAfterTax()) + Number(this.deliveryPrice)
    const discountAmount = basePrice * (this.discountPercent / 100)
    const finalPrice = basePrice - discountAmount
    return parseFloat(finalPrice.toFixed(2))
  }
}

export default PriceCalculator

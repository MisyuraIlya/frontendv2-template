import { create } from 'zustand'
import CartServices from '../services/cart.services'
import { onErrorAlert } from '../utils/MySweetAlert'
import moment from 'moment'
import { AdminOrderService } from '../services/admin/AdminOrders.service'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
import { HistoryDetailedRepository, HistoryRepository } from '../db'
import { settings } from '../settings'

interface useCartState {
  loading: boolean
  setLoading: (loading: boolean) => void

  // ========== HANDLE CART ==========
  cart: ICart[]
  setCart: (data: ICart[]) => void
  deliveryAt: moment.Moment | null
  setDeliveryAt: (deliveryAt: moment.Moment | null) => void
  getCartItem: (product: { sku: string }) => ICart | null
  recalculateBonuses: () => void
  addToCart: (product: IProduct) => void
  increaseCart: (sku: string) => void
  decreaseCart: (sku: string) => void
  deleteFromCart: (sku: string) => void
  changeQuantity: (sku: string, quantity: number) => void
  changePrice: (cartItem: ICart, value: number) => void
  changeDiscount: (cartItem: ICart, value: number) => void
  changeSum: (cartItem: ICart, value: number) => void
  changeComment: (cartItem: ICart, value: string) => void
  // ========== HANDLE CART ==========

  // ========== CART PAGE ==========
  selectedMode: IDocumentMode
  modes: IDocumentMode[]
  comment: string
  setSelectedMode: (type: IDocumentMode) => void
  setComment: (value: string) => void
  // ========== CART PAGE ==========

  // ========== MAIN FUNCTIONS ==========
  sendOrder: (
    user: IUser,
    total: number,
    agent?: IUser | null,
    discountUser?: number,
    isSendToErp?: boolean
  ) => Promise<SendOrderResponse>

  sendOfflineOrder: (
    user: IUser,
    agent: IUser | null
  ) => Promise<SendOrderResponse>
  saveDraft: (user: IUser) => void
  // ========== MAIN FUNCTIONS ==========
}

export const useCart = create(
  persist(
    (set, get) => ({
      loading: false,
      setLoading: (loading) => set({ loading }),

      // ========== HANDLE CART ==========
      cart: [],
      setCart: (data: ICart[]) => set({ cart: data }),

      deliveryAt: null,
      setDeliveryAt: (deliveryAt: moment.Moment | null) => {
        if (deliveryAt?.isValid?.()) {
          set({ deliveryAt })
        } else {
          set({ deliveryAt: null })
        }
      },

      getCartItem: (product): ICart | null => {
        const cart = get().cart
        return (
          cart.find((item) => item.sku === product.sku && !item.isBonus) || null
        )
      },

      recalculateBonuses: () => {
        const cart = get().cart
        const bonusMap = new Map<
          string,
          { sku: string; quantity: number; product: IProduct }
        >()

        cart.forEach((cartItem) => {
          if (cartItem.isBonus) return
          cartItem.product.bonuses?.forEach((bonus) =>
            bonus.bonusDetaileds?.forEach((detail) => {
              const requiredQuantity =
                Math.floor(cartItem.quantity / detail.minimumQuantity) *
                detail.bonusQuantity
              if (requiredQuantity > 0) {
                const key = detail.bonusProduct.sku
                if (!bonusMap.has(key)) {
                  bonusMap.set(key, {
                    sku: key,
                    quantity: requiredQuantity,
                    product: detail.bonusProduct,
                  })
                } else {
                  bonusMap.get(key)!.quantity += requiredQuantity
                }
              }
            })
          )
        })

        const updatedCart = cart.filter((item) => !item.isBonus)
        bonusMap.forEach(({ sku, quantity, product }) => {
          updatedCart.push({
            sku,
            quantity,
            product,
            stock: product.stock,
            price: 0,
            comment: '',
            discount: 0,
            total: 0,
            isBonus: true,
            choosedPackQuantity:
              product?.packProducts?.[0]?.pack?.quantity ??
              product?.packQuantity ??
              1,
          })
        })

        set({ cart: updatedCart })
      },

      addToCart: (product: IProduct) => {
        const cart = get().cart
        const existing = cart.find(
          (item) => item.sku === product.sku && !item.isBonus
        )
        if (existing) {
          existing.quantity += 1
          existing.total = existing.quantity * existing.price
        } else {
          cart.push({
            sku: product.sku,
            quantity: 1,
            product,
            stock: product.stock,
            price: product.finalPrice,
            discount: product.discount,
            comment: '',
            total: product.finalPrice,
            isBonus: false,
            choosedPackQuantity:
              product?.packProducts?.[0]?.pack?.quantity ??
              product?.packQuantity ??
              1,
          })
        }
        set({ cart })
      },

      increaseCart: (sku: string) => {
        const cart = get().cart
        const idx = cart.findIndex((item) => item.sku === sku && !item.isBonus)
        if (idx !== -1) {
          cart[idx].quantity += 1
          cart[idx].total = cart[idx].quantity * cart[idx].price
          set({ cart })
          get().recalculateBonuses()
        }
      },

      decreaseCart: (sku: string) => {
        const cart = get().cart
        const idx = cart.findIndex((item) => item.sku === sku && !item.isBonus)
        if (idx !== -1) {
          cart[idx].quantity -= 1
          cart[idx].total = cart[idx].quantity * cart[idx].price
          if (cart[idx].quantity <= 0) cart.splice(idx, 1)
          set({ cart })
          get().recalculateBonuses()
        }
      },

      deleteFromCart: (sku: string) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.sku === sku && !item.isBonus)
          ),
        })
      },

      changeQuantity: (sku: string, quantity: number) => {
        const cart = get().cart
        const idx = cart.findIndex((item) => item.sku === sku && !item.isBonus)
        if (idx !== -1) {
          cart[idx].quantity = quantity
          cart[idx].total = cart[idx].quantity * cart[idx].price
          if (cart[idx].quantity <= 0) cart.splice(idx, 1)
          set({ cart })
          get().recalculateBonuses()
        }
      },

      changeComment: (cartItem: ICart, value: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? { ...item, comment: value } : item
          ),
        }))
      },

      changePrice: (cartItem: ICart, value: number) => {
        if (
          cartItem.product.minimumPrice &&
          cartItem.product.finalPrice > cartItem.product.minimumPrice &&
          value < cartItem.product.minimumPrice
        ) {
          onErrorAlert('מחיר נמוך מדי', '')
          return false
        }
        const updatedProduct = { ...cartItem.product, finalPrice: value }
        const discountedPrice = value - (value * cartItem.discount) / 100
        const updatedItem = {
          ...cartItem,
          price: discountedPrice,
          product: updatedProduct,
          total: cartItem.quantity * discountedPrice,
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedItem : item
          ),
        }))
      },

      changeDiscount: (cartItem: ICart, value: number) => {
        const clamped = Math.max(0, Math.min(value, 100))
        const discountedPrice =
          cartItem.product.finalPrice -
          (cartItem.product.finalPrice * clamped) / 100
        if (
          cartItem.product.minimumPrice &&
          discountedPrice < cartItem.product.minimumPrice
        ) {
          onErrorAlert('מחיר ליחידה נמוך מדי', '')
          return false
        }
        const updatedItem = {
          ...cartItem,
          discount: clamped,
          price: +discountedPrice.toFixed(2),
          total: cartItem.quantity * discountedPrice,
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedItem : item
          ),
        }))
      },

      changeSum: (cartItem: ICart, value: number) => {
        if (
          cartItem.product.minimumPrice &&
          value < cartItem.product.minimumPrice
        ) {
          onErrorAlert('מחיר נמוך מדי', '')
          return false
        }
        const newDiscount =
          ((cartItem.product.finalPrice - value) /
            cartItem.product.finalPrice) *
          100
        const updatedItem = {
          ...cartItem,
          price: value,
          discount: +newDiscount.toFixed(2),
          total: cartItem.quantity * value,
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedItem : item
          ),
        }))
      },
      // ========== HANDLE CART ==========

      // ========== CART PAGE ==========
      selectedMode: {
        value: 'order' as IDocumentType,
        label: 'הזמנה',
        englishLabel: 'order',
        isOnlyAgent: false,
      },
      setSelectedMode: (type: IDocumentMode) => set({ selectedMode: type }),
      modes: [
        {
          value: 'order' as IDocumentType,
          label: 'הזמנה',
          englishLabel: 'order',
          isOnlyAgent: false,
        },
        {
          value: 'quote' as IDocumentType,
          label: 'ה.מחיר',
          englishLabel: 'quote',
          isOnlyAgent: false,
        },
        {
          value: 'return' as IDocumentType,
          label: 'החזרה',
          englishLabel: 'return',
          isOnlyAgent: false,
        },
      ],
      comment: '',
      setComment: (value) => set({ comment: value }),
      // ========== CART PAGE ==========

      // ========== MAIN FUNCTIONS ==========
      sendOrder: async (user, total, agent, discountUser, isSendToErp) => {
        const choosedDate = moment(get().deliveryAt).format('YYYY-MM-DD')
        const address = ''
        const city = ''
        return await CartServices.CreateOrder(
          get().cart,
          total,
          get().comment,
          user,
          get().selectedMode.value,
          settings.deliveryPrice,
          choosedDate,
          address,
          city,
          discountUser,
          agent,
          isSendToErp
        )
      },

      sendOfflineOrder: async (user, agent) => {
        const obj: IDocument = {
          documentNumber: null,
          orderComment: get().comment,
          documentType: 'offline',
          userName: user.name,
          userExId: user.extId,
          agentExId: agent?.extId ?? '',
          agentName: agent?.name ?? '',
          status: '',
          createdAt: moment().format('YYYY.MM.DD'),
          updatedAt: moment().format('YYYY.MM.DD'),
          deliveryAt: get().deliveryAt?.format('YYYY.MM.DD') ?? '',
          dueDateAt: get().deliveryAt?.format('YYYY.MM.DD') ?? '',
          total: 0,
          tax: 0,
          error: 'pending',
          user,
        }
        const createHistory = await HistoryRepository.createHistory(obj)
        if (createHistory) {
          await Promise.all(
            get().cart.map(async (element) => {
              const objDetailed: IDocumentItem = {
                tax: 0,
                sku: element.sku,
                title: element.product.title,
                quantity: element.quantity,
                priceByOne: element.price,
                total: element.total,
                discount: element.discount,
                product: element.product,
                comment: '',
                historyId: createHistory.toString(),
              }
              await HistoryDetailedRepository.createHistoryDetailed(objDetailed)
            })
          )
        }
        if (createHistory) {
          return {
            data: { historyId: Number(createHistory), orderNumber: null },
            message: `הזמנה נשמרה במסמכי אופלייו מספר:${createHistory}`,
            status: 'success',
          }
        } else {
          return {
            data: { historyId: '', orderNumber: null },
            message: 'שגיאה בשמירת נתונים',
            status: 'error',
          }
        }
      },

      saveDraft: async (user) => {
        const cart = get().cart
        try {
          set({ loading: true })
          const totalPrice = cart.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )
          const objHistory = {
            user: { id: user?.id },
            total: totalPrice,
            orderComment: get().comment,
            documentType: 'draft',
            createdAt: moment().format('YYYY-MM-DD'),
            updatedAt: moment().format('YYYY-MM-DD'),
            isSendErp: false,
            isBuyByCreditCard: false,
            tax: 18, // FIX
            agent: null,
          }

          const historyId = await AdminOrderService.createHistory(objHistory)
          cart.map(async (item) => {
            const objDetailed: IDocument = {
              // @ts-expect-error: IDocument doesn't include `.history`, but this is required by the API
              history: { id: historyId.id },
              product: { id: item.product.id },
              singlePrice: item.price,
              quantity: item.quantity,
              discount: 0,
              total: item.total,
            }
            await AdminOrderService.createHistoryDetailed(objDetailed)
          })
        } catch (e) {
          console.error('[ERROR]', e)
        } finally {
          set({ loading: false })
        }
      },
      // ========== MAIN FUNCTIONS ==========
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)

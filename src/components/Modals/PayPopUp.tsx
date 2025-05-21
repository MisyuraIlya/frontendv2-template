import { FC, useEffect, useCallback } from 'react'
import ModalWrapper from './ModalWrapper'
import { useAuth } from '../../store/auth.store'
import { useCart } from '../../store/cart.store'
import { onErrorAlert, onSuccessAlert } from '../../utils/MySweetAlert'
import Loader from '../../utils/Loader'
import PriceCalculator from '../../helpers/PriceClass'
import { PaymentService } from '../../services/payment.service'

type PayPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const PayPopUp: FC<PayPopUpProps> = ({ active, setActive }) => {
  const { user, agent } = useAuth()
  const { loading, setLoading, cart, sendOrder, setCart, setComment } =
    useCart()

  const recievingMessages = useCallback(
    (e: MessageEvent) => {
      if (e.data?.res === 'SuccessPayment') {
        onSuccessAlert('הזמנה שודרה בהצלחה', e.data.data?.message)
        setCart([])
        setComment('')
        setActive(false)
      }
      if (e.data?.res === 'ErrorPayment') {
        onErrorAlert('שגיאה בשידור הזמנה', e.data.data?.message)
        setActive(false)
      }
    },
    [setCart, setComment, setActive]
  )

  const generateYadUrl = useCallback(async (): Promise<string> => {
    if (!user) return ''
    try {
      setLoading(true)
      const historyResponse = await sendOrder(
        user,
        0,
        agent,
        user.discount ?? 0,
        false
      )
      const priceCalculator = new PriceCalculator(17, user, cart)
      const url = await PaymentService.generateYadUrl(
        historyResponse.data.historyId,
        user.id!,
        priceCalculator.getFinalPrice()
      )
      return url
    } catch (err) {
      console.error('[ERROR] generate URL', err)
      return ''
    } finally {
      setLoading(false)
    }
  }, [user, agent, cart, sendOrder, setLoading])

  useEffect(() => {
    ;(async () => {
      const url = await generateYadUrl()
      const iframe = document.getElementById('pay_iframe') as HTMLIFrameElement
      if (iframe && url) {
        iframe.src = url
      }
    })()
  }, [generateYadUrl])

  useEffect(() => {
    window.addEventListener('message', recievingMessages, true)
    return () => {
      window.removeEventListener('message', recievingMessages, true)
    }
  }, [recievingMessages])

  return (
    <ModalWrapper width={60} height="80%" active={active} setActive={setActive}>
      {loading && <Loader />}
      <iframe
        id="pay_iframe"
        title="Payment IFrame"
        style={{ width: '100%', height: '100%' }}
        src="about:blank"
      />
    </ModalWrapper>
  )
}

export default PayPopUp

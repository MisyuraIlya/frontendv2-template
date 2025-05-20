import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  Container,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { themeColors } from '../../../styles/mui'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import CartServices from '../../../services/cart.services'
import PriceCalculator from '../../../helpers/PriceClass'
import hooks from '../../../hooks'
import SendIcon from '@mui/icons-material/Send'
import { onErrorAlert, onSuccessAlert } from '../../../utils/MySweetAlert'
import moment from 'moment'
import { useOffline } from '../../../provider/OfflineProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useTranslation } from 'react-i18next'
import { isAxiosError } from 'axios'

moment.locale('he')

const Summary: React.FC = () => {
  const { t } = useTranslation()
  const { user, agent, isAgent } = useAuth()
  const [loading, setLoading] = useState(false)
  const [tax, setTax] = useState(0)
  const { mutate } = hooks.useDataNotificationUser()
  const {
    selectedMode,
    cart,
    comment,
    setComment,
    sendOrder,
    sendOfflineOrder,
    setCart,
    deliveryAt,
    setDeliveryAt,
  } = useCart()
  const { setOpenPopUpPay } = useModals()
  const { isOnline } = useOffline()
  const [discount, setDiscount] = useState(0)

  const priceCalculator = new PriceCalculator(tax, user, cart, discount)

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = async () => {
    try {
      setLoading(true)
      if (user) {
        const response = await sendOrder(
          user,
          priceCalculator.getFinalPrice(),
          agent,
          discount ?? 0,
          true
        )
        if (response?.status) {
          onSuccessAlert(
            t('orderSuccessTitle'),
            t('orderSuccessMessage', {
              orderNumber: response?.data,
            })
          )
          setCart([])
          setComment('')
        } else {
          onErrorAlert(
            t('orderFailureTitle'),
            t('orderFailureMessage', { message: response?.message })
          )
        }
        setTimeout(() => {
          mutate()
        }, 1000)
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        onErrorAlert(
          'שגיאה בשידור',
          error.response?.data?.message ?? 'Unknown server error'
        )
      } else {
        onErrorAlert('שגיאה בשידור', String(error))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSendOfflineOrder = async () => {
    try {
      setLoading(true)
      if (user) {
        const response = await sendOfflineOrder(user, agent)
        if (response?.status === 'success') {
          onSuccessAlert(
            t('offlineOrderSuccessTitle'),
            t('offlineOrderSuccessMessage', { message: response.message })
          )
          setCart([])
          setComment('')
        } else {
          onErrorAlert(
            t('orderFailureTitle'),
            t('orderFailureMessage', { message: response?.message })
          )
        }
        setTimeout(() => {
          mutate()
        }, 1000)
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  const isDisabledButton = () => {
    return priceCalculator.getCountFromMinimumPirce() > 0
  }

  useEffect(() => {
    const fetchTax = async () => {
      if (user && cart.length > 0) {
        try {
          setLoading(true)
          const response = await CartServices.CheckCart(user, cart)
          setTax(response.data.maam)
        } catch (e) {
          console.log('error', e)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchTax()
  }, [user, cart])

  return (
    <Container sx={{ position: 'relative', height: '100%' }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '85vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h4"
              fontWeight={400}
              fontSize={24}
              sx={{ paddingTop: '10px' }}
            >
              {t('cart.documentDetails')}
            </Typography>
          </Box>
          <List sx={{ paddingTop: '15px' }}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                {t('cart.rowCount')}
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {cart.length}
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                {t('cart.totalBeforeTax')}
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceBeforeTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                {t('cart.deliveryCost')}
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {settings?.deliveryPrice} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                {t('cart.taxDue')}
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTaxedPrice()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography variant="body1" color={themeColors.asphalt}>
                {t('cart.priceAfterTax')}
              </Typography>
              <Typography variant="body1" color={themeColors.primary}>
                {priceCalculator.getTotalPriceAfterTax()?.toFixed(2)} ₪
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0px',
              }}
            >
              <Typography
                variant="subtitle2"
                color={themeColors.primary}
                fontWeight={600}
                fontSize={16}
              >
                {t('cart.amountToPay')}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={900}
                color={themeColors.primary}
              >
                {priceCalculator.getFinalPrice()} ₪
              </Typography>
            </ListItem>
          </List>

          {settings?.minimumPrice > 0 &&
            selectedMode.value === 'order' &&
            priceCalculator.getCountFromMinimumPirce() > 0 && (
              <Typography
                color={themeColors.primary}
                sx={{ textAlign: 'center', padding: '10px 0px' }}
              >
                {t('cart.minimumOrderReminder', {
                  amount: priceCalculator
                    .getCountFromMinimumPirce()
                    ?.toFixed(2),
                })}
              </Typography>
            )}

          {isAgent && (
            <TextField
              label={t('cart.generalDiscount')}
              placeholder={t('cart.generalDiscount')}
              fullWidth
              type="number"
              value={discount}
              sx={{ mt: '20px' }}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          )}

          <Box sx={{ margin: '20px 0' }}>
            <Typography variant="h6" color="primary" textAlign="center">
              {t('cart.selectDeliveryDate')}
            </Typography>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%' }}
                label={t('cart.datePickerLabel')}
                value={deliveryAt?.isValid?.() ? deliveryAt : null}
                onChange={(newValue) => setDeliveryAt(newValue)}
              />
            </DemoContainer>
          </Box>

          <TextField
            label={t('cart.deliveryNote')}
            placeholder={t('cart.deliveryNote')}
            rows={4}
            fullWidth
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 3 }}
          />

          {isOnline ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={handleSendOrder}
                startIcon={<SendIcon />}
                disabled={isDisabledButton()}
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
              >
                {t('cart.submitOrder')}
              </Button>
              {settings.paymentSystem !== 'none' && (
                <Button
                  onClick={handlePay}
                  disabled={isDisabledButton()}
                  variant="outlined"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {t('cart.payNow')}
                </Button>
              )}
            </Box>
          ) : (
            <Button
              onClick={handleSendOfflineOrder}
              disabled={!deliveryAt}
              startIcon={<SendIcon />}
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              {t('cart.submitOfflineDocument')}
            </Button>
          )}
        </Box>
      )}
    </Container>
  )
}

export default Summary

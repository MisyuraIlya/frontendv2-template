import { FC } from 'react'
import { Input, Grid, IconButton, Typography } from '@mui/material'
import { useCart } from '../../store/cart.store'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { themeColors } from '../../styles/mui'
import { useModals } from '../../provider/ModalProvider'
import { useAuth } from '../../store/auth.store'
import { onInfoAlert } from '../../utils/MySweetAlert'
import { useTranslation } from 'react-i18next'
import { settings } from '../../settings'

interface AddToCartProps {
  item: IProduct
}

const AddToCart: FC<AddToCartProps> = ({ item }) => {
  const {
    cart,
    addToCart,
    increaseCart,
    decreaseCart,
    deleteFromCart,
    changeQuantity,
  } = useCart()
  const { user } = useAuth()
  const find = cart?.filter((itemCart) => itemCart?.sku === item?.sku)
  const Quantity = find[0]?.quantity
  const isInCart = find[0]?.sku ? true : false
  const { setNotifyStock, setNotifyAddTocart } = useModals()
  const { selectedMode } = useCart()
  const { t } = useTranslation()

  const addToCartFunc = () => {
    if (!user) {
      onInfoAlert(t('alerts.cannotAddCart'), t('alerts.needToAuthorize'))
      return
    }
    if (user?.role !== 'ROLE_USER') {
      onInfoAlert(t('alerts.cannotAddCart'), t('alerts.needToJoinToClient'))
      return
    }
    if (settings.isWithStock) {
      if (item?.stock >= item.packQuantity || selectedMode.value === 'quote') {
        addToCart(item)
        setNotifyAddTocart(true)
      } else {
        setNotifyStock(true)
      }
    } else {
      addToCart(item)
      setNotifyAddTocart(true)
    }
  }

  const increaseCartFunc = () => {
    if (settings.isWithStock) {
      if (item?.stock > Quantity || selectedMode.value === 'quote') {
        increaseCart(item.sku)
      } else {
        setNotifyStock(true)
      }
    } else {
      increaseCart(item.sku)
    }
  }

  const onChangeQuantityFunc = (value: number) => {
    if (settings.isWithStock) {
      if (
        item?.stock >= value * item.packQuantity ||
        selectedMode.value === 'quote'
      ) {
        changeQuantity(item.sku, value)
      } else {
        setNotifyStock(true)
      }
    } else {
      changeQuantity(item.sku, value)
    }
  }

  const handleTitleButton = () => {
    if (selectedMode.value === 'order') {
      return t('catalog.productCard.addToCartOrder')
    } else if (selectedMode.value === 'quote') {
      return t('catalog.productCard.addToCartPriceOffer')
    } else if (selectedMode.value === 'return') {
      return t('catalog.productCard.addToCartReturn')
    }
  }

  return (
    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px', margin: '0px' }}>
      {isInCart ? (
        <>
          <Grid
            size={{ xs: 12, sm: 12, md: 12 }}
            container
            sx={{ backgroundColor: themeColors.primary, borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', padding: '0px', margin: '0px' }}
          >
            <Grid
              size={{ xs: 4, sm: 4, md: 4 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={() => increaseCartFunc()}
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <AddIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4 }} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Input
                type="text"
                value={Quantity}
                onFocus={(e) => (e.target as HTMLInputElement).select()}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  '& input': {
                    textAlign: 'center',
                    justifyContent: 'center',
                  },
                  '&::before': {
                    borderBottom: '0px !important',
                  },
                  '&::after': {
                    borderBottom: '0px',
                  },
                  '&:hover': {
                    borderBottom: '0px',
                  },
                }}
                onChange={(e) => onChangeQuantityFunc(parseInt(e.target.value))}
              />
            </Grid>
            <Grid
              size={{ xs: 4, sm: 4, md: 4 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={
                  isInCart && Quantity > 1
                    ? () => decreaseCart(item.sku)
                    : () => deleteFromCart(item.sku)
                }
                sx={{ borderRadius: '0px', width: '100%' }}
              >
                <RemoveIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          container
          style={{ padding: '0px', width:'100%' }}
          onClick={isInCart ? undefined : () => addToCartFunc()}
        >
          <Grid
            size={{ xs: 12, sm: 12, md: 12 }}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#F6F6F6',
              cursor: 'pointer',
              height: '40px',
              minWidth:'100px',
              color: themeColors.primary,
              '&:hover': {
                background: themeColors.primary,
                color: 'white',
              },
            }}
          >
            <Typography
              variant="button"
              sx={{ textAlign: 'center'}}
            >
              {handleTitleButton()}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default AddToCart

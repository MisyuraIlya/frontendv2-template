import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useCart } from '../../store/cart.store'
import { themeColors } from '../../styles/mui'
import { useModals } from '../../provider/ModalProvider'
import { onInfoAlert } from '../../utils/MySweetAlert'
import { useAuth } from '../../store/auth.store'
import useDirection from '../../hooks/useDirection'
import { useTranslation } from 'react-i18next'
import { settings } from '../../settings'
import logo from '../../assets/images/logo.png'
interface LineProductCardProps {
  product: IProduct
}

const NoSpinnerInput = styled('input')({
  width: '40px',
  textAlign: 'center',
  border: 'none',
  backgroundColor: '#F5F7FA',
  fontSize: '16px',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '&[type=number]': {
    MozAppearance: 'textfield',
  },
})

const LineProductCard: FC<LineProductCardProps> = ({ product }) => {
  const {
    getCartItem,
    addToCart,
    increaseCart,
    decreaseCart,
    changeQuantity,
    deleteFromCart,
    selectedMode,
  } = useCart()
  const cart = getCartItem(product)
  const [loading, setLoading] = useState(true)
  const { selectProduct } = useModals()
  const { setNotifyStock, setNotifyAddTocart } = useModals()
  const { user } = useAuth()
  const dir = useDirection()
  const { t } = useTranslation()
  const handleClick = () => {
    selectProduct(product)
  }

  const handleImageLoad = () => {
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cart) {
      let newQuantity = Number(e.target.value)
      if (isNaN(newQuantity) || newQuantity < 0) {
        newQuantity = 0
      }
      if (newQuantity === 0) {
        deleteFromCart(cart.sku)
      } else {
        changeQuantity(cart.sku, newQuantity)
      }
    }
  }

  const handleDecrease = () => {
    if (cart) {
      if (cart.quantity <= 1) {
        deleteFromCart(product.sku)
      } else {
        decreaseCart(product.sku)
      }
    }
  }

  const addToCartFunc = () => {
    if (!user) {
      onInfoAlert('לא ניתן להוסיף לסל', 'צריך להכנס למערכת')
      return
    }
    if (user?.role !== 'ROLE_USER') {
      onInfoAlert('לא ניתן להוסיף לסל', 'צריך להכנס ללקוח')
      return
    }
    if (settings.isWithStock) {
      if (
        product?.stock >= product.packQuantity ||
        selectedMode.value === 'quote'
      ) {
        addToCart(product)
        setNotifyAddTocart(true)
      } else {
        setNotifyStock(true)
      }
    } else {
      addToCart(product)
      setNotifyAddTocart(true)
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 15px',
        borderRadius: '15px',
        position: 'relative',
        mt: '8px',
        border: cart ? `1px solid ${themeColors.primary}` : undefined,
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: '15px',
              width: '100px',
              height: '100px',
              flexShrink: 0,
            }}
          />
        )}
        <CardMedia
          component="img"
          image={
            product.defaultImagePath
              ? `${import.meta.env.VITE_MEDIA}${product.defaultImagePath}`
              : `${logo}`
          }
          alt="Product image"
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '15px',
            display: loading ? 'none' : 'block',
            cursor: 'pointer',
            objectFit: 'contain',
          }}
          onClick={handleClick}
          onLoad={handleImageLoad}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              fontWeight={700}
              fontSize={'15px'}
              lineHeight={'21px'}
              color={themeColors.primary}
            >
              {dir === 'rtl' ? product?.title : product?.titleEnglish}
            </Typography>
            <Typography
              fontSize={'13px'}
              lineHeight={'19.5px'}
              fontWeight={400}
              color="#436F7C"
            >
              {t('catalog.productCard.sku')} {product?.sku}
            </Typography>
            {user && (
              <Typography
                fontSize={'13px'}
                lineHeight={'19.5px'}
                fontWeight={400}
                color="#436F7C"
              >
                {t('cart.price')} : {product?.finalPrice}₪
              </Typography>
            )}
          </Box>
          {cart && (
            <Typography
              fontSize={'15px'}
              fontWeight={700}
              lineHeight={'22.5px'}
              color="primary"
              sx={{ mb: '5px' }}
            >
              {cart?.total?.toFixed(2) ?? 0} ₪ סה״כ בהזמנה
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ ml: '10px' }}>
        {!cart ? (
          <Button
            variant="contained"
            sx={{
              width: '35px',
              height: '35px',
              minWidth: '35px',
              padding: '10px',
              borderRadius: '10px',
            }}
            onClick={() => addToCartFunc()}
          >
            <AddIcon sx={{ color: 'white' }} />
          </Button>
        ) : (
          <Box
            sx={{
              ml: 2,
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: '#F5F7FA',
              borderRadius: '15px',
              height: '90%',
            }}
          >
            <IconButton onClick={() => increaseCart(product.sku)}>
              <AddIcon color="primary" />
            </IconButton>

            <NoSpinnerInput
              type="number"
              min="0"
              value={cart?.quantity}
              onFocus={(e) => e.target.select()}
              onChange={handleInputChange}
            />

            <IconButton onClick={handleDecrease}>
              <RemoveIcon color="primary" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default LineProductCard

import React, { FC } from 'react'
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { themeColors } from '../../../styles/mui'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { onAsk } from '../../../utils/MySweetAlert'
import { useModals } from '../../../provider/ModalProvider'
import useDirection from '../../../hooks/useDirection'

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

interface MobileCartProductCardProps {
  cart: ICart
}

const MobileCartProductCard: FC<MobileCartProductCardProps> = ({ cart }) => {
  const { increaseCart, decreaseCart, deleteFromCart, changeQuantity } =
    useCart()
  const { selectProduct } = useModals()
  const dir = useDirection()

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
        deleteFromCart(cart?.product.sku)
      } else {
        decreaseCart(cart?.product.sku)
      }
    }
  }

  const handeDelete = async (item: ICart) => {
    const ask = await onAsk(
      'למחוק מהסל',
      `למחוק מהסל את הפריט ${item.product.title}`,
      dir
    )
    if (ask) {
      deleteFromCart(item.sku)
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
      <Box sx={{ display: 'flex', gap: '15px', width: '100%' }}>
        <Box>
          <CardMedia
            component="img"
            image={
              cart.product.defaultImagePath
                ? `${import.meta.env.VITE_MEDIA}/product/${cart.product.defaultImagePath}`
                : `${import.meta.env.VITE_MEDIA}/logo.png`
            }
            alt="Product image"
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '15px',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
            onClick={() => selectProduct(cart?.product)}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <IconButton onClick={() => handeDelete(cart)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box>
            <Typography
              fontWeight={700}
              fontSize={'15px'}
              lineHeight={'21px'}
              color={themeColors.primary}
            >
              {cart?.product?.title}
            </Typography>
            <Typography
              fontSize={'13px'}
              lineHeight={'19.5px'}
              fontWeight={400}
              color="#436F7C"
            >
              מק״ט: {cart?.product?.sku}
            </Typography>
            <Typography
              fontSize={'13px'}
              lineHeight={'19.5px'}
              fontWeight={400}
              color="#436F7C"
            >
              מחיר: {cart?.product?.finalPrice}₪
            </Typography>
            <Typography
              fontSize={'13px'}
              lineHeight={'19.5px'}
              fontWeight={400}
              color="#436F7C"
            >
              הנחה: {cart?.discount}%
            </Typography>
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
              boxShadow:
                '0px 3px 10px 0px rgba(0, 125, 131, 0.30), 0px 3px 10px 0px color(display-p3 0.0928 0.4813 0.5072 / 0.30)',
            }}
          >
            <AddIcon sx={{ color: 'white' }} />
          </Button>
        ) : (
          <Box
            sx={{
              bgcolor: '#F5F7FA',
              borderRadius: '15px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column', // Arrange items in a column.
              justifyContent: 'space-between', // Distribute space evenly between elements.
              alignItems: 'center', // Center items horizontally (optional).
            }}
          >
            <IconButton onClick={() => increaseCart(cart?.product.sku)}>
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

export default MobileCartProductCard

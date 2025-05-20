import React, { FC } from 'react'
import { Box, Snackbar, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { themeColors } from '../../../styles/mui'
import { useTranslation } from 'react-i18next'

interface AddToCartProps {
  notifyAddToCart: boolean
  setNotifyAddTocart: (value: boolean) => void
}

const AddToCart: FC<AddToCartProps> = ({
  notifyAddToCart,
  setNotifyAddTocart,
}) => {
  const { t } = useTranslation()
  return (
    <Snackbar
      sx={{ marginTop: '120px' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={notifyAddToCart}
      onClose={() => setNotifyAddTocart(false)}
      autoHideDuration={2000}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themeColors.primary,
          borderRadius: '10px',
          padding: '10px 20px',
        }}
      >
        <Typography variant="body2" sx={{ color: 'white', fontSize: '18px' }}>
          {t('catalog.notification.addToCart')}
        </Typography>
        <AddShoppingCartIcon sx={{ color: 'white' }} />
      </Box>
    </Snackbar>
  )
}

export default AddToCart

import { Box, Snackbar, Typography } from '@mui/material'
import { FC } from 'react'
import { themeColors } from '../../../styles/mui'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useTranslation } from 'react-i18next'

interface StockProps {
  notifyStock: boolean
  setNotifyStock: (value: boolean) => void
}

const Stock: FC<StockProps> = ({ notifyStock, setNotifyStock }) => {
  const { t } = useTranslation()
  return (
    <Snackbar
      sx={{ marginTop: '120px' }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={notifyStock}
      onClose={() => setNotifyStock(false)}
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
          {t('catalog.notification.nonOfStock')}
        </Typography>
        <RemoveShoppingCartIcon sx={{ color: 'white' }} />
      </Box>
    </Snackbar>
  )
}

export default Stock

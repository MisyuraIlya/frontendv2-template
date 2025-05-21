import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useAuth } from '../../../store/auth.store'
import { themeColors } from '../../../styles/mui'
import { useMobile } from '../../../provider/MobileProvider'
import { useOffline } from '../../../provider/OfflineProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

const Options = () => {
  const { cart, setCart, selectedMode, saveDraft } = useCart()
  const { isMobile } = useMobile()
  const { user } = useAuth()
  const { isOnline } = useOffline()
  const navigate = useNavigate()
  const from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const { t } = useTranslation()
  const dir = useDirection()

  const askDelete = async () => {
    const ask = await onAsk(
      t('cart.confirmDeleteTitle', 'Are you sure?'),
      t('cart.confirmDeleteMessage', 'All items in the cart will be removed'),
      dir
    )
    if (ask) {
      setCart([])
    }
  }

  const handleSaveAsDraft = async () => {
    const ask = await onAsk(
      t('cart.saveDraftTitle', 'Save order as draft?'),
      t(
        'cart.saveDraftMessage',
        'The draft will be saved and the current cart will be emptied'
      ),
      dir
    )
    if (ask && user) {
      saveDraft(user)
      navigate(`/documentPage/history/${from}/${to}?page=1`)
      setCart([])
    }
  }

  const handleToDraft = () => {
    navigate(`/documentPage/history/${from}/${to}?page=1`)
  }

  return (
    <Box
      sx={{
        display: isMobile ? 'block' : 'flex',
        justifyContent: 'space-between',
        margin: '0 20px',
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={600}>
          {`${t('cart.summary', 'Summary')} ${dir === 'rtl' ? selectedMode?.label : selectedMode?.englishLabel}`}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={themeColors.asphalt}
          sx={{ margin: '10px 0' }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '20px',
        }}
      >
        {isOnline && (
          <>
            {cart.length > 0 && selectedMode.value === 'order' && (
              <Button
                variant="outlined"
                onClick={() => handleSaveAsDraft()}
                sx={{
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  minWidth: {
                    sm: { minWidth: '130px' },
                    xs: { minWidth: '100px' },
                  },
                  height: '35px',
                }}
                startIcon={<SaveAsIcon />}
              >
                {t('cart.saveDraftBtn', 'Save Draft')}
              </Button>
            )}
            {selectedMode.value === 'order' && (
              <Button
                variant="outlined"
                onClick={() => handleToDraft()}
                sx={{
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  minWidth: {
                    sm: { minWidth: '130px' },
                    xs: { minWidth: '100px' },
                  },
                  height: '35px',
                }}
                startIcon={<FileUploadIcon />}
              >
                {t('cart.loadDraftBtn', 'Load Draft')}
              </Button>
            )}
          </>
        )}

        {cart.length > 0 && (
          <Button
            onClick={() => askDelete()}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              fontSize: '14px',
              whiteSpace: 'nowrap',
              minWidth: {
                sm: { minWidth: '130px' },
                xs: { minWidth: '100px' },
              },
              height: '35px',
            }}
          >
            {t('cart.deleteCartBtn', 'Delete Cart')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Options

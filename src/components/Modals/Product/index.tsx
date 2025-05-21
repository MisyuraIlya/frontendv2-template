import { FC } from 'react'
import ProductLeftSide from './ProductLeftSide'
import ProductRightSide from './ProductRightSide'
import { Box, Button, Grid } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import { useModals } from '../../../provider/ModalProvider'
import Modals from '../../../components/Modals'
import { useMobile } from '../../../provider/MobileProvider'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type ProductPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const Product: FC<ProductPopUpProps> = ({ active, setActive }) => {
  const { setActivePurchase, setActiveWarehouseDetailed } = useModals()
  const { selectedProd } = useSelectedProduct()
  const { isMobile } = useMobile()
  const { user, agent } = useAuth()
  const { t } = useTranslation()

  const share = () => {
    const imageUrl = `${import.meta.env.VITE_MEDIA}/product/${selectedProd.defaultImagePath}`
    const message = t('product.shareMessage', {
      sku: selectedProd?.sku,
      title: selectedProd?.title,
      link: imageUrl,
    })
    window.open(
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)
    )
  }

  const openLink = () => {
    const imageURL = `${import.meta.env.VITE_MEDIA}/product/${selectedProd.defaultImagePath}`
    window.open(imageURL, '_blank')
  }

  return (
    <Modals.ModalWrapper
      active={active}
      setActive={setActive}
      height={isMobile ? '87%' : 'auto'}
      width={65}
      zIndex={999999}
      component={
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            sx={{ minWidth: '40px', p: '5px' }}
            onClick={openLink}
          >
            <InsertLinkIcon />
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: '40px', p: '5px' }}
            onClick={share}
          >
            <ShareIcon />
          </Button>
          {user && (
            <Button
              variant="outlined"
              endIcon={<RemoveRedEyeIcon />}
              onClick={() => setActivePurchase(true)}
            >
              {t('product.purchaseHistory')}
            </Button>
          )}
          {agent && (
            <Button
              variant="outlined"
              endIcon={<WarehouseIcon />}
              onClick={() => setActiveWarehouseDetailed(true)}
            >
              {t('product.purchaseOrStock')}
            </Button>
          )}
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid size={{ sm: 5, xs: 12 }}>
          <ProductRightSide />
        </Grid>
        <Grid size={{ sm: 7, xs: 12 }}>
          <ProductLeftSide />
        </Grid>
      </Grid>
    </Modals.ModalWrapper>
  )
}

export default Product

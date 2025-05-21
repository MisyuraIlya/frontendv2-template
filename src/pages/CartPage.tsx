import { Box, Divider, Grid } from '@mui/material'
import Cart from '../components/Cart'
import Utils from '../utils'
import { useMobile } from '../provider/MobileProvider'
import { useTranslation } from 'react-i18next'

const CartPage = () => {
  const { isMobile } = useMobile()
  const { t } = useTranslation()
  return (
    <Grid container spacing={1}>
      <Grid size={{ md: 9, sm: 12, xs: 12 }}>
        <Box sx={{ mt: '20px', padding: '0 20px' }}>
          <Utils.BreadCrumbsUtil
            array={[
              {
                title: t('breadCrumbs.cart'),
                link: '',
              },
            ]}
          />
        </Box>
        <Cart.Right.Options />
        {isMobile ? <Cart.Right.MobileList /> : <Cart.Right.List />}
      </Grid>
      <Grid
        size={{ md: 3, sm: 12, xs: 12 }}
        sx={{
          position: {
            xs: { position: 'fixed' },
            sm: { position: 'relative' },
          },
          right: '0px',
          top: '0px',
          width: '100%',
          height: 'auto',
          minHeight: '100vh',
        }}
      >
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '2px',
            top: 0,
            zIndex: 9,
          }}
        />
        <Box sx={{ position: 'sticky', top: '150px' }}>
          <Cart.Left.Summary />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CartPage
